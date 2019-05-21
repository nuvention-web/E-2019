import React from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import ReactFileReader from "react-file-reader";
import PropTypes from "prop-types";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import { myFirebase } from "../firebase";
import axios from "axios";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import EnhancedTable from "./uploadTable/uploadtable";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
    fontSize: 20
  },
  section_center: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 4,
    outline: "none",
    overflow: "auto"
  }
});
const mytheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#f4f4f8"
    },
    secondary: {
      main: "#3B86FF"
    },
    error: {
      main: "#FE938C"
    }
  },
  overrides: {
    MuiPaper: {
      elevation2: {
        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .05)"
      }
    },

  }
});

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      loading: true
    };
    this.handleFiles = this.handleFiles.bind(this)
  }

  componentDidMount(){
  }

  handleFiles = files => {
    
    let user = myFirebase.auth().currentUser;
    let formData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" }
    };
    formData.append("file", files[0]);
    formData.append("filename", "contactFile");
    formData.append("uid", user.uid);
    if (user) {
      console.log("hi")
      axios
        .post(
          "https://loop-backend-server.herokuapp.com/api/loops/users/linkedInConnectionFilesUpload",
          formData,
          config
        )
        .then((res) =>{
          console.log(res)
          this.setState({data: res.data, loading: false})
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  };


  renderTable(){
    let viewTable = []
    if(this.props.data.findUsersJourney&&!this.state.loading){
      console.log("hi")
      viewTable.push(<EnhancedTable data={this.state.data} listjourneys={this.props.data.findUsersJourney}/>)
      return viewTable
    }else{
      return null
    }
    
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <MuiThemeProvider theme={mytheme}>
        <div className={classes.section_center}>
          <Paper className={classes.paper} elevation={1}>
            <Typography variant="h6">Upload your own connection csv file</Typography>
            <ReactFileReader handleFiles={this.handleFiles} fileTypes={".csv"}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Upload
                <CloudUploadIcon className={classes.rightIcon} />
              </Button>
            </ReactFileReader>
            {this.renderTable()}
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default withStyles(styles, { withTheme: true })(graphql(
  gql`
    query($userid: String) {
      findUsersJourney(userid: $userid) {
        id
        name
      }
    }
  `,
  {
    options: props => ({
      variables: {
        userid: props.location.state.uid
      },
      fetchPolicy: "cache-and-network"
    })
  }
)(Upload));
