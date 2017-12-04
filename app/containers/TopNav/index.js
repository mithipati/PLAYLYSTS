
import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';

import { withStyles } from 'material-ui/styles';
import styles from './style';

const TopNav = ({ classes }) => {
  return (
    <AppBar className={classes.root}>
        <Link to='/'>
          <Typography className={classes.logo}>
              PLAYLYST
          </Typography>
        </Link>
    </AppBar>
  );
};

export default withStyles(styles)(TopNav);
