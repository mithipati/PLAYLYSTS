
import React from 'react';
import { compose } from 'redux';

import Tabs, { Tab } from 'material-ui/Tabs';
import Dialog, { DialogContent } from 'material-ui/Dialog';

import AuthForm from './AuthForm';

import { withStyles } from 'material-ui/styles';
import styles from './style';

class AuthModal extends React.Component {
  state = {
    tabNumber: 0,
  };

  handleChange = (event, tabNumber) => {
    this.setState({ tabNumber });
  };

  render() {
    const { open, handleClose, classes } = this.props;

    return (
      <Dialog
        open={open}
        onRequestClose={handleClose}
      >
        <Tabs
          value={this.state.tabNumber}
          onChange={this.handleChange}
          className={classes.modalTab}
          indicatorColor='accent'
          fullWidth
        >
          <Tab label='Sign Up' className={classes.modalTab} />
          <Tab label='Log In' className={classes.modalTab} />
        </Tabs>
        <DialogContent className={classes.modalContent}>
          {this.state.tabNumber === 0 ? <AuthForm isNewUser={true} handleClose={handleClose} /> : null}
          {this.state.tabNumber === 1 ? <AuthForm isNewUser={false} handleClose={handleClose} /> : null}
        </DialogContent>
      </Dialog>
    );
  }
}

export default compose(
  withStyles(styles),
)(AuthModal);
