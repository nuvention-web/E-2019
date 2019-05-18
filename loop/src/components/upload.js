import React from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import ReactFileReader from "react-file-reader";
import PropTypes from "prop-types";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});
class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleFiles = files => {
    var reader = new FileReader();
    reader.onload = function(e) {
      // Use reader.result
      alert(reader.result);
    };
    reader.readAsText(files[0]);
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <div>
        <ReactFileReader handleFiles={this.handleFiles} fileTypes={".csv"}>
          <IconButton
            variant="contained"
            color="default"
            className={classes.button}
          >
            <CloudUploadIcon
              className={classes.rightIcon}
              style={{ fontSize: 20 }}
            />
          </IconButton>
        </ReactFileReader>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Upload);
