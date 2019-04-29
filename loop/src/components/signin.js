import withRoot from '../modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '../modules/components/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AppForm from '../modules/views/AppForm';
import { email, required } from '../modules/form/validation';
import RFTextField from '../modules/form/RFTextField';
import FormButton from '../modules/form/FormButton';
import FormFeedback from '../modules/form/FormFeedback';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Link as RouterLink } from 'react-router-dom'
import firebase from "firebase";
import { myFirebase } from "../firebase";

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

class SignIn extends React.Component {
  state = {
    sent: false,
    email: "",
    password: "",
  };

  validate = values => {
    const errors = required(['email', 'password'], values, this.props);

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
    const { email, password } = this.state;
    myFirebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.props.history.push("/home");
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
            <Typography variant="h3" gutterBottom  align="center">
              L O O P
            </Typography>
            <Typography variant="body2" align="center">
            Make Better Network   
            </Typography>
          </React.Fragment>
          <Form
            onSubmit={this.handleSubmit}
            subscription={{ submitting: true }}
            validate={this.validate}
          >
            {({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus 
         onChange={this.handleInputChange}
/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" 
            onChange={this.handleInputChange}

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
            style={{display:'inline-flex',width:'80%',marginLeft:-20}}
            label="Remember me"
            />
            <Typography align="center" style={{display:'inline-flex'}}>
            <Link underline="always" component={RouterLink} to="/app/forgetpassword">
              Forgot password?
            </Link>
          </Typography>
        
                <FormButton
                  className={classes.button}
                  size="small"
                  color="secondary"
                  width="80%"
                  onClick={this.handleSubmit}
                >
                  {submitting || sent ? 'In progress…' : 'Log In'}
                </FormButton>
                
                <Button variant="outlined" className={classes.button}
                onClick={()=>this.props.history.push("/app/signup")}>
                Sign Up
                </Button>
              
              </form>
            )}
          </Form>
          
        </AppForm>
        
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withRoot,
  withStyles(styles),
)(SignIn);