import React, { Component } from "react";
import Compose from "../Compose";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import Message from "../Message";
import moment from "moment";
import { myFirestore, myFirebase } from "../../../firebase";
import "../css/MessageList.css";
import "../css/Toolbar.css";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import FormButton from "../../../modules/form/FormButton";
import { Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const mytheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiChip: {
      root: {},
      outlinedPrimary: {
        color: "#3B86FF",
        borderColor: "#3B86FF"
      },
      clickable: {
        "&:hover, &:active, &:focus": {
          backgroundColor: "#3B86FF !important",
          color: "#fff"
        }
      }
    }
  }
});

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
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
    marginLeft: theme.spacing.unit * 0.5
  }
});

class MessageListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      open: false,
      colors: [],
      selected: []
    };
    this.mess = [];
    this.groupChatId = null;
  }
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  componentDidMount() {
    let colors = Array.from(this.props.journeys, i => "default");
    this.setState({ colors: colors });
    this.getMess();
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.getMess();
    }
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  };

  hashString = str => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  };

  getMess = () => {
    var user = myFirebase.auth().currentUser;
    if (user) {
      if (this.removeListener) {
        this.removeListener();
      }
      this.mess.length = 0;
      this.setState({
        isLoading: true
      });
      let touserdata = this.props.data;
      if (this.hashString(user.uid) >= this.hashString(touserdata.id)) {
        this.groupChatId = `${user.uid}-${touserdata.id}`;
      } else {
        this.groupChatId = `${touserdata.id}-${user.uid}`;
      }

      this.removeListener = myFirestore
        .collection("messages")
        .doc(this.groupChatId)
        .collection(this.groupChatId)
        .onSnapshot(
          snapshot => {
            snapshot.docChanges().forEach(change => {
              this.mess.push(change.doc);
            });
            this.setState({
              isLoading: false
            });
          },
          err => {
            console.log(err);
          }
        );
    } else {
      console.log("failed");
    }
  };

  renderMess = () => {
    if (this.mess.length > 0) {
      var user = myFirebase.auth().currentUser;
      if (user) {
        let mess = [];
        let i = 0;
        let messageCount = this.mess.length;
        while (i < messageCount) {
          let currentMess = {};
          let previous = this.mess[i - 1];
          let current = this.mess[i];
          let next = this.mess[i + 1];
          let isMine = current.data().fromId === user.uid;
          let currentMoment = moment(+current.data().timestamp);
          let prevBySameAuthor = false;
          let nextBySameAuthor = false;
          let startsSequence = true;
          let endsSequence = true;
          let showTimestamp = true;
          if (previous) {
            let previousMoment = moment(+previous.data().timestamp);
            let previousDuration = moment.duration(
              currentMoment.diff(previousMoment)
            );
            prevBySameAuthor = previous.data().fromId === current.data().fromId;

            if (prevBySameAuthor && previousDuration.as("hours") < 1) {
              startsSequence = false;
            }

            if (previousDuration.as("hours") < 1) {
              showTimestamp = false;
            }
          }
          if (next) {
            let nextMoment = moment(+next.data().timestamp);
            let nextDuration = moment.duration(nextMoment.diff(currentMoment));
            nextBySameAuthor = next.data().fromId === current.data().fromId;

            if (nextBySameAuthor && nextDuration.as("hours") < 1) {
              endsSequence = false;
            }
          }

          currentMess["id"] = i;
          currentMess["message"] = current.data().message;
          currentMess["timestamp"] = currentMoment;
          currentMess["author"] = current.data().fromId;
          mess.push(
            <Message
              key={i}
              isMine={isMine}
              startsSequence={startsSequence}
              endsSequence={endsSequence}
              showTimestamp={showTimestamp}
              data={currentMess}
            />
          );
          i += 1;
        }
        return mess;
      } else {
        console.log("failed");
      }
    } else {
      return null;
    }
  };

  handleChipClick = (id, index) => {
    let newcolor = this.state.colors;
    if (this.state.selected.some(s => s === id)) {
      newcolor[index] = "default";
      let sind = this.state.selected.indexOf(id);
      this.state.selected.splice(sind, 1);
    } else {
      newcolor[index] = "primary";
      this.state.selected.push(id);
    }
    this.setState({
      colors: newcolor
    });
  };

  handleAdd = () => {
    //add then delete
    var user = myFirebase.auth().currentUser;
    if (user) {
      let ref = myFirestore
        .collection("user")
        .doc(user.uid)
        .collection("journeys");
      this.state.selected.forEach(s => {
        ref
          .doc(s)
          .collection("contacts")
          .doc(this.props.data.id)
          .set({
            id: this.props.data.id,
            name: this.props.data.name,
            photourl: this.props.data.photourl
          });
      });
      let stranger_id = user.uid + "-stra";
      ref
        .doc(stranger_id)
        .collection("contacts")
        .doc(this.props.data.id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    }
  };

  renderListJourneyName = (classes, listjourneys) => {
    if (listjourneys.length > 0) {
      let viewListJourneyName = [];
      listjourneys.forEach((item, index) => {
        viewListJourneyName.push(
          <Chip
            label={item.data().journeyname}
            className={classes.chip}
            onClick={() => this.handleChipClick(item.data().id, index)}
            variant="outlined"
            color={this.state.colors[index]}
          />
        );
      });
      return viewListJourneyName;
    } else {
      return null;
    }
  };

  render() {
    const { classes } = this.props;
    const { photourl, name } = this.props.data;
    return (
      <div className="message-list">
        <div className="toolbar">
          <h1 className="toolbar-title">{name}</h1>
          {this.props.clickedstra? (
            <IconButton onClick={() => this.setState({ open: true })}>
              <AddIcon style={{ fontSize: 20 }} />
            </IconButton>
          ) : null}
        </div>

        <div className="viewListContentChat">
          {this.renderMess()}
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
        <Compose data={this.props.data} groupId={this.groupChatId} />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          className={classes.dialog}
        >
          <div className={classes.paper}>
            <div className={classes.dialogh}>
              <Typography variant="body1">Add this person to journey:</Typography>
            </div>
            <MuiThemeProvider theme={mytheme}>
              <div className={classes.chips}>
                {this.renderListJourneyName(classes, this.props.journeys)}
              </div>
            </MuiThemeProvider>
            <div className={classes.dialogf}>
              <FormButton
                className={classes.fbutton}
                size="small"
                color="secondary"
                width="80%"
                onClick={this.handleAdd}
              >
                OK
              </FormButton>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

MessageListItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MessageListItem);
