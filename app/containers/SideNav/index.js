
import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

import { withStyles } from 'material-ui/styles';
import styles from './style';

// TODO remove const PLAYLISTS
const PLAYLISTS = [
  {
    id: 1,
    name: 'Hot Rhytmic',
    songIDs: [1,2,3,4]
  },
  {
    id: 2,
    name: 'Chill Hits',
    songIDs: [1,2,3,4]
  },
  {
    id: 3,
    name: 'Brain Food',
    songIDs: [1,2,3,4]
  },
  {
    id: 4,
    name: 'Peaceful Piano',
    songIDs: [1,2,3,4]
  },
  {
    id: 5,
    name: 'Stranger Things',
    songIDs: [1,2,3,4]
  },
];

class SideNav extends React.Component {
  state = {
    playlists: PLAYLISTS,
    newPlaylist: '',
    activeLink: this.props.location.pathname || '/',
  };

  // UI methods
  handleLinkClick(activeLink) {
    this.setState({ activeLink })
  }

  handlePlaylistChange = (event) => {
    this.setState({ newPlaylist: event.target.value });
  };

  handleCreatePlaylist = (event) => {
    if (event.key === 'Enter') {
      const { history } = this.props;
      let playlist;

      this.setState(state => {
        playlist = {
          id: Math.random(),
          name: state.newPlaylist,
          songIDs: []
        };
        const playlists = state.playlists.concat([ playlist ]);

        return {
          playlists,
          newPlaylist: '',
          activeLink: `/list/${playlist}`
        };
      }, () => {
        history.push(`/list/${playlist}`);
      });
    }
  };

  // render methods
  renderHomeButton() {
    const { classes } = this.props;

    return (
      <Link to='/' onClick={this.handleLinkClick.bind(this, '/')}>
        <Typography
          type='subheading'
          gutterBottom={true}
          className={
            classNames(
              classes.heading,
              classes.link,
              classes.clearfix,
              {
                [classes.active]: this.state.activeLink === '/'
              }
            )
          }
        >
          MY SONGS
        </Typography>
      </Link>
    );
  }

  renderPlaylists() {
    const { classes } = this.props;

    const playlists = this.state.playlists.map(playlist => {
      return (
        <Link to={`/list/${playlist.name}`} key={playlist.id} onClick={this.handleLinkClick.bind(this, `/list/${playlist.name}`)}>
          <Typography
            type='subheading'
            gutterBottom={true}
            noWrap={true}
            className={
              classNames(
                classes.subheading,
                classes.link,
                {
                  [classes.active]: this.state.activeLink === `/list/${playlist.name}`
                }
              )
            }
          >
            { playlist.name }
          </Typography>
        </Link>
      );
    });

    return (
      [
        <Typography
          key='main'
          type='subheading'
          gutterBottom={true}
          className={classes.heading}
        >
          PLAYLISTS
        </Typography>
      ].concat(playlists)
    );
  }

  renderAddPlaylistButton() {
    const { classes } = this.props;

    return (
      <TextField
        label='+ CREATE PLAYLIST'
        InputLabelProps={{ FormControlClasses: { focused: classes.inputLabelFocused } }}
        InputProps={{
          className: classes.input,
          inputProps: {
            autoComplete: false,
            autoCorrect: false,
            autoCapitalize: false,
            spellCheck: false,
          }
        }}
        className={classNames(classes.textField, classes.subheading)}
        ref={ input => { this.createPlaylistInput = input } }
        value={this.state.newPlaylist}
        onChange={this.handlePlaylistChange}
        onKeyPress={this.handleCreatePlaylist}
      />
    );
  }

  // main
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        { this.renderHomeButton() }
        { this.renderPlaylists() }
        { this.renderAddPlaylistButton() }
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(SideNav));
