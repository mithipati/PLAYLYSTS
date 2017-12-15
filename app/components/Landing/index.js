
import React from 'react';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Loader from '../Loader';

import { withStyles } from 'material-ui/styles';
import styles from './style';

const Landing = (props) => {
  const { isLoaded, classes } = props;

  return (
    <div className={classes.root}>
      {
        isLoaded
        ?
          (
            <Grid container item={true}>
              <Grid item xs={12} sm={12}>
                <Typography type='display1' className={classes.heading}>
                  Finally, a music player for all your favorite services in one place
                </Typography>
              </Grid>
            </Grid>
          )
        :
          (
            <Loader size={150} />
          )
      }
    </div>
  );
};

export default withStyles(styles)(Landing);
