
import React from 'react';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase'
import { Field, reduxForm } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import { FormGroup } from 'material-ui/Form';
import { CircularProgress } from 'material-ui/Progress';

import { withStyles } from 'material-ui/styles';
import styles from './style';

class SettingsForm extends React.Component {
  state = {
    isSubmitting: false,
  };

  handleSubmit = values => {
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
            name='email'
            label='Email'
            component={TextField}
            InputLabelProps={{className: classes.label}}
            InputProps={{className: classes.input}}
            className={classes.textArea}
            fullWidth
          />
          <Field
            name='name'
            label='Name'
            component={TextField}
            InputLabelProps={{className: classes.label}}
            InputProps={{className: classes.input}}
            className={classes.textArea}
            fullWidth
          />
        </FormGroup>
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

export default compose(
  withStyles(styles),
  reduxForm({
    form: 'settings'
  }),
  firebaseConnect(),
)(SettingsForm);
