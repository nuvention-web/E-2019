import React, { Component } from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import axios from 'axios';
export default class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: []
    };
  }

  componentDidMount() {
    this.getConversations();
  }

  getConversations = () => {
    axios.get('https://randomuser.me/api/?results=10').then(response => {
      this.setState(prevState => {
        let conversations = response.data.results.map(result => {
          return {
            photo: result.picture.large,
            name: `${result.name.first} ${result.name.last}`,
            text: 'Last Message'
          };
        });

        return { ...prevState, conversations };
      });
    });
  }
  render() {
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList conversations={this.state.conversations}/>
        </div>
        <div className="scrollable content">
          <MessageList conversations={this.state.conversations}/>
        </div>
      </div>
    );
  }
}