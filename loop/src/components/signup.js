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
import { myFirebase } from "../firebase";

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
    error: null,
    firstname: "",
    lastname: ""
  };

  validate = values => {
    const errors = required(
      ["firstName", "lastName", "email", "password"],
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
    console.log("Eeee");
    const { email, password, firstname, lastname } = this.state;
    myFirebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        myFirebase
          .database()
          .ref("users/" + user.user.uid)
          .set({
            firstname: firstname,
            lastname: lastname
          }).then(()=> this.props.history.push("/home"));
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: error });
      });
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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
                    autoComplete="current-password"
                  />
                </FormControl>
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
                  control={<Checkbox value="remember" color="primary" />}
                  style={{ display: "flex", marginLeft: -20 }}
                  label="I agree with terms and conditions"
                />
                <FormButton
                  className={classes.button}
                  disabled={submitting || sent}
                  size="large"
                  color="secondary"
                  width="100"
                  onClick={this.handleSubmit}
                >
                  {submitting || sent ? "In progress…" : "Sign Up"}
                </FormButton>
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
