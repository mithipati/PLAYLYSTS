
import React from 'react';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';

import AuthModal from '../../components/Modal';

import { withStyles } from 'material-ui/styles';
import styles from './style';

class TopNav extends React.Component {
  state = {
    isAuthModalOpen: false,
  };

  handleOpenAuthModal = () => {
    this.setState({ isAuthModalOpen: true });
  };

  handleCloseAuthModal = () => {
    this.setState({ isAuthModalOpen: false });
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
          <Typography onClick={this.handleOpenAuthModal} className={classes.settings}>
            Sign Up • Log In
          </Typography>
          <AuthModal open={this.state.isAuthModalOpen} handleClose={this.handleCloseAuthModal} />
      </AppBar>
    );
  }
}

// export function mapDispatchToProps(dispatch) {
//   return {
//     onSignUp: (credentials) => dispatch(signup(credentials)),
//   };
// }
//
// const mapStateToProps = createStructuredSelector({
//   songs: makeSelectSongs(),
//   songLink: makeSelectSongLink(),
//   isSongLinkError: makeSelectIsSongLinkError(),
// });


export default compose(
  withStyles(styles),
  firebaseConnect(),
)(TopNav);
