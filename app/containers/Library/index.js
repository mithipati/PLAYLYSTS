
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from "../../utils/injectReducer";
import reducer from './reducer';
import injectSaga from '../../utils/injectSaga';
import saga from '../../services/urlService';

import { addSong, removeSong, changeSongLink } from './actions';
import { makeSelectSongs, makeSelectSongLink, makeSelectIsSongLinkError } from './selectors';

import Grid from 'material-ui/Grid';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';

import Table from '../../components/Table';

import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import styles from './style';

class Library extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container item={true}>
          <Grid className={classes.addSongContainer} item xs={12} sm={12}>
            <Typography type='display2' className={classes.heading}>
              Add Song
            </Typography>
            <FormControl className={classes.formControl}>
              <Input
                placeholder='Enter a valid YouTube, SoundCloud, or Spotify song link'
                fullWidth
                className={classNames(classes.input, { [classes.error]: this.props.isSongLinkError })}
                autoComplete={false}
                autoCorrect={false}
                autoCapitalize={false}
                spellCheck={false}
                error
                value={this.props.songLink}
                onChange={(event) => this.props.onChangeSongLink(event.target.value)}
                onKeyPress={(event) => { if (event.key === 'Enter') this.props.onAddSong(event.target.value) }}
              />
              <FormHelperText
                className={classNames(classes.errorMessage, { [classes.error]: this.props.isSongLinkError })}
              >
                Invalid link. Please enter a new link and try again.
              </FormHelperText>
              <FormHelperText className={classes.helperText}>
                Need help?
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography type='display2' className={classes.heading}>
              My Songs
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Table songs={this.props.songs} onRemoveSong={this.props.onRemoveSong} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onAddSong: (url) => dispatch(addSong(url)),
    onChangeSongLink: (url) => dispatch(changeSongLink(url)),
    onRemoveSong: (song) => dispatch(removeSong(song)),
  };
}

const mapStateToProps = createStructuredSelector({
  songs: makeSelectSongs(),
  songLink: makeSelectSongLink(),
  isSongLinkError: makeSelectIsSongLinkError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'library', reducer });
const withSaga = injectSaga({ key: 'library', saga });

export default compose(
  withStyles(styles),
  withReducer,
  withSaga,
  withConnect,
)(Library);
