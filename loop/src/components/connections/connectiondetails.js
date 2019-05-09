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
import PieExample from "../charts/pie";
import LineExample from "../charts/line";
import LineChart from "../charts/linechart";
import PieChart from "../charts/piechart";
import Heat from "../charts/heat";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import axios from "axios";
import { myFirebase } from "../../firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
<<<<<<< HEAD
import EnhancedTable from "./Table"
=======
import gql from "graphql-tag";
import { graphql } from "react-apollo";

>>>>>>> 655d4ad06bbee600d09ff2e9346acf54aeed3c26
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
        fontWeight: "bold",
        fontSize: "1rem"
      },
      h5: {
        fontWeight: "bold"
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
  },
  timelineheader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bootstrapFormLabel: {
    fontSize: 18
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 8,
    marginLeft: 5
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    // width: 200
  },
  bootstrapRoot: {
    "label + &": {
      marginTop: theme.spacing.unit * 3
    },
    height: 100,
    flexGrow: 1
  },
  bootstrapInput: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    height: 60,
    padding: "10px 12px",
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
  },
  margin: {
    margin: theme.spacing.unit,
    width: "100%"
  },
  paper_journey_add: {
    marginTop: theme.spacing.unit * 2,
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    width:80
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

class ConnectionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "",
      touchpoints: 0,
      notes:"",
      date: "",
      type: "",
      success: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange = event => {
    this.setState({ time: event.target.value });
  };
  handleDelete = () => {
    alert("You clicked the delete icon."); // eslint-disable-line no-alert
  };

  handleClick = () => {
    alert("You clicked the label."); // eslint-disable-line no-alert
  };

  componentDidMount() {
    console.log(this.props.location.state)
    myFirebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.getTouchpoints(user);
      }
    });
  }

  handleChangeLogType(ev){
    this.setState({type: ev.target.value })
  }

  handleChangeLogDate(ev){
    let timestamp = Date.parse(ev.target.value)
    this.setState({date: timestamp.toString()})
  }

  handleNotes(ev){
    this.setState({notes: ev.target.value })
  }

  handleSubmit(){
    var user = myFirebase.auth().currentUser;
    if (
      user &&
      this.state.type !== "" &&
      this.state.date !== "" &&
      this.props.location.state.id
    ) {
      let groupid = user.uid + "-" + this.props.location.state.id;
      this.props.mutate({
        variables: {
          input: {
            id: groupid,
            timestamp: this.state.date,
            notes: this.state.notes,
            type: this.state.type
          }
        }
      });
      this.setState({
        notes: "",
        date: "",
        type: "",
        success: true
      });
    }
  }

  getTouchpoints = async user => {
    await axios
      .post(
        `https://loop-backend-server.herokuapp.com/api/loops/users/touchPoints`,
        {
          senderid: user.uid,
          journeyFriends: [this.props.location.state.id]
        }
      )
      .then(res => {
        this.setState({ touchpoints: res.data.touchPoints });
        // console.log(res.data.touchPoints)
      });
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
                        <Typography variant="h6">
                          {this.props.location.state.username}
                        </Typography>
                        <div className={classes.connectionicon} />
                      </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className={classes.paper}>
                  <Typography variant="body1" color="primary">
                    Overall Avg. Response Rate
                  </Typography>
                  <div className={classes.papercontent_bar}>
                    <div className={classes.papercaption} />
                    <div className={classes.progressbar}>
                      <SemiCircleProgressBar
                        percentage={this.props.avgrr}
                        stroke="#FFDA83"
                        diameter={135}
                        strokeWidth={20}
                        background="#F0F2F8"
                        showPercentValue
                      />
                    </div>
                  </div>
                </Paper>
              </Grid>

              <Grid item xs>
                <Paper className={classes.paper}>
                  <Typography variant="body1" color="primary">
                    Total Touchpoints
                  </Typography>
                  <div className={classes.papercontent}>
                    <div className={classes.papercaption}>
                      <Typography variant="h5">
                        {this.state.touchpoints}
                      </Typography>
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
          <div className={classes.log}>
          <Grid container spacing={24}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <div className={classes.timelineheader}>
                <Typography variant="body1" color="primary">
                  Activity Log
                </Typography>
              </div>

              <div
                style={{
                  paddingLeft: 12,
                  display: "flex",
                  flexWrap: "wrap",
                  marginTop: 10
                }}
              >
                <Typography component="p" style={{ marginTop: 20 }}>
                  Touchpoint Type
                </Typography>
                <form className={classes.root} autoComplete="off">
                  <FormControl className={classes.formControl}>
                    <Select
                      value={this.state.type}
                      onChange={(ev)=>this.handleChangeLogType(ev)}
                      inputProps={{
                        name: "age",
                        id: "age-simple"
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="email">Email</MenuItem>
                      <MenuItem value="chat">Chat</MenuItem>
                      <MenuItem value="inperson">In-Person</MenuItem>
                      <MenuItem value="socialmedia">Social-Media</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography
                    component="p"
                    style={{ marginTop: 20, marginLeft: 20 }}
                  >
                    Date
                  </Typography>
                </form>
                <form className={classes.container} noValidate>
                  <TextField
                    id="date"
                    label=""
                    type="date"
                    defaultValue=""
                    onChange={(ev)=>this.handleChangeLogDate(ev)}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </form>
              </div>
              <div
                style={{
                  paddingLeft: 12,
                  display: "flex",
                  flexDirection: "row",
                  flexGrow: 1,
                }}
              >
                <Typography component="p" style={{ marginTop: 20 }}>
                  Notes
                </Typography>
                <FormControl className={classes.margin}>
                  <InputBase
                    id="bootstrap-input"
                    defaultValue=""
                    value={this.state.notes}
                    onChange={(ev)=>this.handleNotes(ev)}
                    classes={{
                      root: classes.bootstrapRoot,
                      input: classes.bootstrapInput
                    }}
                  />
                </FormControl>
                <Paper className={classes.paper_journey_add}>
                  <IconButton className={classes.backbutton} onClick={this.handleSubmit}>
                    <AddIcon style={{ fontSize: 25 }} />
                  </IconButton>
                </Paper>
              </div>
            </Paper>
            </Grid>
            </Grid>
          </div>
          <div className={classes.maincharts}>
            <Paper className={classes.paper}>
              <div className={classes.timelineheader}>
                <Typography variant="body1" color="primary">
                  TimeLine
                </Typography>
                <form autoComplete="off">
                  <FormControl className={classes.margin2}>
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
                <LineChart friendid={this.props.location.state.id} />
              </div>
            </Paper>
          </div>
<<<<<<< HEAD
          <div className={classes.maincharts}>
            <Paper className={classes.paper}>
              <div className={classes.timelineheader}>
                <Typography variant="body1" color="primary">
                  Table
                </Typography>
                <form autoComplete="off">
                  <FormControl className={classes.margin2}>
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
                <EnhancedTable />
              </div>
            </Paper>
          </div>
          <div className={classes.maincharts}>
            <Paper className={classes.paper}>
              <div className={classes.timelineheader}>
                <Typography variant="body1" color="primary">
                  Activity Log
                </Typography>
              </div>
=======
>>>>>>> 655d4ad06bbee600d09ff2e9346acf54aeed3c26

          <div className={classes.reminder}>
            <Grid container spacing={24}>
              <Grid item xs>
                <Paper className={classes.paper}>
                  <div className={classes.timelineheader}>
                    <Typography variant="body1" color="primary">
                      Touchpoint
                    </Typography>
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
                  <div className={classes.papercontent}>
                    <div className={classes.papercaption} />
                  </div>
                  <PieExample />

                  <div className={classes.papercontent}>
                    <div className={classes.papercaption} />
                  </div>
                </Paper>
              </Grid>
              <Grid item xs>
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

const mapStateToProps = state => {
  return { avgrr: state.rrReducer.value };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null
  )(graphql(
    gql`
    mutation($input: Log!) {
      createLog(input: $input)
      }
    `
  )(ConnectionDetails))
);
