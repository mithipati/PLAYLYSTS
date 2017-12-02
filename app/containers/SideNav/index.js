
import React from 'react';
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
    activeLink: ''
  };

  handleLinkClick(activeLink) {
    this.setState({ activeLink })
  }

  renderPlaylists() {
    const { classes } = this.props;

    return PLAYLISTS.map(playlist => {
      return (
        <Link to={`/list/${playlist.name}`} key={playlist.id}>
          <Typography
            type='subheading'
            gutterBottom={true}
            noWrap={true}
            onClick={this.handleLinkClick.bind(this, playlist.id)}
            className={
              classNames(
                classes.subheading,
                classes.link,
                {
                  [classes.active]: this.state.activeLink === playlist.id
                }
              )
            }
          >
            { playlist.name }
          </Typography>
        </Link>
      );
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>

        <Link to='/'>
          <Typography
            type='subheading'
            gutterBottom={true}
            onClick={this.handleLinkClick.bind(this, 'main')}
            className={
              classNames(
                classes.heading,
                classes.link,
                classes.clearfix,
                {
                  [classes.active]: this.state.activeLink === 'main'
                }
                )
            }
          >
            MY SONGS
          </Typography>
        </Link>

        <Typography
          type='subheading'
          gutterBottom={true}
          className={classes.heading}
        >
          PLAYLISTS
        </Typography>
        { this.renderPlaylists() }

        <TextField
          label='+ CREATE PLAYLIST'
          InputLabelProps={{ FormControlClasses: { focused: classes.inputLabelFocused } }}
          InputProps={{ className: classes.input }}
          className={classNames(classes.textField, classes.subheading)}
        />

      </div>
    );
  }
}

export default withStyles(styles)(SideNav);
