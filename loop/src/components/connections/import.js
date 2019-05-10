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
import {
  deleteOneFriend,
  emptyFriendList,
  updateModalStatus
} from "../../services/actions";
import { bindActionCreators } from "redux";
import { myFirebase, myFirestore } from "../../firebase";
import Divider from "@material-ui/core/Divider";

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
    justifyContent: "center"
  },
  dialogf: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  fbutton: {
    marginRight: 0,
    marginTop: 20,
    marginBottom: 20
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
    color: "#000",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "#000",
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
    useNextVariants: true
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

class ImportContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added: true,
      semail: "",
      email: "",
      friendList: [],
      totalContacts: 0
    };
  }

  componentDidMount() {
    this.getJourneyInfo();
  }

  handleAdded = () => {
    this.setState({
      added: true,
      loading_total: true
    });
  };

  handleKeypress = event => {
    if (event.key === "Enter") {
      this.setState({ email: this.state.semail });
    }
  };
  searchHandle = event => {
    const email = event.target.value;
  };
  handleDeleteFriend = friend => {
    this.props.deleteOneFriend(friend);
  };
  getJourneyInfo = async () => {
    var user = myFirebase.auth().currentUser;
    let journeyid = this.props.location.state.journeyid;
    if (user && journeyid) {
      var journey = await myFirestore
        .collection("user")
        .doc(user.uid)
        .collection("journeys")
        .doc(journeyid)
        .get();
      if (journey) {
        let tmp = journey.data().totalContacts;
        this.setState({ totalContacts: tmp, loading_total: false });
      }
    }
  };
  handleImport = () => {
    var user = myFirebase.auth().currentUser;
    let journeyid = this.props.location.state.journeyid;
    if (user && !this.state.loading_total) {
      var ref = myFirestore
        .collection("user")
        .doc(user.uid)
        .collection("journeys")
        .doc(journeyid);
      ref.update({
        totalContacts: this.state.totalContacts + this.props.friendlist.length
      });
      let my_stranger_id = user.uid + "-stra";

      this.props.friendlist.forEach(f => {
        let check_r = myFirestore
          .collection("user")
          .doc(user.uid)
          .collection("journeys")
          .doc(my_stranger_id)
          .collection("contacts")
          .doc(f.id);
        check_r
          .get()
          .then(docSnapshot => {
            if (docSnapshot.exists) {
              console.log("????");
              check_r.delete();
            }
          })
          .then(() => {
            ref
              .collection("contacts")
              .doc(f.id)
              .set({ id: f.id, name: f.name, photourl: f.photourl });
          });
      });
      this.props.friendlist.forEach(f => {
        let stranger_id = f.id + "-stra";
        var friendref = myFirestore
          .collection("user")
          .doc(f.id)
          .collection("journeys")
          .doc(stranger_id);
        friendref.set({ id: stranger_id, journeyname: "Stranger" });
        friendref
          .collection("contacts")
          .doc(user.uid)
          .set({
            id: user.uid,
            name: user.displayName,
            photourl: user.photoURL ? user.photoURL : ""
          });
      });
      this.props.history.push({
        pathname: "/home/journeycontent",
        state: {
          journeyid: journeyid,
          journeyname: this.props.location.state.journeyname,
          journeytotalContacts: this.props.friendlist.length,
          newOne: true
        }
      });
      //window.location.reload();
      this.props.emptyFriendList();
      this.props.updateModalStatus(false);
    } else {
      console.log("plz wait");
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section_center}>
        <div className={classes.paper}>
          <div className={classes.dialogh}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search by email…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onChange={event => {
                  this.setState({ semail: event.target.value });
                }}
                onKeyPress={event => this.handleKeypress(event)}
              />
            </div>
            {/* <Button
              color="primary"
              onClick={() => {
                this.setState({ email: this.state.semail });
              }}
            >
            </Button> */}
          </div>
          {this.state.email != "" ? (
            <List>{get_a_User_by_email(this.state.email)}</List>
          ) : null}
          {this.props.friendlist.length !== 0 ? (
            <List>
              {this.props.friendlist.map(friend => (
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      src={
                        friend.photourl
                          ? friend.photourl
                          : "https://bootdey.com/img/Content/avatar/avatar6.png"
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText>{friend.name}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => {
                        this.handleDeleteFriend(friend);
                      }}
                    >
                      {this.state.added ? <DoneIcon /> : <AddIcon />}
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : null}

          <div className={classes.dialogf}>
            <FormButton
              className={classes.fbutton}
              size="small"
              color="secondary"
              width="80%"
              onClick={this.handleImport}
            >
              Let's go
            </FormButton>
            <Typography component="p">Or add them manually</Typography>
            <FormButton
              className={classes.fbutton}
              size="small"
              color="secondary"
              width="80%"
              onClick={() =>
                this.props.history.push({
                  pathname: "/home/importmanually",
                  state: {
                    journeyid: this.props.location.state.journeyid,
                    journeyname: this.props.location.state.journeyname
                  }
                })
              }
            >
              Add Manually
            </FormButton>
          </div>
        </div>
      </div>
    );
  }
}

ImportContact.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    friendlist: state.friendReducer.friendlist,
    show: state.modalReducer.show
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      emptyFriendList,
      deleteOneFriend,
      updateModalStatus
    },
    dispatch
  );
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ImportContact)
);
