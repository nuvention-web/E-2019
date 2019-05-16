import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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
import Card from "./card.js";
import { get_userByJourney } from "../../services/connectionReducer";
import DoneIcon from "@material-ui/icons/Done";
import { get_a_User_by_email } from "../../services/findreducer";
import {
  deleteOneFriend,
  emptyFriendList,
  updateModalStatus
} from "../../services/actions";
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
      colorPrimary:{
        backgroundColor:"#fff",
        color:"#000"
      },
      colorSecondary:{
        color:"#fff",
        backgroundColor:"#3B86FF",
      },
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
    marginLeft: theme.spacing.unit * 0.5,
    marginTop: theme.spacing.unit * 0.5
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
  },
  dialog: {
    marginLeft: 240
  },
  dialogh: {
    display: "flex",
    justifyContent: "flex-end"
  },
  dialogf: {
    display: "flex",
    justifyContent: "center"
  },
  fbutton: {
    marginRight: 0
  },
  search: {
    display: "flex",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      //marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
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
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});

class Connection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      clicked: false,
      journeyId: "",
      loading: false,
      open: false,
      added: true,
      semail: "",
      email: "",
      friendList: [],
      dontchange: false
    };
  }
  componentDidMount() {
    myFirebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.getUserinfo({
          id: user.uid,
          name: user.displayName,
          photourl: user.photoURL ? user.photoURL : ""
        });
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      //console.log(this.props.data);
      if (!this.state.dontchange) {
        if (
          this.props.data.findUsersJourney &&
          this.props.data.findUsersJourney.length !== 0 &&
          this.props.data.findUsersJourney[0].name !== "Stranger"
        ) {
          this.setState({
            journeyId: this.props.data.findUsersJourney[0].id,
            journeyname: this.props.data.findUsersJourney[0].name,
            loading: true
          });
        }
      }
    }
  }
  handleDelete = () => {
    alert("You clicked the delete icon."); // eslint-disable-line no-alert
  };

  handleClick(offset) {
    this.setState({ offset });
  }

  handleChipClick = (id, name) => {
    this.setState({ journeyId: id, journeyname: name, dontchange: true });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  handleAdded = () => {
    this.setState({
      added: true
    });
  };
  searchHandle = event => {
    const email = event.target.value;
  };
  handleDeleteFriend = friend => {
    this.props.deleteOneFriend(friend);
  };
  handleImport = () => {};
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
              {this.props.data.findUsersJourney &&
              this.state.loading === true ? (
                <div className={classes.chips}>
                  {this.props.data.findUsersJourney.map((v, i) => {
                    if (v.name === "Stranger") return null;
                    return (
                      <Chip
                        key={i}
                        label={v.name}
                        className={classes.chip}
                        onClick={() => this.handleChipClick(v.id)}
                        color={v.id===this.state.journeyId? "secondary": "primary"}
                      />
                    );
                  })}
                </div>
              ) : null}
            </div>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => {
                this.props.history.push({
                  pathname: "/home/addconnection",
                  state: {
                    journeyid: this.state.journeyId,
                    journeyname: this.state.journeyname
                  }
                });
              }}
            >
              Add a contact
            </Button>
          </div>
          <div className={classes.skillset}>
            {this.props.data.findUsersJourney &&
            this.props.user.id &&
            this.state.journeyId
              ? get_userByJourney(
                  this.state.journeyId,
                  this.props.user.id,
                  this.props.history
                )
              : null}
          </div>
          <CssBaseline />
          {/* <div className={classes.pagination}>
            <Pagination
              limit={10}
              offset={this.state.offset}
              total={100}
              onClick={(e, offset) => this.handleClick(offset)}
            />
          </div> */}
        </div>
      </MuiThemeProvider>
    );
  }
}

Connection.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    empty: state.modalReducer.empty,
    user: state.userReducer.user,
    friendlist: state.friendReducer.friendlist,
    show: state.modalReducer.show
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getUserinfo,
      emptyFriendList,
      deleteOneFriend,
      updateModalStatus
    },
    dispatch
  );
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    graphql(
      gql`
        query($userid: String) {
          findUsersJourney(userid: $userid) {
            id
            name
          }
        }
      `,
      {
        options: props => ({
          variables: {
            userid: props.user.id
          },
          fetchPolicy: "cache-and-network",
          
        })
      }
    )(Connection)
  )
);
