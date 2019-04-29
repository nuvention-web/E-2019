import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import ConversationListItem from "./chat/ConversationListItem"
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class Chat extends React.Component {
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
    render(){
  const { classes } = this.props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
       <ConversationListItem conversations={this.state.conversations}/>
      </Paper>
    </div>
  );
}
}

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chat);