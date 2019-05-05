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
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { get_a_User_by_email } from "../../services/findreducer";
import { connect } from "react-redux";
import {updateModalStatus } from "../../services/actions";
import { bindActionCreators } from "redux";
import { myFirebase, myFirestore } from "../../firebase";
import ImportContact from "./import"
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
    margin: 10
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  dialog: {
    marginLeft: 240
  },
  dialogh: {
    display: "flex",
    justifyContent: "flex-end"
  },
  dialogf: {
    display: "flex",
    justifyContent: "center"
  },
  fbutton: {
    marginRight: 0
  },
  search: {
    display: "flex",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      //marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});

const mytheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: "#757475"
    },
    secondary: {
      main: "#3B86FF"
    },
    error: {
      main: "#FE938C"
    }
  }
});

class NoConnection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      
    };
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
            onClick={() =>this.props.updateModalStatus(true)}
          >
            Import Contacts
          </FormButton>
          <ImportContact key={this.props.location.state.id} history={this.props.history} journeyid={this.props.location.state.id} journeyname={this.props.location.state.name}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

NoConnection.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { show: state.modalReducer.show };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateModalStatus
    },
    dispatch
  );
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NoConnection)
);
