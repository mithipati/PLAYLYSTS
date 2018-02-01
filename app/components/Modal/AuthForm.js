
import React from 'react';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase'
import { Field, reduxForm } from 'redux-form/immutable';
import { SubmissionError } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import { FormGroup } from 'material-ui/Form';
import { CircularProgress } from 'material-ui/Progress';
import { FormHelperText } from 'material-ui/Form';

import { withStyles } from 'material-ui/styles';
import styles from './style';
import classNames from 'classnames';

class AuthForm extends React.Component {
  state = {
    isFacebookSubmitting: false,
  };

  handleSubmit = values => {

    const { isNewUser, isResetPassword, handleClose, firebase } = this.props;
    const email = values.get('email');

    // validate required email
    if (!email){
      throw new SubmissionError({
        email: 'Required'
      });
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      throw new SubmissionError({
        email: 'Invalid email'
      });
    }

    // validate required password if not resetting it
    if (!isResetPassword) {
      if (!values.get('password')){
        throw new SubmissionError({
          password: 'Required'
        });
      }
    }

      // validate password length and confirmation match on Sign Up
    if (isNewUser) {

      const password = values.get('password');
      if (password && password.length < 6) {
        throw new SubmissionError({
          password: 'Password should be at least 6 characters'
        });
      }
      if (password !== values.get('password_confirmation')) {
        throw new SubmissionError({
          password_confirmation: 'Passwords must match'
        });
      }

      return firebase.createUser({
        email: values.get('email'),
        password: values.get('password')
      }).then(() => handleClose())
        .catch(error => {
          throw new SubmissionError({
            email: error.message
          });
        });

    } else if (isResetPassword) {

      return firebase.resetPassword(email)
        .then(() => handleClose())
        .catch(error => {
          throw new SubmissionError({
            email: error.message
          });
        });

    } else {

      return firebase.login({
        email: values.get('email'),
        password: values.get('password')
      }).then(() => handleClose())
        .catch(error => {
          throw new SubmissionError({
            email: error.message
          });
        });

    }
  };

  handleFacebookSubmit = () => {
    this.setState({ isFacebookSubmitting: true });

    const { handleClose } = this.props;

    return this.props.firebase.login({
      provider: 'facebook',
      type: 'popup'
    }).then(() => handleClose())
      .catch(() => {
      this.setState({ isFacebookSubmitting: false });

      throw new SubmissionError({
        facebook: `An account already exists with the email associated with this Facebook profile.
          Please log in using that email and password, not via Facebook.`
      });
    });
  };

  render() {
    const { isNewUser, isResetPassword, handleSubmit, handleDisplayResetPassword, submitting, classes } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)} className={classes.form}>
        <FormGroup className={classNames(classes.formGroup, { [classes.formGroupReset]: isResetPassword })}>
          <Field
            name='email'
            label='Email'
            component={TextField}
            InputLabelProps={{className: classes.label}}
            InputProps={{className: classes.input}}
            className={classNames(classes.textArea, { [classes.loginTextArea]: !isNewUser })}
            fullWidth
          />
          {
            isResetPassword
            ? null
            : <Field
                name='password'
                label='Password'
                component={TextField}
                InputLabelProps={{className: classes.label}}
                InputProps={{className: classes.input}}
                className={classNames(classes.textArea, { [classes.loginTextArea]: !isNewUser })}
                fullWidth
                type='password'
                />
          }
          {
            isNewUser
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
            : !isResetPassword
              ? <FormHelperText onClick={handleSubmit(handleDisplayResetPassword)} className={classes.helperText}>
                  Reset Password
                </FormHelperText>
              : null
          }
        </FormGroup>
        {
          isResetPassword
          ? <button type='submit' disabled={submitting} className='action-button'>
              { !submitting
                ? <span>RESET</span>
                : <CircularProgress size={25} thickness={3.0} color='secondary'/>
              }
            </button>
          : <div>
              <button type='submit' disabled={submitting} className='action-button'>
                { !submitting
                  ? <span>SUBMIT</span>
                  : <CircularProgress size={25} thickness={3.0} color='secondary'/>
                }
              </button>
              <div className={classes.clearfix}>- OR -</div>
              <button onClick={handleSubmit(this.handleFacebookSubmit)} disabled={submitting} className='action-button'>
                { !this.state.isFacebookSubmitting
                  ? <span><img src='facebook-icon.png' className='social-icon' />Continue with Facebook</span>
                  : <CircularProgress size={25} thickness={3.0} color='secondary' />
                }
              </button>
              <Field
                name='facebook'
                component={TextField}
                type='hidden'
                InputProps={{className: classes.hiddenInput}}
              />
            </div>
        }
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
