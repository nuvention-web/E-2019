import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Messenger from "./chat/Messenger"
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class Chat extends React.Component {
    render(){
  const { classes } = this.props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
       <Messenger />
      </Paper>
    </div>
  );
}
}

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chat);