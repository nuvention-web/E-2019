import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormButton from "../../modules/form/FormButton";
import { myFirebase, myFirestore } from "../../firebase";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { FormErrors } from "../formErrors";
const styles = theme => ({
  section_center: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  bigAvatar: {
    margin: 10
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
  fbutton: {
    marginRight: 0
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
    marginTop: 0,
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
      name: "",
      email: "",
      company:"",
      success: false,
      formErrors: {email: ''},
      emailValid: false,
      formValid: false

  
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
      console.log(this.props.location.state)
  }
  validateField(value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    fieldValidationErrors.email = emailValid ? '' : ' is invalid';
    this.setState({formErrors: fieldValidationErrors,
      emailValid: emailValid,formValid: this.state.emailValid});
  }

  handleSubmit() {
    var user = myFirebase.auth().currentUser;

    if (
      user &&
      this.state.name !== "" &&
      this.state.email !== "" &&
      this.company!==""&&
      this.state.emailValid&&
           this.props.location.state.journeyid
    ) {
      this.props.mutate({
        variables: {
          input: {
            userid: user.uid,
            journeyid: this.props.location.state.journeyid,
            name: this.state.name,
            email: this.state.email,
            company:this.state.company
          }
        }
      });
      this.setState({
        name: "",
        email: "",
        company:"",
        success: true
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={mytheme}>
        <div className={classes.section_center}>
          <Paper className={classes.paper} elevation={1}>
            <Input
              placeholder="Name"
              className={classes.input}
              value={this.state.name}
              inputProps={{
                "aria-label": "Description"
              }}
              onChange={event => this.setState({ name: event.target.value })}
            />
            <Input
              placeholder="Email"
              className={classes.input}
              value={this.state.email}
              inputProps={{
                "aria-label": "Description"
              }}
              onChange={event =>{
                 this.setState({ email: event.target.value });
                 if(event.target.value!="")
                  this.validateField(event.target.value);
                }}
            />
            <Input
              placeholder="Company"
              className={classes.input}
              value={this.state.company}
              inputProps={{
                "aria-label": "Description"
              }}
              onChange={event => this.setState({ company: event.target.value })}
            />
            <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  value="false"
                  color="primary"
                  onChange={event => {
                    this.setState({ checkedValid: event.target.checked });
                  }}
                />
              }
              style={{ display: "flex", marginLeft: -20, marginTop: 30 }}
              label="Invite his/her via email"
            />

            <FormButton
              className={classes.button3}
              size="small"
              color="secondary"
              width="80%"
              onClick={this.handleSubmit}
            >
              Add Manually
            </FormButton>
            <Button
              color="primary"
              className={classes.button}
              onClick={() => {
                this.props.history.push({pathname:"/home/connection"})
              }}
            >
              I'm done
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

export default withStyles(styles)(
  graphql(
    gql`
      mutation($input: Friend!) {
        createFriend(input: $input) {
          id
          name
          email
          photourl
          type
        }
      }
    `
  )(ImportManual)
);
