
import React from 'react';
import { compose } from 'redux';

import Dialog, { DialogContent } from 'material-ui/Dialog';
import Tabs, { Tab } from 'material-ui/Tabs';

import AuthForm from './AuthForm';

import { withStyles } from 'material-ui/styles';
import styles from './style';

class AuthModal extends React.Component {
  state = {
    tabNumber: 0,
    isResetPassword: false,
  };

  handleChange = (event, tabNumber) => {
    let isResetPassword = this.state.isResetPassword;

    if (tabNumber !== 2) {
      isResetPassword = false;
    }
    this.setState({ tabNumber, isResetPassword });
  };

  handleDisplayResetPassword = () => {
    this.setState({ isResetPassword: true, tabNumber: 2 });
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
          { this.state.isResetPassword ? <Tab label='Reset' className={classes.modalTab} /> : null }
        </Tabs>
        <DialogContent className={classes.modalContent}>
          {
            this.state.tabNumber === 0
              ? <AuthForm isNewUser={true} handleClose={handleClose} />
              : null
          }
          {
            this.state.tabNumber === 1
              ? <AuthForm handleClose={handleClose} handleDisplayResetPassword={this.handleDisplayResetPassword} />
              : null
          }
          {
            this.state.tabNumber === 2
              ? <AuthForm isResetPassword={true} handleClose={handleClose} />
              : null
          }
        </DialogContent>
      </Dialog>
    );
  }
}

export default compose(
  withStyles(styles),
)(AuthModal);
