
import React from 'react';

import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    gridArea: '1 / 1 / span 1 / span 3',
    height: 60,
    boxShadow: 'none',
    backgroundColor: theme.palette.primary[800],
  },
  title: {
    margin: 'auto 0 auto 15px',
  }
});

const TopNav = (props) => {
  const { classes } = props;

  return (
    <AppBar className={classes.root}>
      <Typography className={classes.title}>
        PLAYLYST
      </Typography>
    </AppBar>
  );
};

export default withStyles(styles)(TopNav);
