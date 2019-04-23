import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormButton from "../../modules/form/FormButton";
import Modal from "@material-ui/core/Modal";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const styles = theme => ({
  section_center: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  journeybutton: {
    marginTop: theme.spacing.unit * 2
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
    top: "50%",
    left: "50%",
    marginLeft: -theme.spacing.unit * 25 + 120,
    marginTop: -theme.spacing.unit * 10
  }
});

const mytheme = createMuiTheme({});

class Nojourney extends Component {
  state = {
    open: false
  };
  handleClose = () => {
    this.setState({
      open: false
    }); 
  };
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={mytheme}>
        <div className={classes.section_center}>
          <Typography gutterBottom variant="h5">
            Seems like you don’t have a journey yet…
          </Typography>
          <FormButton
            className={classes.journeybutton}
            size="large"
            color="secondary"
            width="100"
            onClick={() => this.setState({ open: true })}
          >
            Create Journey
          </FormButton>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div className={classes.paper}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="jname">Journey Name</InputLabel>
                <Input id="jname" name="jname" autoFocus />
              </FormControl>
              <FormButton
                className={classes.button}
                size="small"
                color="secondary"
                width="80%"
                onClick={() => this.props.history.push("/home/journey")}
              >
                Create
              </FormButton>
            </div>
          </Modal>
        </div>
      </MuiThemeProvider>
    );
  }
}

Nojourney.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Nojourney);
