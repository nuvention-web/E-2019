import React, { Component } from "react";
import "./App.css";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SplitPane from "react-split-pane";
import Signin from "./components/signin"
import SignUp from "./components/signup"
import ForgetPassword from "./components/forgetpassword"
import { Route, IndexRoute, Redirect, Switch, BrowserRouter as Router } from "react-router-dom";

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
  sidebg:{

  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
      <SplitPane split="vertical" defaultSize="50%" primary="first" pane1ClassName="App-bg">
        <div></div>
        <div>
        <Switch>
          <Redirect exact from={`/app`} to={`/app/signin`} />
            <Route path="/app/signin" component={Signin} />
            <Route path="/app/signup" component={SignUp} />
            <Route path="/app/forgetpassword" component={ForgetPassword} />
          </Switch>
        </div>
      </SplitPane>

        {/* <div className="App-header">
     
        {/*<div className="App-header">
          <Typography component="h2" variant="h2" gutterBottom>
            Ready to view your
          </Typography>
          <Typography component="h2" variant="h2" gutterBottom>
            roadmap?
          </Typography>
          
        </div> */}

      </div>
      
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
