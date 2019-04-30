import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import BarChartIcon from "@material-ui/icons/BarChart";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ChatIcon from "@material-ui/icons/Chat";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import Overview from "./overview";
import Connection from "./connections/connection";
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Badge from "@material-ui/core/Badge";
import Journeyoverview from "./journey/journeyoverview";
import Journeycontent from "./journey/journeycontent";
import connectiondetails from "./connections/connectiondetails";
import nojourney from "./journey/nojourny";
import noconnection from "./connections/noconnection";
import Chat from "./chat";
import { myFirebase } from "../firebase";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import firebase from "firebase"
const drawerWidth = 240;

const mytheme = createMuiTheme({
  palette: {
    primary: {
      main: "#4281A4"
    },
    secondary: {
      main: "#FFC06A"
    },
    error: {
      main: "#FE938C"
    }
  },
  overrides: {
    MuiToolbar: {
      regular: {
        backgroundColor: "#fefcfe"
      }
    },
    MuiAppBar: {
      root: {
        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .03)"
      }
    },
    MuiDrawer: {
      paper: {
        backgroundColor: "#3a394f"
      }
    },
    MuiListItemText: {
      primary: {
        color: "#fefcfe"
      }
    },
    MuiListItemIcon: {
      root: {
        color: "#9596aa"
      },
      secondary: {
        color: "#8092c9"
      }
    }
  }
});

const styles = theme => ({
  root: {
    display: "flex",
    color: "#fff",
    backgroundColor: "#f0f0f7",
    minHeight: "100vh"
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  iconbtn: {
    marginTop: theme.spacing.unit * 1.2,
    width: 45,
    height: 45
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
    // display: "flex",
    //alignItems: "center",
    backgroundColor: "#313344",
    padding: "18px 18px",
    ...theme.mixins.toolbar
    //justifyContent: "flex-end"
  },
  drawerHeaderHeight: {
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.1)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    color: theme.palette.common.black,
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    },
    color: theme.palette.common.black
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  }
});

class Home extends React.Component {
  state = {
    open: true,
    switch: false,
    openAccount:false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleToggleAccount = () => {
    this.setState(state => ({ openAccount: !state.openAccount }));
  };

  handleCloseAccount = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ openAccount: false });
  };
  componentDidMount = () => {
    myFirebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user is logged");
      }else{
        this.props.history.push("/app/signin");
      }
    });
  };

  render() {
    const { classes, theme } = this.props;
    const { open,openAccount } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <MuiThemeProvider theme={mytheme}>
          <AppBar position="fixed" className={classNames(classes.appBar)}>
            <Toolbar disableGutters={!open}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton className={classes.iconbtn}>
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                 buttonRef={node => {
                  this.anchorEl = node;
                }}
                aria-owns={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={this.handleToggleAccount}
                color="inherit"
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    className={classes.avatar}
                  />
                </IconButton>
                <Popper open={openAccount} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleCloseAccount}>
                    <MenuList>
                      <MenuItem >Profile</MenuItem>
                      <MenuItem onClick={() => firebase.auth().signOut()}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
              </div>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
        <nav className={classes.drawer}>
          <MuiThemeProvider theme={mytheme}>
            <Drawer
              variant="persistent"
              anchor="left"
              open
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <div className={classes.drawerHeader}>
                <Typography
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.brandname}
                >
                  LOOP
                </Typography>
              </div>
              <List>
                <ListItem
                  button
                  key={"Overview"}
                  onClick={() => this.props.history.push("/home/overview")}
                >
                  <ListItemIcon>
                    <HomeIcon color="#9596aa" />
                  </ListItemIcon>
                  <ListItemText primary={"Overview"} />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem
                  button
                  key={"Journey"}
                  onClick={() => this.props.history.push("/home/nojourney")}
                >
                  <ListItemIcon>
                    <BarChartIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Journey"} />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem
                  button
                  key={"Connections"}
                  onClick={() => this.props.history.push("/home/connection")}
                >
                  <ListItemIcon>
                    <PermIdentityIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Connections"} />
                </ListItem>
              </List>
              <List>
                <ListItem
                  button
                  key={"Chat Rooms"}
                  onClick={() => this.props.history.push("/home/chatroom")}
                >
                  <ListItemIcon>
                    <ChatIcon style={{ fontSize: 22 }} />
                  </ListItemIcon>
                  <ListItemText primary={"Chat Rooms"} />
                </ListItem>
              </List>
              <List>
                <ListItem button key={"Calendar"}>
                  <ListItemIcon>
                    <CalendarTodayIcon style={{ fontSize: 22 }} />
                  </ListItemIcon>
                  <ListItemText primary={"Calendar"} />
                </ListItem>
              </List>
            </Drawer>
          </MuiThemeProvider>
        </nav>
        <main className={classNames(classes.content)}>
          <div className={classes.drawerHeaderHeight} />
          <Switch>
            <Redirect exact from={`/home`} to={`/home/overview`} />
            <Route path="/home/overview" component={Overview} />
            <Route path="/home/nojourney" component={nojourney} />
            <Route path="/home/journey" component={Journeyoverview} />
            <Route path="/home/journeycontent" component={Journeycontent} />
            <Route path="/home/noconnection" component={noconnection} />
            <Route path="/home/connection" component={Connection} />
            <Route
              path="/home/connectiondetails"
              component={connectiondetails}
            />
            <Route path="/home/chatroom" component={Chat} />
          </Switch>
          {/*          
          {this.state.switch ? <CareerHome /> : <MainHome />} */}
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
