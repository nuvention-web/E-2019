import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormButton from "../../modules/form/FormButton";
import JourneyModal from "./createjourney";
import {updateModalStatus} from "../../services/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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

const mytheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class Nojourney extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.updateModalStatus(true);
  }

  render() {
    const { classes, history } = this.props;
    return (
      <MuiThemeProvider theme={mytheme}>
        <div className={classes.section_center}>
          <Typography gutterBottom variant="h5">
            Seems like you don’t have a group yet…
          </Typography>
          <FormButton
            className={classes.journeybutton}
            size="large"
            color="secondary"
            width="100"
            onClick={this.handleClick}
          >
            Create  Group
          </FormButton>
          <JourneyModal history={history}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

Nojourney.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateModalStatus
    },
    dispatch
  );
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(Nojourney)
);
