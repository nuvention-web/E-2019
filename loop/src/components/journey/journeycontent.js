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
import { IconButton } from "@material-ui/core";
import LeftArrowIcon from "@material-ui/icons/KeyboardBackspace";
import HeatMap from "../charts/heat";
import { connect } from "react-redux";
import {
  BrowserRouter as Router
} from "react-router-dom";
const mytheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
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
  }
});

class JourneyContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: false,
      tpvalue: 0
    };
  }
  handleDelete = () => {
    alert("You clicked the delete icon."); // eslint-disable-line no-alert
  };

  handleClick = () => {
    alert("You clicked the label."); // eslint-disable-line no-alert
  };

  componentDidMount() {
    if(this.props.location.state.newOne) {
      if(!this.state.reload){
        this.forceUpdate()
        this.setState({reload: true})
      }
      
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={mytheme}>
        <div className={classes.section2}>
          <div className={classes.sectionheader}>
            <IconButton
              color="primary"
              className={classes.backbutton}
              onClick={() => this.props.history.push("/home/group")}
            >
              <LeftArrowIcon style={{ fontSize: 20 }} />
            </IconButton>

            <Typography gutterBottom variant="h5" className={classes.header_h5}>
              {this.props.location.state.journeyname}
            </Typography>
          </div>

          <div className={classes.skillset}>
            <Grid container spacing={24}>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography variant="body1" color="primary">
                    Overall Avg. Response Rate
                  </Typography>
                  <div className={classes.papercontent_bar}>
                    <div className={classes.papercaption} />
                    <div className={classes.progressbar}>
                      <SemiCircleProgressBar
                        percentage={0}
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
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography variant="body1" color="primary">
                    Total Touchpoint
                  </Typography>
                  <div className={classes.papercontent}>
                    <div className={classes.papercaption}>
                      <Typography variant="h6">{this.props.tpvalue}</Typography>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography variant="body1" color="primary">
                    Total Connections
                  </Typography>
                  <div className={classes.papercontent}>
                    <div className={classes.papercaption}>
                      <Typography variant="h6">{this.props.location.state.journeytotalContacts}</Typography>
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
          <div className={classes.maincharts}>
            <Paper className={classes.paper}>
              <Typography variant="body1" color="primary">
                HeatMap
              </Typography>
              <div style={{ padding: 20 }}>
                {this.props.location.state.journeyid !== "" &&
                this.props.location.state.userid !== "" ? (
                  <HeatMap
                    journeyid={this.props.location.state.journeyid}
                    userid={this.props.location.state.userid}
                  />
                ) : null}
              </div>
            </Paper>
          </div>
          {/* <div className={classes.reminder}>
            <Paper className={classes.paper}>
              <Typography variant="body1" color="primary">
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
        */}
        </div>
      </MuiThemeProvider>
    );
  }
}

JourneyContent.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return { tpvalue: state.tpReducer.value};
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null
  )(JourneyContent));
