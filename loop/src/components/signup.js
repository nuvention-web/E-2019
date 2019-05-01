import withRoot from "../modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "../modules/components/Typography";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import AppForm from "../modules/views/AppForm";
import { email, required } from "../modules/form/validation";
import RFTextField from "../modules/form/RFTextField";
import FormButton from "../modules/form/FormButton";
import FormFeedback from "../modules/form/FormFeedback";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link as RouterLink } from "react-router-dom";
import firebase from "firebase";
import { myFirebase, myFirestore } from "../firebase";
import { FormErrors } from "./formErrors";

const styles = theme => ({
  form: {
    marginTop: theme.spacing.unit * 6
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2
  },
  feedback: {
    marginTop: theme.spacing.unit * 2
  }
});

class SignUp extends React.Component {
  state = {
    sent: false,
    email: "",
    password: "",
    confirmpassword: "",
    error: null,
    firstname: "",
    lastname: "",
    checked: false,
    formErrors: { email: '', password: '', firstname: '', lastname: '', confirmpassword: '', checked: false },
    emailValid: false,
    passwordValid: false,
    firstnameValid: false,
    lastNameValid: false,
    confirmpasswordValid: false,
    checkedValid: false,
    formValid: false
  };

  validate = values => {
    const errors = required(
      ["firstname", "lastname", "email", "password"],
      values,
      this.props
    );

    if (!errors.email) {
      const emailError = email(values.email, values, this.props);
      if (emailError) {
        errors.email = email(values.email, values, this.props);
      }
    }

    return errors;
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, firstname, lastname } = this.state;
    const ref = myFirestore.collection("user");

    myFirebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: firstname + " " + lastname,
        }).then(function () {
          // Profile updated successfully!
          //console.log(user)
          const newuser = {
            id: user.uid,
            photourl: "",
            name: user.displayName
          };
          
          ref.doc(user.uid).set(newuser)
            .then(() => {
              console.log("successfully added user")
            })
            .catch(err => {
              console.log(err);
            });

        }, function (error) {
          console.log(error)
          // An error happened.
        }).then(() => this.props.history.push("/home"));
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: error });
        alert(error.message);
      });
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let firstnameValid = this.state.firstnameValid;
    let lastnameValid = this.state.lastnameValid;
    let confirmpasswordValid = this.state.confirmpasswordValid;
    let checkedValid = this.state.checkedValid;
    switch (fieldName) {
      case 'firstname':
        firstnameValid = value.length >= 1;
        fieldValidationErrors.firstname = firstnameValid ? '' : ' is null';
        break;
      case 'lastname':
        lastnameValid = value.length >= 1;
        fieldValidationErrors.lastname = lastnameValid ? '' : ' is null';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      case 'confirmpassword':
        confirmpasswordValid = (value === this.state.password);
        fieldValidationErrors.confirmpassword = confirmpasswordValid ? '' : ' is not right';
        break;
      case 'checked':
        checkedValid = (value === true);
        console.log(value)
        fieldValidationErrors.checked = checkedValid ? '' : 'is not confirmed';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid,
      firstnameValid: firstnameValid,
      lastnameValid: lastnameValid,
      confirmpasswordValid: confirmpasswordValid,
    }, this.validateForm);
  }
  validateForm() {
    this.setState({
      formValid: this.state.checkedValid && this.state.emailValid && this.state.passwordValid && this.state.firstnameValid && this.state.lastnameValid && this.state.confirmpasswordValid
    });
  }
  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  render() {
    const { classes } = this.props;
    const { sent } = this.state;

    return (
      <React.Fragment>
        <AppForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom align="center">
              L o o p
            </Typography>
            <Typography variant="body2" align="center">
              Please complete to create your account
            </Typography>
          </React.Fragment>
          <Form
            onSubmit={this.handleSubmit}
            subscription={{ submitting: true }}
            validate={this.validate}
          >
            {({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Grid container spacing={16}>
                  <Grid item xs={12} sm={6}>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">First Name</InputLabel>
                      <Input
                        name="firstname"
                        id="firstname"
                        onChange={this.handleInputChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Last Name</InputLabel>
                      <Input
                        name="lastname"
                        id="lastname"
                        onChange={this.handleInputChange}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={this.handleInputChange}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.handleInputChange}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Confirm Password</InputLabel>
                  <Input
                    name="confirmpassword"
                    type="password"
                    id="confirmpassword"

                    onChange={this.handleInputChange}
                  />
                </FormControl>
                <div className="panel panel-default">
                  <FormErrors formErrors={this.state.formErrors} />
                </div>
                <FormSpy subscription={{ submitError: true }}>
                  {({ submitError }) =>
                    submitError ? (
                      <FormFeedback className={classes.feedback} error>
                        {submitError}
                      </FormFeedback>
                    ) : null
                  }
                </FormSpy>
                <FormControlLabel
                  control={<Checkbox value="false" color="primary" onChange={(event) => {
                    this.setState({ checkedValid: event.target.checked })
                  }} />}
                  style={{ display: "flex", marginLeft: -20 }}
                  label="I agree with terms and conditions"

                />
                {this.state.checkedValid && this.state.emailValid && this.state.passwordValid && this.state.firstnameValid && this.state.lastnameValid && this.state.confirmpasswordValid ?
                  (<FormButton
                    className={classes.button}
                    disabled={submitting || sent}
                    size="large"
                    color="secondary"
                    width="100"
                    onClick={this.handleSubmit}
                    disabled={false}
                  >
                    {submitting || sent ? "In progress…" : "Sign Up"}
                  </FormButton>) : (<FormButton
                    className={classes.button}
                    disabled={submitting || sent}
                    size="large"
                    color="secondary"
                    width="100"
                    onClick={this.handleSubmit}
                    disabled={true}
                  >
                    {submitting || sent ? "In progress…" : "Sign Up"}
                  </FormButton>)
                }

                <Typography variant="body2" align="center">
                  <Link
                    underline="always"
                    component={RouterLink}
                    to="/app/signin"
                  >
                    Already have an account?Sign In.
                  </Link>
                </Typography>
              </form>
            )}
          </Form>
        </AppForm>
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withRoot,
  withStyles(styles)
)(SignUp);
