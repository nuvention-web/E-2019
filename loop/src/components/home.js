import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';

const drawerWidth = 240;

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
  },
  overrides: {
    MuiToolbar: {
      regular: {
        backgroundColor: "#4281A4"
      }
    }
  }
});

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
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
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    
  },
  skillset:{
    flex: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

class Home extends React.Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    alert("You clicked the delete icon."); // eslint-disable-line no-alert
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <MuiThemeProvider theme={mytheme}>
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Loop
              </Typography>
            </Toolbar>
          </MuiThemeProvider>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
              <ListItem button key={"UX Designer"}>
                <ListItemText primary={"UX Designer"} />
              </ListItem>
          </List>
          <Divider />
          <List>
              <ListItem button key={"Product Manager"}>
                <ListItemText primary={"Product Manager"} />
              </ListItem>
          </List>
          <Divider />
          <List>
              <ListItem button key={"Software Engineer"}>
                <ListItemText primary={"Software Engineer"} />
              </ListItem>
          </List>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
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
                  label="Product Manager"
                  onDelete={this.handleDelete}
                />
                <Chip
                  className={classes.chip}
                  color="secondary"
                  label="Software Engineer"
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
        <Grid item xs={3}>
          <Paper className={classes.paper}><Typography component="p">
          Communication Skills
            </Typography></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><Typography component="p">
          Analytical Skills
            </Typography></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><Typography component="p">
          Visual Design Skills
            </Typography></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><Typography component="p">
          Empathy
            </Typography></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><Typography component="p">
          Writing Skills
            </Typography></Paper>
        </Grid>
        
      </Grid>
            
            </div>
            
          </div>
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Home);
