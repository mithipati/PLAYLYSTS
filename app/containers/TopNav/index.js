
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, getVal } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';

import Modal from '../../components/Modal';

import { withStyles } from 'material-ui/styles';
import styles from './style';

class TopNav extends React.Component {
  state = {
    isAuthModalOpen: false,
    isSettingsModalOpen: false,
  };

  handleOpenAuthModal = () => {
    this.setState({ isAuthModalOpen: true });
  };

  handleCloseAuthModal = () => {
    this.setState({ isAuthModalOpen: false });
  };

  handleOpenSettingsModal = () => {
    this.setState({ isSettingsModalOpen: true });
  };

  handleCloseSettingsModal = () => {
    this.setState({ isSettingsModalOpen: false });
  };

  renderAuthOrSettingsButton = () => {
    const { auth, classes } = this.props;

    if (isLoaded(auth)) {
      if (isEmpty(auth)) {
       return (
         <div>
           <Typography onClick={this.handleOpenAuthModal} className={classes.settings}>
             Sign Up • Log In
           </Typography>
           <Modal type='auth' open={this.state.isAuthModalOpen} handleClose={this.handleCloseAuthModal} />
         </div>
       );
      } else {
        return (
          <div>
            <Typography onClick={this.handleOpenSettingsModal} className={classes.settings}>
              Settings
            </Typography>
            <Modal type='settings' open={this.state.isSettingsModalOpen} handleClose={this.handleCloseSettingsModal} />
          </div>
        );
      }
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <AppBar className={classes.root}>
          <Link to='/'>
            <Typography className={classes.logo}>
                PLAYLYST
            </Typography>
          </Link>
          { this.renderAuthOrSettingsButton() }
      </AppBar>
    );
  }
}

export default compose(
  withStyles(styles),
  firebaseConnect(),
  connect((state) => ({ auth: getVal(state.get('firebase'), 'auth') })),
)(TopNav);
