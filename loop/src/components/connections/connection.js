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
import ClearIcon from "@material-ui/icons/Clear";
import EmailIcon from "@material-ui/icons/EmailOutlined";
import EditIcon from "@material-ui/icons/Edit";
import Chip from "@material-ui/core/Chip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles/colorManipulator";

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
        color: "#CECFD0"
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
    flexDirection: "row",
    justifyContent: "space-between"
  },
  sectionheader_left: {
    display: "flex",
    flexDirection: "row"
  },
  chips: {
    marginLeft: theme.spacing.unit * 2
  },
  paper: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary
  },
  paper_journey_add: {
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
  papercontent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
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
    marginBottom: theme.spacing.unit * 1.5
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
  connectionfooter: {
    marginLeft: 65 + theme.spacing.unit * 1
  },
  button: {
    marginRight: theme.spacing.unit * 4
  },
  headerbutton: {
    marginTop: -theme.spacing.unit * 1,
    width: 50,
    height: 50
  },
  bigAvatar: {
    margin: 10,
    width: 65,
    height: 65
  },
  chip: {
    fontSize: 12,
    marginLeft: theme.spacing.unit * 0.5
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1.0),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.8)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    color: "#BCBCCB",
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit*1.2,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    },
    color: theme.palette.common.black
  },
});

class Connection extends Component {
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
            <div className={classes.sectionheader_left}>
              <Typography gutterBottom variant="h5">
                Connections
              </Typography>
              <div className={classes.chips}>
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

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Name..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
          </div>

          <div className={classes.skillset}>
            <Grid container spacing={24}>
              <Grid item xs>
                <div
                  onClick={() =>
                    this.props.history.push("/home/connectiondetails")
                  }
                >
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
                            <IconButton
                              className={classes.headerbutton}
                              aria-label="edit"
                            >
                              <EditIcon className={classes.conicon} />
                            </IconButton>
                            <IconButton
                              className={classes.headerbutton}
                              aria-label="clear"
                            >
                              <ClearIcon className={classes.conicon} />
                            </IconButton>
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
                    <Divider />
                    <div className={classes.connectionfooter}>
                      <IconButton
                        className={classes.button}
                        aria-label="instagram"
                        color="primary"
                      >
                        <FontAwesomeIcon icon={["fab", "instagram"]} />
                      </IconButton>
                      <IconButton
                        className={classes.button}
                        aria-label="twitter"
                        color="primary"
                      >
                        <FontAwesomeIcon icon={["fab", "twitter"]} />
                      </IconButton>
                      <IconButton
                        className={classes.button}
                        aria-label="facebook"
                        color="primary"
                      >
                        <FontAwesomeIcon icon={["fab", "facebook"]} />
                      </IconButton>
                      <IconButton
                        className={classes.button}
                        aria-label="email"
                        color="primary"
                      >
                        <EmailIcon />
                      </IconButton>
                    </div>
                  </Paper>
                </div>
              </Grid>
              <Grid item xs>
                <div>
                  {/* <Paper className={classes.paper}>
                   
                  </Paper> */}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Connection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Connection);
