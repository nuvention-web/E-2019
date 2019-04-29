import React, { Component } from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';

import './ConversationList.css';

export default class ConversationList extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="conversation-list">
        
        <ConversationSearch />
        {
          this.props.conversations.map(conversation =>
            <ConversationListItem
              key={conversation.name}
              data={conversation}
            />
          )
        }
      </div>
    );
  }
}