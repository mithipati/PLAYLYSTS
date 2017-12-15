
import React from 'react';
import { compose } from 'redux';

import Dialog, { DialogContent } from 'material-ui/Dialog';

import SettingsForm from './SettingsForm';

import { withStyles } from 'material-ui/styles';
import styles from './style';

const SettingsModal =  (props) => {
  const { open, handleClose, classes } = props;

  return (
    <Dialog
      open={open}
      onRequestClose={handleClose}
    >
      <DialogContent className={classes.modalContent}>
        <SettingsForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default compose(
  withStyles(styles),
)(SettingsModal);
