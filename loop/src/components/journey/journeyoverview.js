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
import AddIcon from "@material-ui/icons/Add";
import SemiCircleProgressBar from "react-progressbar-semicircle";

const mytheme = createMuiTheme({
  palette: {
    primary: {
      main: "#757475"
    },
    secondary: {
      main: "#EAD2AC",
      dark: "#E6B89C"
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
  section2: {
    margin: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary
  },
  paper_journey_add:{
    padding: theme.spacing.unit * 5.8,
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "center"
  },
  skillset: {
    marginTop: theme.spacing.unit * 3,
    flex: 1
  },
  maincharts: {
    marginTop: theme.spacing.unit * 3
  },
  reminder: {
    marginTop: theme.spacing.unit * 3
  },
  progressbar:{
    // height: 63
  },
  papercontent: {
    marginTop: theme.spacing.unit * 1.5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  papercontent_bar:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  papercontent_reminder:{
    marginTop: theme.spacing.unit * 1.5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  papercaption: {
    marginTop: theme.spacing.unit * 1.5,
    marginBottom: theme.spacing.unit * 1.7,
    display: "flex",
    flexDirection: "column"
  },
  remindercontent: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing.unit * 1.5
  },
  remindercaption: {
    display: "flex",
    flexDirection: "column",
    margin:theme.spacing.unit * 1.5
  },
  bigAvatar: {
    margin: 10,
    width: 65,
    height: 65
  }
});

class JourneyOverview extends Component {
  handleDelete = () => {
    alert("You clicked the delete icon."); // eslint-disable-line no-alert
  };

  handleClick = () => {
    alert("You clicked the label."); // eslint-disable-line no-alert
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={mytheme}>
        <div className={classes.section2}>
          <Typography gutterBottom variant="h5">
            Journey
          </Typography>
          <div className={classes.skillset}>
            <Grid container spacing={24}>
              <Grid item xs={4}>
              <div onClick={() => this.props.history.push("/home/noconnection")}>
                <Paper className={classes.paper}>
                  <Typography component="p" color="primary">
                    Kellogg
                  </Typography>
                  <div className={classes.papercontent_bar}>
                    <div className={classes.papercaption} >
                    <Typography variant="h6">0</Typography>
                    </div>
                    <div className={classes.progressbar}>
                    <SemiCircleProgressBar percentage={0} stroke="#FF8373" diameter={135} strokeWidth="20" background="#F0F2F8" showPercentValue />
                    </div>
                  </div>
                </Paper>
                </div>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography component="p" color="primary">
                    Project Manager
                  </Typography>
                  <div className={classes.papercontent_bar}>
                    <div className={classes.papercaption}>
                      <Typography variant="h6">0</Typography>
                    </div>
                    <div className={classes.progressbar}>
                    <SemiCircleProgressBar percentage={0} stroke="#FF8373" diameter={135} strokeWidth="20" background="#F0F2F8" showPercentValue />
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper_journey_add}>
                    <AddIcon  style={{ fontSize: 30 }} />
                </Paper>
              </Grid>
            </Grid>
          </div>       
        </div>
      </MuiThemeProvider>
    );
  }
}

JourneyOverview.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(JourneyOverview);
