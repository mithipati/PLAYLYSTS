
import React from 'react';

import Grid from 'material-ui/Grid';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';

import { withStyles } from 'material-ui/styles';
import styles from './style';

class Library extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container item={true}>
          <Grid item xs={2} sm={2}>
            <Typography type='display2' className={classes.heading}>
              Add Song
            </Typography>
          </Grid>
          <Grid item xs={10} sm={10}>
            <FormControl className={classes.formControl}>
              <Input
                placeholder='Enter a valid YouTube, SoundCloud, or Spotify song link'
                className={classes.input}
              />
              <FormHelperText className={classes.helperText}>Need help?</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography type='display2' className={classes.heading}>
              My Songs
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Library);
