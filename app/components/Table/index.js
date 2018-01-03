
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import {withStyles} from 'material-ui/styles';
import styles from './style';
import './native-styles.scss';
import Ionicon from 'react-ionicons'

class TableUI extends React.Component {
  renderTableRows() {
    const { tracks, classes } = this.props;

    return tracks.map(track => {
      return (
        <TableRow hover key={track.get('id')} className={classNames(classes.tableRow, 'tableRow')}>
          <TableCell padding='checkbox' className={classNames(classes.tableCell, classes.button)}>
            <Ionicon className='button iconButton' icon='ios-play-outline' fontSize='30px' color='#40C4FF'/>
          </TableCell>
          <TableCell padding='default' className={classes.tableCell}>{track.get('title')}</TableCell>
          <TableCell padding='checkbox' className={classes.tableCell}>{track.get('artist')}</TableCell>
          <TableCell padding='checkbox' className={classes.tableCell}>{track.get('source')}</TableCell>
          <TableCell padding='checkbox' className={classes.tableCell}>{track.get('created_at')}</TableCell>
          <TableCell padding='checkbox' className={classNames(classes.tableCell, classes.button)}>
            <Ionicon
              className='button iconButton'
              icon='ios-more'
              fontSize='30px'
              color='#40C4FF'
              onClick={this.props.onRemoveTrack.bind(this, track)}
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
        <Paper className={classes.root}>
          <Typography type='headline' className={classes.placeholder}>
            No tracks added yet
          </Typography>
        </Paper>
      );
    }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell padding='none' className={classes.tableHeader}></TableCell>
              <TableCell padding='default' className={classes.tableHeader}>TITLE</TableCell>
              <TableCell padding='checkbox' className={classes.tableHeader}>ARTIST</TableCell>
              <TableCell padding='checkbox' className={classes.tableHeader}>SOURCE</TableCell>
              <TableCell padding='checkbox' className={classes.tableHeader}>DATE ADDED</TableCell>
              <TableCell padding='none' className={classes.tableHeader}></TableCell>
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

TableUI.propTypes = {
  // tracks: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableUI);
