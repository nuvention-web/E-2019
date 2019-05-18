import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import axios from "axios";
import TableRow from "@material-ui/core/TableRow";
import FilterListIcon from "@material-ui/icons/FilterList";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  wraptext:{
    whiteSpace: "pre-line",
  }
});

let id = 0;
function createData(type, notes, date) {
  id += 1;
  return { id, type, notes, date };
}

let rows = [];

class SimpleTable extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount(){
    this.getData()
  }

  getData(){
    axios
      .get(
        `https://loop-backend-server.herokuapp.com/api/loops/users/logs`,{
        params: {
          senderids: this.props.senderid,
          receiverids: this.props.receiverid
        }
      }
      )
      .then(res => {
        let dataSource = res.data.entities.reduce((a,c) => {
          let dt = new Date(Number(c["date"]));
          const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          let yr = dt.getFullYear();
          let m = dt.getMonth();
          let d = dt.getDate();
          c["date"] = months[m] + " " + d + ", " + yr;
          a.push(c)
          return a;
        }, [])
        rows = dataSource
        this.setState({loading: false})
        console.log(dataSource)
      });
  }
  render(){
    const { classes } = this.props;

  return (
    <Paper className={classes.root}>
      {/* <Tooltip title="Filter list">
    <IconButton aria-label="Filter list">
      <FilterListIcon />
    </IconButton>
  </Tooltip> */}
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell padding="dense">Log Type</TableCell>
            <TableCell align="left">Notes</TableCell>
            <TableCell align="left" padding="dense">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!this.state.loading? rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.type}
              </TableCell>
              <TableCell align="left" className={classes.wraptext}>{row.notes}</TableCell>
              <TableCell align="left" padding="dense">{row.date}</TableCell>
            </TableRow>
          )): null}
        </TableBody>
      </Table>
    </Paper>
  );
  }
  
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
