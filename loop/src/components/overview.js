import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { myFirebase, myFirestore } from "../firebase";
import { updateJourneyStatus,getUserinfo } from "../services/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import TotalConnection from "./connections/totalConnection";
import axios from "axios";

const mytheme = createMuiTheme({
  typography: {
    useNextVariants: true,
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
  heatmapheader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  heatmaplefth: {
    display: "flex",
    flexDirection: "row"
  },
  hbutton: {
    marginTop: -theme.spacing.unit * 0.7,
    marginLeft: theme.spacing.unit * 1,
    fontSize: 12
  }
});

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 12,
    width: "auto",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journeyid:"",
      journeylist: [],
      touchpoints:0,
      avgrsr: 0
    };
  }
  handleDelete = () => {
    alert("You clicked the delete icon."); // eslint-disable-line no-alert
  };

  handleClick = () => {
    alert("You clicked the label."); // eslint-disable-line no-alert
  };
  componentDidMount() {
    myFirebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.getUserinfo({id: user.uid, name: user.displayName, photourl: user.photoURL? user.photoURL:""})
        this.getJourneys(user);
        this.getTouchpoints(user);
        this.getAvgResponseRate(user)
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      // this.setState({
      //   journeylist: 
      // })
    }
  }

  getJourneys = async user => {
    if (user) {
      const result = await myFirestore
        .collection("user")
        .doc(user.uid)
        .collection("journeys")
        .get();
      if (result.docs.length == 0){
        this.props.history.push("/home/nojourney")
      }else{
        this.setState({journeyid: result.docs[0].data().id})
        this.props.updateJourneyStatus(false);
      }
    } else {
      console.log("failed");
    }
  };

  getTouchpoints= async (user) =>{
    await axios
    .post(
      `https://loop-backend-server.herokuapp.com/api/loops/users/touchPoints`,
      {
        senderid: user.uid,
        journeyFriends: []
      }
    )
    .then((res)=>{
      this.setState({touchpoints: res.data.touchPoints})
      console.log()
    })
  }

  getAvgResponseRate = (user)=>{
    axios
    .post(
      `https://loop-backend-server.herokuapp.com/api/loops/users/responseRate`,
      {
        senderid: user.uid
      }
    )
    .then((res)=>{
      console.log(res.data.responseRate)
      this.setState({avgrsr: res.data.responseRate})
    })
  }

  render() {
    const { classes } = this.props;
    return (
         <MuiThemeProvider theme={mytheme}>
         {!this.props.empty? (
        <div className={classes.section2}>
          <Typography gutterBottom variant="h5">
            overview
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
                        percentage={this.state.avgrsr}
                        stroke="#FF8373"
                        diameter={135}
                        strokeWidth={20}
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
                    Touchpoints
                  </Typography>

                  <div className={classes.papercontent}>
                    <div className={classes.papercaption}>
                      <Typography variant="h6">{this.state.touchpoints}</Typography>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={4}>
              {this.props.user.id? (<TotalConnection userid={this.props.user.id}/>) : null}
              </Grid>
            </Grid>
          </div>
          <div className={classes.maincharts}>
            <Paper className={classes.paper}>
              <div className={classes.heatmapheader}>
                <div className={classes.heatmaplefth}>
                  <Typography component="p" color="primary">
                    HeatMap
                  </Typography>
                  {this.props.data.findUsersJourney?(
                    <div>
                      {this.props.data.findUsersJourney.map((v,i)=>{
                        if (v.name==="Stranger") return null;
                        return(
                        <Button key={i}color={i===0?"secondary": "primary"} className={classes.hbutton}
                        onClick={(event)=>{this.setState({journeyid: v.id})}}>
                        {v.name}
                      </Button>)
                      })}
                    </div>
                  ):null}
                </div>
                <form autoComplete="off">
                  <FormControl>
                    <NativeSelect
                      value={10}
                      onChange={this.handleTime}
                      input={
                        <BootstrapInput
                          name="age"
                          id="age-customized-native-simple"
                        />
                      }
                    >
                      <option value="Last 6 Months" />
                      <option value={10}>Last Month</option>
                      <option value={20}>Last 6 Months</option>
                      <option value={30}>Last Year</option>
                    </NativeSelect>
                  </FormControl>
                </form>
              </div>

              <div style={{ padding: 20 }}>
              {this.state.journeyid!==""?(<HeatMap journeyid={this.state.journeyid} />):null}
                
              </div>
            </Paper>
          </div>

          {/* <div className={classes.reminder}>
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
          </div>*/}
        </div> 
        
        ): null}
      </MuiThemeProvider>
     );
  }
}

Overview.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { empty: state.modalReducer.empty, user: state.userReducer.user};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateJourneyStatus,
      getUserinfo
    },
    dispatch
  );
}

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql(
  gql`
    query ($userid: String) {
      findUsersJourney(userid: $userid){
        id,
        name
      }
    }
  `,
  {
    options: props => ({
      variables: {
        userid: props.user.id
      }
})
  }
)(Overview)));
