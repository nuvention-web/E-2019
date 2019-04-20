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
import Avatar from "@material-ui/core/Avatar";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import Chip from "@material-ui/core/Chip";
import { IconButton } from "@material-ui/core";
import LeftArrowIcon from "@material-ui/icons/KeyboardBackspace";

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
        fontWeight: "bold",
        fontSize: "1rem"
      }
    },
    MuiChip: {
      outlinedPrimary: {
        color: "#3B86FF",
        borderColor: "#3B86FF"
      }
    },
    MuiIconButton: {
      colorPrimary: {
        backgroundColor: "#fff"
      }
    }
  }
});

const styles = theme => ({
  section2: {
    margin: theme.spacing.unit * 2
  },
  sectionheader: {
    display: "flex",
    flexDirection: "row"
  },
  backbutton: {
    width: 43,
    height: 43
  },
  header_h5: {
    marginTop: theme.spacing.unit * 0.6,
    marginLeft: theme.spacing.unit * 2
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
  connectioncaption: {
    marginTop: theme.spacing.unit * 1.5,
    display: "flex",
    flexDirection: "column",
    width: "-webkit-fill-available"
  },
  connectiondes: {
    marginTop: theme.spacing.unit * 0.5
  },
  connectioncontent: {
    display: "flex",
    flexDirection: "row",
    marginBottom: theme.spacing.unit * 0.7
  },
  connectionheader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  connectionicon: {
    marginTop: -theme.spacing.unit * 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
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
  chip: {
    fontSize: 12,
    marginLeft: theme.spacing.unit * 0.5
  }
});

class ConnectionDetails extends Component {
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
          <div className={classes.sectionheader}>
            <IconButton
              color="primary"
              className={classes.backbutton}
              onClick={() => this.props.history.push("/home/connection")}
            >
              <LeftArrowIcon style={{ fontSize: 20 }} />
            </IconButton>

            <Typography gutterBottom variant="h5" className={classes.header_h5}>
              Connection Details
            </Typography>
          </div>
          <div className={classes.skillset}>
            <Grid container spacing={24}>
              <Grid item xs={5}>
                <Paper className={classes.paper}>
                  <div className={classes.connectioncontent}>
                    <Avatar
                      alt="Tony Stark"
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                      className={classes.bigAvatar}
                    />
                    <div className={classes.connectioncaption}>
                      <div className={classes.connectionheader}>
                        <Typography variant="h6">David Lee</Typography>
                        <div className={classes.connectionicon}>
                          <Chip
                            label="Kellogg"
                            className={classes.chip}
                            variant="outlined"
                            color="primary"
                          />
                          <Chip
                            label="Project Manager"
                            className={classes.chip}
                            variant="outlined"
                            color="primary"
                          />
                        </div>
                      </div>
                      <Typography
                        variant="caption"
                        className={classes.connectiondes}
                      >
                        United States
                      </Typography>
                      <Typography
                        variant="caption"
                        className={classes.connectiondes}
                      >
                        Mobile : 871.567.4877
                      </Typography>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className={classes.paper}>
                  <Typography component="p" color="primary">
                    Overall Avg. Response Rate
                  </Typography>
                  <div className={classes.papercontent_bar}>
                    <div className={classes.papercaption} />
                    <div className={classes.progressbar}>
                      <SemiCircleProgressBar
                        percentage={20}
                        stroke="#FFDA83"
                        diameter={135}
                        strokeWidth="20"
                        background="#F0F2F8"
                        showPercentValue
                      />
                    </div>
                  </div>
                </Paper>
              </Grid>

              <Grid item xs>
                <Paper className={classes.paper}>
                  <Typography component="p" color="primary">
                    Total Connections
                  </Typography>
                  <div className={classes.papercontent}>
                    <div className={classes.papercaption}>
                      <Typography variant="h6">30</Typography>
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
          <div className={classes.maincharts}>
            <Paper className={classes.paper}>
              <Typography component="p" color="primary">
                HeatMap
              </Typography>
              <div className={classes.papercontent} />
            </Paper>
          </div>
          <div className={classes.reminder}>
            <Grid container spacing={24}>
              <Grid item xs>
                <Paper className={classes.paper}>
                  <Typography component="p" color="primary">
                    Touchpoint
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs>
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
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

ConnectionDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConnectionDetails);
