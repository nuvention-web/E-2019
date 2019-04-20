import withRoot from '../modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '../modules/components/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AppForm from '../modules/views/AppForm';
import { email, required } from '../modules/form/validation';
import RFTextField from '../modules/form/RFTextField';
import FormButton from '../modules/form/FormButton';
import FormFeedback from '../modules/form/FormFeedback';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link as RouterLink } from 'react-router-dom'

const styles = theme => ({
  form: {
    marginTop: theme.spacing.unit * 6,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
  },
  feedback: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SignUp extends React.Component {
  state = {
    sent: false,
  };

  validate = values => {
    const errors = required(['firstName', 'lastName', 'email', 'password'], values, this.props);

    if (!errors.email) {
      const emailError = email(values.email, values, this.props);
      if (emailError) {
        errors.email = email(values.email, values, this.props);
      }
    }

    return errors;
  };

  handleSubmit = () => {};

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
            <InputLabel htmlFor="password">Last Name</InputLabel>
            <Input name="password"  id="password" autoComplete="current-password" />
          </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Last Name</InputLabel>
            <Input name="password"  id="password" autoComplete="current-password" />
          </FormControl>
                  </Grid>
                </Grid>
                <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Confirm Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
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
            style={{display:'flex',marginLeft:-20}}
            label="I agree with terms and conditions"
            />
                <FormButton
                  className={classes.button}
                  disabled={submitting || sent}
                  size="large"
                  color="secondary"
                  width="100"
                >
                  {submitting || sent ? 'In progress…' : 'Sign Up'}
                </FormButton>
                <Typography variant="body2" align="center">
              <Link  underline="always" component={RouterLink} to="/signin">
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
  classes: PropTypes.object.isRequired,
};

export default compose(
  withRoot,
  withStyles(styles),
)(SignUp);