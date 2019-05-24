import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { myFirebase, myFirestore } from "../../firebase";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Chip from "@material-ui/core/Chip";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
let counter = 0;
function createData(name, email) {
  counter += 1;
  return { id: counter, name, email };
}


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Connection Name' },
  { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
  { id: 'company', numeric: true, disablePadding: false, label: 'Company' },
  { id: 'position', numeric: true, disablePadding: false, label: 'Position' },
  // { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

class EnhancedTableHead extends React.Component {
  
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  dialog: {
    marginLeft: 240
  },
  dialogh: {
    display: "flex",
    justifyContent: "center"
  },
  dialogf: {
    display: "flex",
    justifyContent: "center"
  },
  fbutton: {
    marginRight: 0
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  chips: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  chip: {
    fontSize: 12,
    margin: theme.spacing.unit * 0.2
  }
});

class EnhancedTableToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      colors: [],
      selected: []
    };
    this.handleAdd = this.handleAdd.bind(this)
  }
  componentDidMount(){
    let colors = Array.from(this.props.listjourneys, i => "primary");
    this.setState({ colors: colors });
  }
  handleDialogClose = (event) => {
   this.setState({open : false}) 
  }

  handleChipClick = (id, index) => {
    let newcolor = this.state.colors;
    if (this.state.selected.some(s => s === id)) {
      newcolor[index] = "primary";
      let sind = this.state.selected.indexOf(id);
      this.state.selected.splice(sind, 1);
    } else {
      newcolor[index] = "secondary";
      this.state.selected.push(id);
    }
    this.setState({
      colors: newcolor
    });
  };

  renderListJourneyName = (classes, listjourneys) => {
    if (listjourneys.length > 0) {
      let viewListJourneyName = [];
      listjourneys.forEach((item, index) => {
        viewListJourneyName.push(
          <Chip
            label={item.name}
            className={classes.chip}
            onClick={() => this.handleChipClick(item.id, index)}
            color={this.state.colors[index]}
          />
        );
      });
      return viewListJourneyName;
    } else {
      return null;
    }
  };

  handleAdd(event){
    let dataselect = this.props.dataSelected.reduce((a,c)=>{
      a.push(this.props.data.filter(d=>d.uid===c))
      return a
    },[])
    console.log(dataselect,this.state.selected);
    var user = myFirebase.auth().currentUser;
    if (user &&this.state.selected&&dataselect) {
      dataselect.map(i=>
     {
       this.props.mutate({
        variables: {
          userid:user.uid,
          input: {
            uid: i['0'].uid,
            name: i['0'].name,
            email: i['0'].email,
            company:i['0'].company,
            position:i['0'].position
          },
          journey:this.state.selected,
        }
      });})}

      this.setState({
        open:false
      });
    

  }
  render(){
  const { numSelected, classes } = this.props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Contacts
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Add to group">
            <IconButton aria-label="Add" onClick={()=>{this.setState({open:true})}}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
      <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="simple-dialog-title"
          className={classes.dialog}
        >
          <div className={classes.paper}>
            <div className={classes.dialogh}>
              <Typography variant="body1">Add to group:</Typography>
            </div>
            {/* <MuiThemeProvider theme={mytheme}> */}
            {this.props.listjourneys?
              <div className={classes.chips}>
                {this.renderListJourneyName(classes, this.props.listjourneys)}
              </div>: null}
            {/* </MuiThemeProvider> */}
            <div className={classes.dialogf}>
              <Button
                className={classes.fbutton}
                size="small"
                color="secondary"
                width="80%"
                onClick={this.handleAdd}
              >
                OK
              </Button>
              <Button
                className={classes.fbutton}
                size="small"
                color="secondary"
                width="80%"
                onClick={this.handleDialogClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Dialog>
    </Toolbar>
  );
          }
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(
  graphql(
    gql`
      mutation($userid: String!, $input: [LinkedinCon!], $journey: [String!]) {
        importLinkedinConnection(userid:$userid,input:$input,journey:$journey) 
      }
    `
  )(EnhancedTableToolbar));

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 700
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      data: [
      ],
      success: false,
      page: 0,
      rowsPerPage: 5,
    };
  }

  componentDidMount(){
    this.setState({data: this.props.data})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({data: this.props.data})
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.uid) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar dataSelected={selected} data={data} listjourneys={this.props.listjourneys} numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.uid);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.uid)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.uid}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell>
                      <TableCell align="right">{n.email}</TableCell>
                      <TableCell align="right">{n.company}</TableCell>
                      <TableCell align="right">{n.position}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
