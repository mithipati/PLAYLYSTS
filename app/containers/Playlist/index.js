
import React from 'react';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import { withStyles } from 'material-ui/styles';
import styles from './style';

class Playlist extends React.Component {
  render() {
    const { classes, match } = this.props;
    const playlistName = match.params.name;

    return (
      <div className={classes.root}>
        <Grid container item={true}>
          <Grid item xs={12} sm={12}>
            <Typography type='display2' className={classes.heading}>
              { playlistName }
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Playlist);
