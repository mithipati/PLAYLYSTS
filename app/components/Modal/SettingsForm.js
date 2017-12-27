
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase'
import { createStructuredSelector } from 'reselect';

import { Field, reduxForm } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import { FormGroup } from 'material-ui/Form';
import { CircularProgress } from 'material-ui/Progress';

import { spotifyOAuth } from '../../containers/App/actions';
import { makeSelectAuth } from '../../containers/App/selectors';
import injectSaga from '../../utils/injectSaga';
import saga from '../../services/oauth';

import { withStyles } from 'material-ui/styles';
import styles from './style';

class SettingsForm extends React.Component {
  state = {
    isSubmitting: false,
    isSpotifySubmitting: false,
  };

  handleSubmit = values => {
  };

  handleSpotifySubmit = () => {
    this.props.spotifyOAuth();
  };

  handleLogout = event => {
    event.preventDefault();

    const { handleClose, firebase } = this.props;

    firebase.logout().then(() => handleClose());
  };

  render() {
    const { handleSubmit, submitting, classes } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)} className={classes.form}>
        <FormGroup className={classes.formGroup}>
          <Field
            name='name'
            label='Name'
            component={TextField}
            InputLabelProps={{className: classes.label}}
            InputProps={{className: classes.input}}
            className={classes.textArea}
            fullWidth
          />
          <Field
            name='email'
            label='Email'
            component={TextField}
            InputLabelProps={{className: classes.label}}
            InputProps={{className: classes.input}}
            className={classes.textArea}
            fullWidth
          />
        </FormGroup>
        <button onClick={handleSubmit(this.handleSpotifySubmit)} disabled={submitting} className='action-button'>
          { !this.state.isSpotifySubmitting
            ? <span><img src='facebook-icon.png' className='social-icon' />Connect with Spotify</span>
            : <CircularProgress size={25} thickness={3.0} color='accent' />
          }
        </button>
        <Field
          name='spotify_oauth'
          component={TextField}
          type='hidden'
          InputProps={{className: classes.hiddenInput}}
        />
        <button type='submit' disabled={submitting} className='action-button'>
          {
            !this.state.isSubmitting
            ? <span>SAVE</span>
            : <CircularProgress size={25} thickness={3.0} color='accent'/>
          }
        </button>
        <button onClick={this.handleLogout} disabled={submitting} className='action-button error'>
          LOG OUT
        </button>
      </form>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    spotifyOAuth: () => dispatch(spotifyOAuth()),
  };
}

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'services', saga });

export default compose(
  withStyles(styles),
  reduxForm({
    form: 'settings'
  }),
  firebaseConnect(),
  withSaga,
  withConnect,
)(SettingsForm);
