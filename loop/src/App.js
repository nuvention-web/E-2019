import React, { Component } from "react";
import "./App.css";
import Typography from "@material-ui/core/Typography";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import blue from '@material-ui/core/colors/blue';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#4281A4',
    },
  },
});

const styles = theme => ({
  btn: {
    margin: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <Typography component="h2" variant="h2" gutterBottom>
            Ready to view your
          </Typography>
          <Typography component="h2" variant="h2" gutterBottom>
            roadmap?
          </Typography>
          <MuiThemeProvider theme={theme}>
          <Button onClick={() => this.props.history.push('/home')} variant="contained"  color="secondary" className={classes.btn}>
            Import profile from Linkedin
          </Button></MuiThemeProvider>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
