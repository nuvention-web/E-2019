import React, { Component } from 'react';
import '../css/Compose.css';
import { Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});
 class Compose extends Component {
  
  render() {
    const { classes } = this.props;
    return (
      <div className="compose">
        
        <input
          type="text"
          className="compose-input"
          placeholder="type your message here..."
        />
        {/*<div>
        <Icon  name='linkify'/>
        <Icon  name='smile outline'/>
        </div>*/}
        <Button variant="contained" color="primary" className={classes.button}>
        Send
      </Button>
      
      </div>
    );
  }
}
Compose.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Compose);