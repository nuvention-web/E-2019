import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';

import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import HeatMap from "./charts/heat";

const mytheme = createMuiTheme({
  palette: {
    primary: {
      main: "#757475"
    },
    secondary: {
      main: "#3B86FF",
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
      },
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
  progressbar: {
    // height: 63
  },
  papercontent: {
    marginTop: theme.spacing.unit * 1.5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  papercontent_bar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  papercontent_reminder: {
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
    margin: theme.spacing.unit * 1.5
  },
  bigAvatar: {
    margin: 10,
    width: 65,
    height: 65
  },
  heatmapheader:{
    display:"flex",
    flexDirection: "row"
  },
  hbutton:{
    marginTop: -theme.spacing.unit * 0.6,
    marginLeft: theme.spacing.unit * 1,
    fontSize: 12
  }
});

class Overview extends Component {
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
            Overview
          </Typography>
          <div className={classes.skillset}>
            <Grid container spacing={24}>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography component="p" color="primary">
                    Overall Avg. Response Rate
                  </Typography>
                  <div className={classes.papercontent_bar}>
                    <div className={classes.papercaption} />
                    <div className={classes.progressbar}>
                      <SemiCircleProgressBar
                        percentage={20}
                        stroke="#FF8373"
                        diameter={135}
                        strokeWidth="20"
                        background="#F0F2F8"
                        showPercentValue
                      />
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography component="p" color="primary">
                    Touchpoint
                  </Typography>

                  <div className={classes.papercontent}>
                    <div className={classes.papercaption}>
                      <Typography variant="h6">1000</Typography>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography component="p" color="primary">
                    Total Connections
                  </Typography>
                  <div className={classes.papercontent}>
                    <div className={classes.papercaption}>
                      <Typography variant="h6">480</Typography>
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
          <div className={classes.maincharts}>
            <Paper className={classes.paper}>
              <div className={classes.heatmapheader}>
              <Typography component="p" color="primary">
                HeatMap
              </Typography>
                <Button color="secondary" className={classes.hbutton}>
                  Overall
                </Button>
                <Button color="primary" className={classes.hbutton}>
                  Kellog
                </Button>
                <Button color="primary" className={classes.hbutton}>
                  Project Manager
                </Button>
              </div>
              
              <div style={{ padding: 20 }}>
                <HeatMap />
              </div>
            </Paper>
          </div>

          <div className={classes.reminder}>
            <Paper className={classes.paper}>
              <Typography component="p" color="primary">
                Reminder
              </Typography>
              <div className={classes.papercontent_reminder}>
                <div className={classes.remindercontent}>
                  <Avatar
                    alt="Tony Stark"
                    src="https://bootdey.com/img/Content/avatar/avatar6.png"
                    className={classes.bigAvatar}
                  />
                  <div className={classes.remindercaption}>
                    <Typography variant="h6">Tony Stark</Typography>
                    <Typography variant="caption">
                      Send a followup email tomorrow
                    </Typography>
                  </div>
                </div>
                <div className={classes.remindercontent}>
                  <Avatar
                    alt="Tony Stark"
                    src="https://bootdey.com/img/Content/avatar/avatar6.png"
                    className={classes.bigAvatar}
                  />
                  <div className={classes.remindercaption}>
                    <Typography variant="h6">Nick Herasimenka</Typography>
                    <Typography variant="caption">
                      Schedule a coffee meet in 3 days
                    </Typography>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Overview.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Overview);
