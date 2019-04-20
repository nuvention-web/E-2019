
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    borderRadius: 3,
    fontWeight: theme.typography.fontWeightMedium,
    fontFamily: theme.typography.fontFamilySecondary,
    padding: `${theme.spacing.unit * 2 - 1}px ${theme.spacing.unit * 4}px`,
    fontSize: theme.typography.pxToRem(14),
    backgroundColor: '#43425D',
    boxShadow: 'none',
    '&:active, &:focus': {
      boxShadow: 'none',
    },
    '&:hover' :{
      backgroundColor: '#2F2E50'
    }
  },
  sizeSmall: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
    fontSize: theme.typography.pxToRem(13),
    marginRight: theme.spacing.unit * 8,
  },
  sizeLarge: {
    padding: `${theme.spacing.unit * 3 - 12}px ${theme.spacing.unit * 4}px`,
    fontSize: theme.typography.pxToRem(16),
  },
});

function Button(props) {
  return <MuiButton {...props} />;
}

export default withStyles(styles)(Button);