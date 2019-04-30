import React, { Component } from "react";
import Compose from "../Compose";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import Message from "../Message";
import moment from "moment";
import { myFirestore, myFirebase } from "../../../firebase";
import "../css/MessageList.css";
import "../css/Toolbar.css";
export default class MessageListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.touserdata = this.props.data;
    this.mess = [];
    this.groupChatId = null;
  }

  componentDidMount() {
    this.getMess();
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  hashString = str => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash += Math.pow(str.charCodeAt(i) * 31, str.length - i)
      hash = hash & hash // Convert to 32bit integer
    }
    return hash
  }

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
      if (
        this.hashString(user.uid) >=
        this.hashString(this.touserdata.id)
      ) {
        this.groupChatId = `${user.uid}-${this.touserdata.id}`
      } else {
        this.groupChatId = `${this.touserdata.id}-${user.uid}`
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
            console.log(err)
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

  render() {
    const { photourl, name } = this.props.data;
    return (
      <div className="message-list">
        <div className="toolbar">
          <div className="left-items">
            <img
              className="conversation-photo"
              src={photourl}
              alt="conversation"
            />
          </div>
          <h1 className="toolbar-title">{name}</h1>
        </div>

        <div className="viewListContentChat">{this.renderMess()}
        <div
            style={{ float: 'left', clear: 'both' }}
            ref={el => {
              this.messagesEnd = el
            }}
          />
        </div>
        <Compose data={this.props.data} groupId={this.groupChatId}/>
      </div>
    );
  }
}
