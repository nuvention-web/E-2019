import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
const mytheme = createMuiTheme({
  palette: {
    primary: {
      main: "#757475",
    },
    secondary: {
      main: "#EAD2AC",
      dark: "#E6B89C"
    },
    error: {
      main: "#FE938C"
    },
  },
  overrides: {
    MuiPaper: {
      elevation2: {
        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .05)"
      }
    },
    MuiTypography:{
      colorTextPrimary:{
        color:"#FF4141"
      },
      colorTextSecondary:{
        color: "#3CC480"
      },
      h6:{
        fontWeight: "bold"
      }
    }
  }
});

const styles = theme => ({
  section2: {
    margin: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit*2,
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary
  },
  skillset: {
    marginTop: theme.spacing.unit * 3,
    flex: 1
  },
  papercontent: {
    marginTop: theme.spacing.unit * 1.5,
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-between"
  },
  papercaption: {
    display: "flex",
    flexDirection: "column"
  }
});

class MainHome extends Component {
  handleDelete = () => {
    alert("You clicked the delete icon."); // eslint-disable-line no-alert
  };

  handleClick = () => {
    alert("You clicked the label."); // eslint-disable-line no-alert
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.section2}>
          <Typography gutterBottom variant="h5">
            Journey > Kellogg
          </Typography>
          <div className={classes.skillset}>
            <MuiThemeProvider theme={mytheme}>
              <Grid container spacing={24}>
                <Grid item xs={4}>
                  <Paper className={classes.paper}>
                    <Typography component="p" color="primary">Total Touchpoints</Typography>
                    <div className={classes.papercontent}>
                      <div className={classes.papercaption}>
                        <Typography variant="h6">6000</Typography>
                        <Typography variant="caption" color="textPrimary">⬇ 43%</Typography>
                      </div>
                      <img alt="Touchpoints" src={require('../statics/barchart1.png')} />
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}>
                    <Typography component="p" color="primary">Avg. Response Rate</Typography>
                    <div className={classes.papercontent}>
                      <div className={classes.papercaption}>
                        <Typography variant="h6">41.2%</Typography>
                        <Typography variant="caption" color="textSecondary">⬆ 43%</Typography>
                      </div>
                      <img alt="Response" src={require('../statics/barchart2.png')} />
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}>
                    <Typography component="p" color="primary">Total Connections</Typography>
                    <div className={classes.papercontent}>
                      <div className={classes.papercaption}>
                        <Typography variant="h6">603</Typography>
                        <Typography variant="caption" color="textPrimary">⬇ 53%</Typography>
                      </div>
                      <img alt="connection"src={require('../statics/barchart3.png')} />
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}

MainHome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainHome);
