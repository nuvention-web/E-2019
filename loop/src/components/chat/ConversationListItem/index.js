import React, { Component } from 'react';
import shave from 'shave';

import '../css/ConversationListItem.css';
import '../css/Messenger.css';
import '../css/MessageList.css';
import MessageListItem from '../MessageListItem';
import ConversationSearch from '../ConversationSearch'; 
export default class ConversationListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser:{}
    };
  }
  handleChange = (event, conversation) => {
    this.setState({selectedUser:conversation});
  
  }
  componentDidMount() {
    shave('.conversation-snippet', 20);
  }

  render() {
 

    return (
      <div className="messenger">
      <div  className="scrollable sidebar">
      <div className="conversation-list">   
      <ConversationSearch />
      {
        this.props.conversations.map(conversation =>
          <div className="conversation-list-item" key={conversation.name} onClick={event =>this.handleChange(event,conversation)}>
        <img className="conversation-photo" src={conversation.photo} alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">{ conversation.name }</h1>
          <p className="conversation-snippet">{ conversation.text }</p>
        </div>
      </div>
        )
      }
    </div>
    </div>
    <div className="scrollable content">
    <MessageListItem data={this.state.selectedUser}/>
  </div>
  </div>
 
      
    );
  }
}