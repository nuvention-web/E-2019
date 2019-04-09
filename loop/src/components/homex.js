import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
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
const modules = [
  {
    id: 0,
    name: "Connections",
    description: "Talk to your connections"
  },
  {
    id: 1,
    name: "Skills & Courses",
    description: "Learn skills from courses(Mooc)"
  },
  {
    id: 2,
    name: "Articles & Posts",
    description: "View some relevant articles and posts"
  },
  {
    id: 3,
    name: "Events",
    description: "Participate in relevant events"
  }
];
const styles = theme => ({
  card: {
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
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap"
  },
  skillset: {
    flex: 1
  }
});

class CareerHome extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid item xs={12}>
          <Grid container className={classes.demo} spacing={24}>
            {modules.map(m => (
              <Grid key={m.id} item xs={3}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Module {m.id} : {m.name}
                      </Typography>
                      <Typography component="p">{m.description}</Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    );
  }
}

CareerHome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CareerHome);
