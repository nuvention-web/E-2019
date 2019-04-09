import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DoneIcon from '@material-ui/icons/Done';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StarIcon from '@material-ui/icons/Star';
import Grid from "@material-ui/core/Grid";
import "../connection.scss";

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
const peoples = [
  {
    id: 0,
    name: "Alex",
    abb:"A",
    description: "UX,UI Designer",
    color:"secondary",
    color2:"primary",
  },
  {
    id: 1,
    name: "Bob",
    abb:"A",
    description: "UX,UI Designer",
    details: "UX,UI Designer",
    color:"secondary",
    color2:"primary",
  },
  {
    id: 2,
    name: "Amy",
    abb:"A",
    description: "UX,UI Designer",
    details: "UX,UI Designer",
    color:"disabled",
    color2:"primary",
  },
  {
    id: 3,
    name: "Carrie",
    abb:"A",
    description: "UX,UI Designer",
    color:"disabled",
    color2:"disabled",
  }
];
const styles = theme => ({
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  },
  section2: {
    margin: theme.spacing.unit * 2
  },
  card: {
    maxWidth: 400,
  },
  media: {
    height: 200,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class Connection extends Component {
constructor(props) {
        super(props);
      }
  state = { expanded: false };
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid item xs={12}>
          <Grid container className={classes.demo} spacing={24}>
            {peoples.map(p => (
              <Grid key={p.id} item xs={3}>
                <Card className={classes.card} button onPress={() => this.props.history.push('/home')}>
                                
        <CardHeader
          action={
            <IconButton>
              <StarIcon color={p.color}/>
            </IconButton>
          }
          title={p.name}
          subheader={p.description}
        />
        <CardMedia
          className={classes.media}
          image="https://bootdey.com/img/Content/avatar/avatar6.png"
          title="Profile Image"
        />
        <CardContent>
          <Typography component="p">
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Done">
            <DoneIcon color={p.color2} />
            TALK TO
          </IconButton>
          
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>...</Typography>
          </CardContent>
        </Collapse>
      </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    );
  }
}

Connection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Connection);
