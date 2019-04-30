import React, { Component } from "react";
import shave from "shave";

import "../css/ConversationListItem.css";
import "../css/Messenger.css";
import "../css/MessageList.css";
import MessageListItem from "../MessageListItem";
import ConversationSearch from "../ConversationSearch";
import firebase from "firebase";
import { myFirestore, myFirebase } from "../../../firebase";

export default class ConversationListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: {},
      isLoading: true
    };
    this.listUser = [];
  }
  handleChange = (event, conversation) => {
    this.setState({ selectedUser: conversation });
  };
  componentDidMount() {
    shave(".conversation-snippet", 20);
    this.getListUser();
  }

  getListUser = async () => {
    var user = myFirebase.auth().currentUser;
    if (user) {
      const result = await myFirestore
        .collection("users")
        .doc(user.uid)
        .collection(user.uid)
        .get();
      console.log(result.docs);
      if (result.docs.length > 0) {
        this.listUser = [...result.docs];
        this.setState({ isLoading: false });
      }
    } else {
      console.log("failed");
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
            onClick={event => this.handleChange(event, item.data())}
          >
            <img
              className="conversation-photo"
              src={item.data().photourl}
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

  renderFirstMessaging = () => {
    if (this.listUser.length > 0) {
      let firstone = [];
      if (Object.entries(this.state.selectedUser).length === 0){
        firstone.push(<MessageListItem data={this.listUser[0].data()} />);
      }else{
        firstone.push(<MessageListItem data={this.state.selectedUser} />);
      }
      
      return firstone;
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <div className="conversation-list">
            <ConversationSearch />
            {this.renderListUser()}
            {/* {this.props.conversations.map(conversation =>
              this.renderListUser()
            )} */}
          </div>
        </div>
        <div className="scrollable content">{this.renderFirstMessaging()}</div>
      </div>
    );
  }
}
