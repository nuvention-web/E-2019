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
import CssBaseline from "@material-ui/core/CssBaseline";
import Pagination from "material-ui-flat-pagination";
import { myFirebase, myFirestore } from "../../firebase";
import { updateJourneyStatus, getUserinfo } from "../../services/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const mytheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#757475"
    },
    secondary: {
      main: "#3B86FF",
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
      root: {},
      outlinedPrimary: {
        color: "#3B86FF",
        borderColor: "#3B86FF"
      },
      clickable: {
        "&:hover, &:active, &:focus": {
          backgroundColor: "#3B86FF !important",
          color: "#fff"
        }
      }
    },
    MuiIconButton: {
      colorPrimary: {
        color: "#CECFD0"
      }
    },
    MuiFlatPageButton: {
      root: {
        backgroundColor: "#fff",
        marginRight: 10,
        "&:hover": {
          backgroundColor: "#3B86FF",
          color: "#fff"
        }
      },
      rootCurrent: {
        backgroundColor: "#3B86FF",
        color: "#fff"
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
    paddingTop: theme.spacing.unit * 1.2,
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
  pagination: {
    position: "fixed",
    bottom: 15,
    right: 15
  }
});

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { offset: 0, clicked: false };
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24}>
        {this.props.data.map(contact => (
          <Grid item xs={4}>
            <div
              onClick={() => {
                this.props.history.push({
                  pathname: "/home/connectiondetails",
                  state: {
                    username: contact.name
                  }
                });
              }}
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
                      <Typography variant="h6">{contact.name}</Typography>
                      <div className={classes.connectionicon}>
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
        ))}
      </Grid>
    );
  }
}
export default withStyles(styles)(Card);
