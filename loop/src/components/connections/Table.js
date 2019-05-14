import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FilterListIcon from "@material-ui/icons/FilterList";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  wraptext:{
    whiteSpace: "pre-line",
  }
});

let id = 0;
function createData(type, notes, date) {
  id += 1;
  return { id, type, notes, date };
}

const rows = [
  createData(
    "Email",
    "Robert and I discussed how I should prepare for my internship this summer working at Cruise. Takeaways:\n-Take advantage of events for autonomous transportation in SF\n-Read up on relevant news",
    "May 13, 2019"
  ),
  createData("Phone", "Discussed my upcoming interview for Cruise Automation", "April 25, 2019"),
  createData("In-person", "Learned more about Robert’s background:\r\n-Has a family with 2 sons, lives in Palo Alto\n-Loves to travel - going to Ecuador in July (Add to reminder - talking points)", "April 11, 201"),
  createData("Chat", "Sent quick note about my current progress", "April 6, 2019"),
  createData("Email", "Reached out through a connection from Stanford MBA program - Robert discussed his current role as Product Director at Waymo and consulting at incubator", "March 15, 2019")
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      {/* <Tooltip title="Filter list">
    <IconButton aria-label="Filter list">
      <FilterListIcon />
    </IconButton>
  </Tooltip> */}
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell padding="dense">Log Type</TableCell>
            <TableCell align="left">Notes</TableCell>
            <TableCell align="left" padding="dense">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.type}
              </TableCell>
              <TableCell align="left" className={classes.wraptext}>{row.notes}</TableCell>
              <TableCell align="left" padding="dense">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
