import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import Avatar from "@material-ui/core/Avatar";
import { updateFriendList } from "../../services/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class FriendListItem extends Component {
  state = {
    added: false
  };

  handleclick = (id) => {
    if (this.props.friendlist.some(i => i.id === id)) {
        console.log("are you trying to delete?")
    } else {
      this.props.updateFriendList(this.props.data);
    }
  };
  render() {
    return (
      <ListItem button>
        <ListItemAvatar>
          <Avatar src="https://bootdey.com/img/Content/avatar/avatar6.png" />
        </ListItemAvatar>
        <ListItemText>{this.props.data.name}</ListItemText>
        <ListItemSecondaryAction>
          <IconButton onClick={()=>this.handleclick(this.props.data.id)}>
            {this.state.added? <DoneIcon /> : <AddIcon />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

const mapStateToProps = state => {
  return { friendlist: state.friendReducer.friendlist };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateFriendList
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendListItem);
