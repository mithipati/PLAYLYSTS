
import React from 'react';

import Grid from 'material-ui/Grid';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';

import Table from '../../components/Table';

import { withStyles } from 'material-ui/styles';
import styles from './style';

// TODO remove let SONGS
const today = new Date();
let SONGS = [];
for (let i = 0; i < 20; i++) {
  SONGS.push({
    id: Math.random(),
    title: 'Too Good At Goodbyes',
    artist: 'Sam Smith',
    source: 'SPOTIFY',
    created_at: `${today.getDate()} / ${today.getMonth() + 1} / ${today.getFullYear()}`,
  });
}

class Library extends React.Component {
  state = {
    songs: SONGS,
    newSong: '',
  };

  handleSongChange(event) {
    this.setState({ newSong: event.target.value });
  }

  handleAddSong(event) {
    if (event.key === 'Enter') {
      let song;

      this.setState(state => {
        song = {
          id: Math.random(),
          title: state.newSong,
          artist: 'Sam Smith',
          source: 'Spotify',
          created_at: 10002392890,
        };
        const songs = [song].concat(state.songs);

        return {
          songs,
          newSong: '',
        };
      });
    }
  }

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
                fullWidth
                className={classes.input}
                autoComplete={false}
                autoCorrect={false}
                autoCapitalize={false}
                spellCheck={false}
                value={this.state.newSong}
                onChange={this.handleSongChange.bind(this)}
                onKeyPress={this.handleAddSong.bind(this)}
              />
              <FormHelperText className={classes.helperText}>Need help?</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography type='display2' className={classes.heading}>
              My Songs
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Table songs={this.state.songs} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Library);
