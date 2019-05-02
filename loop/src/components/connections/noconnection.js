import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormButton from "../../modules/form/FormButton";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import AddIcon from "@material-ui/icons/Add";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {get_a_User_by_email} from "../../services/findreducer";

const styles = theme => ({
  section_center: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  journeybutton: {
    marginTop: theme.spacing.unit * 2
  },
  bigAvatar: {
    margin: 10,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
  },
  dialog:{
    marginLeft: 240,
  },
  dialogh:{
    display:'flex',
    justifyContent: 'flex-end'
  },
  dialogf:{
    display:'flex',
    justifyContent: 'center'
  },
  fbutton:{
    marginRight: 0
  },
  search: {
    display:'flex',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      //marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});

const mytheme = createMuiTheme({
  palette: {
    primary: {
      main: "#757475"
    },
    secondary: {
      main: "#3B86FF",
    },
    error: {
      main: "#FE938C"
    }
  },
});

class NoConnection extends Component {
  state = {
    open: false,
    added: false,
    semail:"",
    email:"",
    friendList:[],
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  handleAdded = () => {
    this.setState({
      added: true
    });
  };
   searchHandle=event=>{
   const email=event.target.value;  
  }
   addHandle=(id)=>{
    var joined = this.state.myArray.concat(id);
    this.setState({ friendList: joined });
    console.log(this.state.friendList);
   }
  
  
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={mytheme}>
        <div className={classes.section_center}>
          <Typography gutterBottom variant="h5">
            Seems like you don’t have any contacts yet…
          </Typography>
          <FormButton
            className={classes.journeybutton}
            size="large"
            color="secondary"
            width="100"
            onClick={()=>this.setState({open:true})}
          >
            Import Contacts
          </FormButton>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="simple-dialog-title"
            className={classes.dialog}
          >
            {/* <DialogTitle id="simple-dialog-title">Choose Contacts</DialogTitle> */}
            <div className={classes.paper} >
            <div className={classes.dialogh}>
            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={event => {
                this.setState({ semail: event.target.value })
              }}
            />
          </div>
          <Button color="primary"  onClick={()=>{
                this.setState({ email: this.state.semail });}
              }>
        search
      </Button>
            <Button color="primary" className={classes.hbutton} onClick={()=>this.setState({added:!this.state.added})}>
                  Select all
            </Button>
            </div>
           {this.state.email!=""? (
            
              <List>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      className={classes.bigAvatar}
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                    />
                  </ListItemAvatar>
                  <ListItemText  >{get_a_User_by_email(this.state.email)}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton onClick={()=>{this.setState({added:!this.state.added});console.log(get_a_User_by_email(this.state.email).key)} }>
                      {this.state.added? <DoneIcon />: <AddIcon/>}
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
    </List>):null}
              {/*{this.state.friendList!=""? (
              <List>
                {this.state.friendList.map(friend=>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      className={classes.bigAvatar}
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                    />
                  </ListItemAvatar>
                  <ListItemText  >{get_a_User_by_email(this.state.email)}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton onClick={()=>{this.setState({added:!this.state.added});console.log(get_a_User_by_email(this.state.email).key)} }>
                      {this.state.added? <DoneIcon />: <AddIcon/>}
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                </List>):null}*/}
              <div className={classes.dialogf}>
              <FormButton
                className={classes.fbutton}
                size="small"
                color="secondary"
                width="80%"
                onClick={() => this.props.history.push("/home/journeycontent")}
              >
                Import
              </FormButton>
              </div>
              
            </div>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

NoConnection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NoConnection);
