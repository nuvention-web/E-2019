import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Typography from "@material-ui/core/Typography";
const mytheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#757475"
    },
    secondary: {
      main: "#3B86FF"
    },
    error: {
      main: "#FE938C"
    }
  },
  overrides: {
    MuiPaper: {
      elevation2: {
        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .05)"
      }
    },
    MuiTypography: {
      colorTextPrimary: {
        color: "#FF4141"
      },
      colorTextSecondary: {
        color: "#3CC480"
      },
      h6: {
        fontWeight: "bold"
      }
    }
  }
});

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary
  },
  papercontent: {
    marginTop: theme.spacing.unit * 1.5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  papercaption: {
    marginTop: theme.spacing.unit * 1.5,
    marginBottom: theme.spacing.unit * 1.7,
    display: "flex",
    flexDirection: "column"
  }
});
class TotalConnection extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={mytheme}>
        <Paper className={classes.paper}>
          <Typography component="p" color="primary">
            Total Connections
          </Typography>
          <div className={classes.papercontent}>
            <div className={classes.papercaption}>
              <Typography variant="h6">{this.props.data.totalAllContacts}</Typography>
            </div>
          </div>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

TotalConnection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  graphql(
    gql`
      query($userid: String) {
        totalAllContacts(userid: $userid)
      }
    `,
    {
      options: props => ({
        variables: {
          userid: props.userid
        }
      })
    }
  )(TotalConnection)
);
