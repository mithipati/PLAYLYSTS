
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import styles from './style';
import './native-styles.scss';
import Ionicon from 'react-ionicons'

class TracksTable extends React.Component {

  renderTableRows() {
    const {
      tracks,
      handlePlayTrack,
      handlePauseTrack,
      handleLoadTrack,
      handleRemoveTrack,
      isCurrentlyPlaying,
      currentTrack,
      classes
    } = this.props;

    return tracks.map((track, trackIndex) => {
      const isCurrentTrack = currentTrack && currentTrack.get('id') === track.get('id');

      return (
        <TableRow
          key={ track.get('id') }
          className={ classNames(classes.tableRow, 'tableRow', { [classes.active]: isCurrentTrack }) }
        >
          <TableCell padding='checkbox' className={ classNames(classes.tableCell, classes.buttonCell) }>
            <Ionicon
              onClick={
                isCurrentTrack
                  ? isCurrentlyPlaying ? handlePauseTrack : handlePlayTrack
                  : handleLoadTrack.bind(null, trackIndex)
              }
              icon={
                isCurrentTrack
                  ? isCurrentlyPlaying ? 'ios-pause-outline' : 'ios-play-outline'
                  : 'ios-play-outline'
              }
              className={ classNames('iconButton', 'button', { active: isCurrentTrack }) }
              fontSize='30px'
            />
          </TableCell>
          <TableCell padding='default' className={ classes.tableCell }>
            { track.get('title') }
          </TableCell>
          <TableCell padding='checkbox' className={ classes.tableCell }>
            { track.get('artist') }
          </TableCell>
          <TableCell padding='checkbox' className={ classes.tableCell }>
            { track.getIn(['source', 'name']) }
          </TableCell>
          <TableCell padding='checkbox' className={ classes.tableCell }>
            { track.get('created_at') }
          </TableCell>
          <TableCell padding='checkbox' className={ classNames(classes.tableCell, classes.buttonCell) }>
            <Ionicon
              className={ classNames('iconButton', 'button', { active: isCurrentTrack }) }
              icon='ios-more'
              fontSize='30px'
              onClick={ handleRemoveTrack.bind(null, track) }
            />
          </TableCell>
        </TableRow>
      );
    });
  }

  render() {
    const { tracks, classes } = this.props;

    if (!tracks.size) {
      return (
        <Paper className={ classes.root }>
          <Typography type='headline' className={ classes.placeholder }>
            No tracks added yet
          </Typography>
        </Paper>
      );
    }

    return (
      <Paper className={ classes.root }>
        <Table className={ classes.table }>
          <TableHead className={ classes.tableHeader }>
            <TableRow>
              <TableCell padding='none' className={ classes.tableHeader } />
              <TableCell padding='default' className={ classes.tableHeader }>TITLE</TableCell>
              <TableCell padding='checkbox' className={ classes.tableHeader }>ARTIST</TableCell>
              <TableCell padding='checkbox' className={ classes.tableHeader }>SOURCE</TableCell>
              <TableCell padding='checkbox' className={ classes.tableHeader }>DATE ADDED</TableCell>
              <TableCell padding='none' className={ classes.tableHeader } />
            </TableRow>
          </TableHead>
          <TableBody>
            { this.renderTableRows() }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(TracksTable);
