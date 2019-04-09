import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
const mytheme = createMuiTheme({
  palette: {
    primary: {
      light: "#D3D0CB",
      main: "#4281A4",
      dark: "#9CAFB7"
    },
    secondary: {
      main: "#EAD2AC",
      dark: "#E6B89C"
    },
    error: {
      main: "#FE938C"
    }
  }
});

const styles = theme => ({
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  },
  section2: {
    margin: theme.spacing.unit * 2
  },
  chip: {
    margin: theme.spacing.unit
  },
  lightchip: {
    margin: theme.spacing.unit,
    backgroundColor: mytheme.palette.primary.light,
    color: "#000"
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap"
  },
  skillset: {
    flex: 1
  }
});

class MainHome extends Component {
  
  handleDelete = () => {
    alert("You clicked the delete icon."); // eslint-disable-line no-alert
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.section1}>
          <Typography gutterBottom variant="h4">
            Hello, Puno
          </Typography>
        </div>

        <Divider variant="middle" />
        <div className={classes.section2}>
          <Typography gutterBottom variant="h5">
            Goal
          </Typography>
          <div>
            <MuiThemeProvider theme={mytheme}>
              <Chip
                className={classes.chip}
                color="secondary"
                label="UX Designer"
                onDelete={this.handleDelete}
              />
              <Chip
                className={classes.chip}
                color="secondary"
                label="Frontend Engineer"
                onDelete={this.handleDelete}
              />
              <Chip
                className={classes.chip}
                color="secondary"
                label="Fullstack Engineer"
                onDelete={this.handleDelete}
              />
              <Chip
                className={classes.lightchip}
                color="primary"
                label="UX Designer"
                onDelete={this.handleDelete}
              />
              <Chip
                className={classes.lightchip}
                color="primary"
                label="Product Manager"
                onDelete={this.handleDelete}
              />
              <Chip
                className={classes.lightchip}
                color="primary"
                label="Software Engineer"
                onDelete={this.handleDelete}
              />
              <Chip
                className={classes.lightchip}
                color="primary"
                label="Hard"
                onDelete={this.handleDelete}
              />
            </MuiThemeProvider>
          </div>
        </div>

        <Divider variant="middle" />
        <div className={classes.section2}>
          <Typography gutterBottom variant="h5">
            Skillsets
          </Typography>
          <div className={classes.skillset}>
            <Grid container spacing={24}>
              <Grid item xs={2}>
                <Paper className={classes.paper}>
                  <Typography component="p">HTML/CSS</Typography>
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>
                  <Typography component="p">JavaScript/jQuery</Typography>
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>
                  <Typography component="p">Vue.js</Typography>
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>
                  <Typography component="p">React.js</Typography>
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>
                  <Typography component="p">Python</Typography>
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>
                  <Typography component="p">Java</Typography>
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>
                  <Typography component="p">C++</Typography>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

MainHome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainHome);
