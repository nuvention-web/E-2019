import React, { Component } from "react";
import shave from "shave";
import "../css/ConversationListItem.css";
import "../css/Messenger.css";
import "../css/MessageList.css";
import MessageListItem from "../MessageListItem";
import ConversationSearch from "../ConversationSearch";
import firebase from "firebase";
import { myFirestore, myFirebase } from "../../../firebase";
import Chip from "@material-ui/core/Chip";
import PropTypes from "prop-types";

import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const mytheme = createMuiTheme({
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
  chips: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  chip: {
    fontSize: 12,
    marginLeft: theme.spacing.unit * 0.5,
    marginTop: theme.spacing.unit * 0.5
  }
});

class ConversationListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: {},
      isLoading: true,
      messages: [],
      contactsEmpty : [],
      clickedstra:false,
      alert: ""
    };
    this.listUser = [];
    this.listjourneys = [];
  }

  componentDidMount() {
    shave(".conversation-snippet", 20);
    myFirebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.getEachJourney();
      } else {
        this.props.history.push("/app/sigin");
      }
    });
  }


  handleChipClick(id,journeyname) {
    this.getListUser(id, journeyname);
  }

  handleUserChange = (id) => {
    this.getMessage(id)
  };

  getEachJourney = async () => {
    var user = myFirebase.auth().currentUser;
    var journeys = await myFirestore
      .collection("user")
      .doc(user.uid)
      .collection("journeys")
      .get();
    if (journeys.docs.length > 0) {
      this.listjourneys = [...journeys.docs];
      this.getListUser(this.listjourneys[0].data().id, this.listjourneys[0].data().journeyname);
      
    }
  };

  getListUser = async (id, journeyname) => {
    var user = myFirebase.auth().currentUser;
    const listuser = await myFirestore
      .collection("user")
      .doc(user.uid)
      .collection("journeys")
      .doc(id)
      .collection("contacts")
      .get();
    if (listuser.docs.length === 0) {
      if (journeyname === "Stranger"){
        this.setState({clickedstra: false})
      }
      this.setState({
        alert: "Empty journey!"
      })
    }
    if (listuser.docs.length > 0) {
      this.listUser = [...listuser.docs];
      this.getMessage(this.listUser[0].data().id)
      this.setState({ isLoading: false, alert: "" });
      if (journeyname === "Stranger"){
        this.setState({clickedstra: true})
      }else{
        this.setState({clickedstra: false})
      }
    }
  };

  renderListUser = () => {
    if (this.listUser.length > 0) {
      let viewListUser = [];
      this.listUser.forEach((item, index) => {
        viewListUser.push(
          <div
            className="conversation-list-item"
            key={item.data().name}
            onClick={() => this.handleUserChange(item.data().id)}
          >
            <img
              className="conversation-photo"
              src={item.data().photourl === ""? "https://bootdey.com/img/Content/avatar/avatar4.png": item.data().photourl}
              alt="conversation"
            />
            <div className="conversation-info">
              <h1 className="conversation-title">{item.data().name}</h1>
              <p className="conversation-snippet" />
            </div>
          </div>
        );
      });
      return viewListUser;
    } else {
      return null;
    }
  };

  renderListJourneyName = classes => {
    if (this.listjourneys.length > 0) {
      let viewListJourneyName = [];
      this.listjourneys.forEach((item, index) => {
        viewListJourneyName.push(
          <Chip
            label={item.data().journeyname}
            className={classes.chip}
            onClick={()=>this.handleChipClick(item.data().id,item.data().journeyname)}
            variant="outlined"
            color="primary"
          />
        );
      });
      return viewListJourneyName;
    } else {
      return null;
    }
  };

  getMessage = (id) => {
    this.setState({
      messages: this.listUser.filter(l => l.data().id===id)
    })
  }
  renderFirstMessaging = () => {
    if (this.state.messages.length > 0) {
      let firstone = [];
        firstone.push(
          <MessageListItem data={this.state.messages[0].data()} clickedstra={this.state.clickedstra} journeys={this.listjourneys.filter(i=>i.data().journeyname!=="Stranger")}/>
        );
      return firstone;
    } else {
      return null;
    }
  };


  render() {
    const { classes } = this.props;

    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <div className="conversation-list">
            <ConversationSearch />
            <MuiThemeProvider theme={mytheme}>
            <p style={{color: "#000", fontSize: 15}}>{this.state.alert}</p>
              <div className={classes.chips}>
                {this.renderListJourneyName(classes)}
              </div>
            </MuiThemeProvider>
            {this.renderListUser()}
            {/* {this.props.conversations.map(conversation =>
              this.renderListUser()
            )} */}
          </div>
        </div>
        <div className="content">{this.renderFirstMessaging()}</div>
      </div>
    );
  }
}

ConversationListItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConversationListItem);
