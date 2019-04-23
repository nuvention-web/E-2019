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
    width: theme.spacing.unit * 50,
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
  }
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
    added: false
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
            <div className={classes.paper}>
            <div className={classes.dialogh}>
            <Button color="primary" className={classes.hbutton} onClick={()=>this.setState({added:!this.state.added})}>
                  Select all
            </Button>
            </div>
            
              <List>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      className={classes.bigAvatar}
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                    />
                  </ListItemAvatar>
                  <ListItemText primary="David Lee" />
                  <ListItemSecondaryAction>
                    <IconButton onClick={()=>this.setState({added:!this.state.added})} >
                      {this.state.added? <DoneIcon />: <AddIcon/>}
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
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
