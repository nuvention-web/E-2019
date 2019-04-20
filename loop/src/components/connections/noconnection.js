import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormButton from "../../modules/form/FormButton";

const styles = theme => ({
    section_center:{
        height: "80vh",
        display:"flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    journeybutton:{
        marginTop: theme.spacing.unit * 2
    }
});

const mytheme = createMuiTheme({});

class NoConnection extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={mytheme}>
        <div className={classes.section_center}>
          <Typography gutterBottom variant="h5">
          Seems like you don’t have any contacts yet…
          </Typography>
          <FormButton
            className={classes.journeybutton}
            size="large"
            color="secondary"
            width="100"
            onClick={() => this.props.history.push("/home/journeycontent")}
          >
            Import Contacts
          </FormButton>
        </div>
      </MuiThemeProvider>
    );
  }
}

NoConnection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NoConnection);
