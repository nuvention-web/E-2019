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
import { myFirestore, myFirebase } from "../../firebase";
import { IconButton } from "@material-ui/core";
import { updateModalStatus } from "../../services/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import JourneyModal from "./createjourney";

const mytheme = createMuiTheme({
  typography: {
    useNextVariants: true,
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
      },
      caption:{
        color: "#757475"
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
  paper_journey_add: {
    padding: theme.spacing.unit * 4.3,
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
    // display: "flex",
    // flexDirection: "row"
  },
  paper_j_typo:{
    display:"inline-block",
    marginRight: theme.spacing.unit * 1
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

class JourneyOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      id: "",
      name: "",
      contactsEmpty: true
    };
    this.listjourney = [];
  }
  handleDelete = () => {
    alert("You clicked the delete icon."); // eslint-disable-line no-alert
  };

  handleClick = () => {
    this.props.updateModalStatus(true);
  };

  componentDidMount() {
    myFirebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.getJourneys(user);
      }
    });
  }

  getJourneys = async user => {
    if (user) {
      const result = await myFirestore
        .collection("user")
        .doc(user.uid)
        .collection("journeys")
        .get();
      if (result.docs.length > 0) {
        this.listjourney = [...result.docs];
        this.setState({ isLoading: false });
      }
    } else {
      console.log("failed");
    }
  };

  checkConnection = async(journeyid, journeyname, journeytotalContacts) => {
    var user = myFirebase.auth().currentUser;
    const contacts = await myFirestore
      .collection("user")
      .doc(user.uid)
      .collection("journeys")
      .doc(journeyid)
      .collection("contacts")
      .get();
    if (contacts.docs.length > 0) {
      this.setState({ contactsEmpty: false });
      this.props.history.push({
        pathname: "/home/groupcontent",
        state: { journeyname: journeyname, journeyid: journeyid, userid: user.uid, journeytotalContacts: journeytotalContacts}
      });
    } else {
      this.props.history.push({
        pathname: "/home/noconnection",
        state: { name: journeyname, id: journeyid}
      });
    }
  }

  renderJourney = classes => {
    if (this.listjourney.length > 0) {
      let viewlistjourney = [];
      this.listjourney = this.listjourney.filter(l=>l.data().journeyname !== "Stranger")
      this.listjourney.forEach((item, index) => {
        viewlistjourney.push(
          <Grid item xs={4} key={item.data().id}>
            <div onClick={()=>this.checkConnection(item.data().id, item.data().journeyname, item.data().totalContacts)}>
              <Paper className={classes.paper}>
                <Typography component="p" color="primary">
                  {item.data().journeyname}
                </Typography>
                <div className={classes.papercontent_bar}>
                  <div className={classes.papercaption}>
                    <Typography variant="h6" className={classes.paper_j_typo}>{item.data().totalContacts}</Typography>
                    <Typography variant="caption" className={classes.paper_j_typo}>connection(s)</Typography>
                  </div>
                  {/* <div className={classes.progressbar}>
                    <SemiCircleProgressBar
                      percentage={0}
                      stroke="#FF8373"
                      diameter={135}
                      strokeWidth={20}
                      background="#F0F2F8"
                      showPercentValue
                    />
                  </div> */}
                </div>
              </Paper>
            </div>
          </Grid>
        );
      });
      return viewlistjourney;
    } else {
      return null;
    }
  };

  render() {
    const { classes, history } = this.props;
    return (
      <div>
        <MuiThemeProvider theme={mytheme}>
          <div className={classes.section2}>
            <Typography gutterBottom variant="h5">
              Groups
            </Typography>
            <div className={classes.skillset}>
              <Grid container spacing={24}>
                {this.renderJourney(classes)}
                <Grid item xs={4}>
                  <Paper className={classes.paper_journey_add}>
                    <IconButton onClick={this.handleClick}>
                      <AddIcon style={{ fontSize: 30 }} />
                    </IconButton>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        </MuiThemeProvider>
        <JourneyModal history={history} />
      </div>
    );
  }
}

JourneyOverview.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateModalStatus
    },
    dispatch
  );
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(JourneyOverview)
);
