
import React from 'react';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase'
import { SubmissionError } from 'redux-form/immutable';
import { Field, reduxForm } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import { FormGroup } from 'material-ui/Form';
import { CircularProgress } from 'material-ui/Progress';

import { withStyles } from 'material-ui/styles';
import styles from './style';
import classNames from 'classnames';

class AuthForm extends React.Component {
  state = {
    isEmailSubmitting: false,
    isFacebookSubmitting: false,
  };

  handleEmailSubmit = values => {
    this.setState({ isEmailSubmitting: true });

    const { handleClose } = this.props;

    if (this.props.isNewUser) {

      // validate password confirmation
      if (values.get('password').length < 6) {
        this.setState({ isEmailSubmitting: false });
        throw new SubmissionError({
          password: 'Password should be at least 6 characters'
        });
      }
      if (values.get('password') !== values.get('password_confirmation')) {
        this.setState({ isEmailSubmitting: false });
        throw new SubmissionError({
          password_confirmation: 'Passwords must match'
        });
      }

      return this.props.firebase.createUser({
        email: values.get('email'),
        password: values.get('password')
      }).then(
        () => handleClose(),
        error => {
          this.setState({ isEmailSubmitting: false });
          throw new SubmissionError({
            email: error.message
          });
        });

    } else {

      return this.props.firebase.login({
        email: values.get('email'),
        password: values.get('password')
      }).then(
        () => handleClose(),
        error => {
          this.setState({ isEmailSubmitting: false });
          throw new SubmissionError({
            email: error.message
          });
        });

    }
  };

  handleFacebookSubmit = (event) => {
    event.preventDefault();

    this.setState({ isFacebookSubmitting: true });

    this.props.firebase.login({
      provider: 'facebook',
      type: 'redirect'
    });
  };

  render() {
    const { isNewUser, handleSubmit, submitting, classes } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleEmailSubmit)} className={classes.form}>
        <FormGroup className={classes.formGroup}>
          <Field
            name='email'
            label='Email'
            component={TextField}
            InputLabelProps={{className: classes.label}}
            InputProps={{className: classes.input}}
            className={classNames(classes.textArea, { [classes.loginTextArea]: !isNewUser })}
            fullWidth
          />
          <Field
            name='password'
            label='Password'
            component={TextField}
            InputLabelProps={{className: classes.label}}
            InputProps={{className: classes.input}}
            className={classNames(classes.textArea, { [classes.loginTextArea]: !isNewUser })}
            fullWidth
            type='password'
          />
          { isNewUser
            ? <Field
              name='password_confirmation'
              label='Confirm Password'
              component={TextField}
              InputLabelProps={{className: classes.label}}
              InputProps={{className: classes.input}}
              className={classes.textArea}
              fullWidth
              type='password'
            />
            : null }
        </FormGroup>
        <button type='submit' disabled={submitting} className='action-button'>
          { !this.state.isEmailSubmitting
            ? <span>SUBMIT</span>
            : <CircularProgress size={25} thickness={3.0} color='accent'/>
          }
        </button>
        <div className={classes.clearfix}>- OR -</div>
        <button onClick={this.handleFacebookSubmit} disabled={submitting} className='action-button'>
          { !this.state.isFacebookSubmitting
            ? <span><img src='facebook-icon.png' className='social-icon' />Continue with Facebook</span>
            : <CircularProgress size={25} thickness={3.0} color='accent' />
          }
        </button>
      </form>
    );
  }
}

export default compose(
  withStyles(styles),
  reduxForm({
    form: 'auth'
  }),
  firebaseConnect(),
)(AuthForm);
