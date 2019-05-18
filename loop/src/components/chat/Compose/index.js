import React, { Component } from "react";
import "../css/Compose.css";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import { myFirestore, myFirebase } from "../../../firebase";
import axios from "axios";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});
class Compose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      inputValue: ""
    };
  }

  onSendMessage = content => {
    var user = myFirebase.auth().currentUser;
    if (!user) return;

    if (content.trim() === "") {
      return;
    }

    const timestamp = moment()
      .valueOf()
      .toString();

    const itemMessage = {
      fromId: user.uid,
      toId: this.props.data.id,
      timestamp: timestamp,
      message: content.trim()
    };

    myFirestore
      .collection("messages")
      .doc(this.props.groupId)
      .collection(this.props.groupId)
      .doc(timestamp)
      .set(itemMessage)
      .then(() => {
        axios
        .post(
          `https://loop-backend-server.herokuapp.com/api/loops/users/data-upload-with-type`,
          {
            senderid: user.uid,
            receiverid: [this.props.data.id],
            timestamp: timestamp,
            notes: content.trim(),
            datatype: "chat"
          }
        )
        .then(res => {
          console.log(res);
        });
        this.setState({
          inputValue: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onKeyboardPress = event => {
    if (event.key === "Enter") {
      this.onSendMessage(this.state.inputValue, 0);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="viewBottom">
        <input
          type="text"
          id="inputValue"
          name="inputValue"
          className="viewInput"
          placeholder="type your message here..."
          value={this.state.inputValue}
          onChange={event => {
            this.setState({ inputValue: event.target.value });
          }}
          onKeyPress={this.onKeyboardPress}
        />
        {/*<div>
        <Icon  name='linkify'/>
        <Icon  name='smile outline'/>
        </div>*/}
        {/* <Button variant="contained" color="primary" className={classes.button} onClick={this.onSendMessage(this.state.inputValue)}>
          Send
        </Button> */}
      </div>
    );
  }
}
Compose.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Compose);
