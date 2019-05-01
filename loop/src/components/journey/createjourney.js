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
import { updateModalStatus,updateJourneyStatus } from "../../services/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { myFirebase, myFirestore } from "../../firebase";
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

class journeyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jname: ""
    };
    this.createJourney = this.createJourney.bind(this);
  }
  handleClose = () => {
    this.props.updateModalStatus(false);
  };

  createJourney = () => {
    var user = myFirebase.auth().currentUser;
    const ref = myFirestore
      .collection("user")
      .doc(user.uid)
      .collection("journeys")
      .doc();
    ref
      .set({ id: ref.id, journeyname: this.state.jname })
      .then(() => {
        // fetch the doc again and show its data
        this.props.updateJourneyStatus(false)
        ref.get().then(doc => {
          console.log(doc.data()); // prints {id: "the unique id"}
        });
      })
      .then(() => {
        this.props.history.push("/home/journey")
        window.location.reload()
      });
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  render() {
    const { classes } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.show}
        onClose={this.handleClose}
      >
        <div className={classes.paper}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="jname">Journey Name</InputLabel>
            <Input
              id="jname"
              name="jname"
              autoFocus
              onChange={this.handleInputChange}
            />
          </FormControl>
          <FormButton
            className={classes.button}
            size="small"
            color="secondary"
            width="80%"
            onClick={this.createJourney}
          >
            Create
          </FormButton>
        </div>
      </Modal>
    );
  }
}

journeyModal.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { show: state.modalReducer.show, empty: state.modalReducer.empty };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateModalStatus,
      updateJourneyStatus
    },
    dispatch
  );
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(journeyModal)
);
