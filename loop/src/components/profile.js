import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { myFirebase, myStorage, myFirestore } from "../firebase";
import Avatar from "@material-ui/core/Avatar";
import CameraIcon from "@material-ui/icons/CameraAlt";
import { IconButton } from "@material-ui/core";
import "./css/profile.css";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  section_center: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  bigAvatar: {
    margin: 10,
    width: 80,
    height: 80
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  dialogh: {
    display: "flex",
    justifyContent: "flex-end"
  },
  dialogf: {
    display: "flex",
    justifyContent: "center"
  },
  UserName: {
    marginTop: theme.spacing.unit * 3,
    width: 200
  },
  fbutton: {
    marginTop: theme.spacing.unit * 2
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
  },
  paper: {
    width: 400,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: 200,
    marginTop: 0
  },
  button3: {
    width: 200,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: 64
  },
  input: {
    width: 300,
    marginTop: theme.spacing.unit * 3,
    margin: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit
  }
});

const mytheme = createMuiTheme({
  typography: {
    useNextVariants: true
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
  }
});
class ImportManual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      photourl: "",
      name: ""
    };
    this.newAvatar = null;
  }

  componentDidMount() {
    myFirebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          photourl: user.photoURL,
          name: user.displayName
        })
      } 
    });
    
  }

  onChangeName = event => {
    this.setState({ name: event.target.value });
  };

  onChangeAvatar = event => {
    if (event.target.files && event.target.files[0]) {
      // Check this file is an image?
      const prefixFiletype = event.target.files[0].type.toString();
      if (prefixFiletype.indexOf("image/") !== 0) {
        console.log("This file is not an image");
        return;
      }
      this.newAvatar = event.target.files[0];
      this.setState({ photourl: URL.createObjectURL(event.target.files[0]) });
    } else {
      console.log("Something wrong with input file");
    }
  };

  uploadAvatar = () => {
    this.setState({
      isLoading: true
    });

    if (this.newAvatar && this.state.name !== "") {
      const uploadTask = myStorage
        .ref()
        .child(this.props.location.state.id)
        .put(this.newAvatar);
      uploadTask.on(
        "state_changed",
        null,
        err => {
          console.log(err.message);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.updateUserInfo(true, downloadURL);
          });
        }
      );
    } else {
      this.updateUserInfo(false, null);
    }
  };

  updateUserInfo = (isUpdatePhotoUrl, downloadURL) => {
    var user = myFirebase.auth().currentUser;
    if (user) {
      let newInfo, newAinfo;
      if (isUpdatePhotoUrl) {
        newInfo = {
          name: this.state.name,
          photourl: downloadURL
        };
        newAinfo = {
          displayName: this.state.name,
          photoURL: downloadURL
        };
      } else {
        newInfo = {
          name: this.state.name
        };
        newAinfo = {
          displayName: this.state.name
        };
      }
      user.updateProfile(newAinfo).then(() => {
        myFirestore
          .collection("user")
          .doc(user.uid)
          .update(newInfo)
          .then(data => {
            if (isUpdatePhotoUrl) {
              this.setState({ photourl: downloadURL });
            }
            this.setState({ isLoading: false });
            console.log("Update info success");
          });
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={mytheme}>
        <div className={classes.section_center}>
          <Paper className={classes.paper} elevation={1}>
            <Avatar
              alt="Avatar"
              src={
                this.state.photourl
                  ? this.state.photourl
                  : "https://i.ibb.co/DYgZrjC/loading.png"
              }
              className={classes.bigAvatar}
            />
            <div className="viewWrapInputFile">
              <IconButton
                className={classes.margin}
                onClick={() => this.refInput.click()}
              >
                <CameraIcon style={{ fontSize: 20 }} />
              </IconButton>
              <input
                ref={el => {
                  this.refInput = el;
                }}
                accept="image/*"
                className="viewInputFile"
                type="file"
                onChange={this.onChangeAvatar}
              />
            </div>

            <TextField
              id="standard-read-only-input"
              label="Name"
              value={this.state.name}
              className={classes.UserName}
              margin="normal"
              onChange={this.onChangeName}
            />

            <Button
              color="primary"
              className={classes.fbutton}
              onClick={event => this.uploadAvatar()}
            >
              Update
            </Button>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

ImportManual.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImportManual);
