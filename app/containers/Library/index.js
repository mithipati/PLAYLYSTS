
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field, SubmissionError } from 'redux-form/immutable';

import injectReducer from "../../utils/injectReducer";
import reducer from './reducer';
import injectSaga from '../../utils/injectSaga';
import saga from '../../services/parser';

import { addTrack, removeTrack } from './actions';
import { makeSelectTracks } from './selectors';

import Grid from 'material-ui/Grid';
import { FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import { TextField } from 'redux-form-material-ui';

import Table from '../../components/Table';

import { withStyles } from 'material-ui/styles';
import styles from './style';

class Library extends React.Component {
  state = {
    isSubmitting: false,
  };

  handleSubmit = values => {
    const track = values.get('track');

    this.setState({ isSubmitting: true });

    if (!track){
      this.setState({ isSubmitting: false });

      throw new SubmissionError({
        track: 'Required'
      });
    }

    this.props.addTrack(track);
  };

  render() {
    const { handleSubmit, submitting, classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container item={true}>
          <Grid item xs={12} sm={12}>
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <Field
                name='track'
                label='Add Track'
                component={TextField}
                InputProps={{
                  className: classes.input,
                  autoComplete: false,
                  autoCorrect: false,
                  autoCapitalize: false,
                  spellCheck: false,
                }}
                InputLabelProps={{
                  className: classes.label,
                }}
                fullWidth
              />
              { submitting
                ? <CircularProgress size={25} thickness={3.0} color='accent' className={classes.loader} />
                : null
              }
              <FormHelperText className={classes.helperText}>
                Need help?
              </FormHelperText>
            </form>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography type='display2' className={classes.heading}>
              Library
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Table tracks={this.props.tracks} onRemoveTrack={this.props.removeTrack} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    addTrack: (trackURL) => dispatch(addTrack(trackURL)),
    removeTrack: (track) => dispatch(removeTrack(track)),
  };
}

const mapStateToProps = createStructuredSelector({
  tracks: makeSelectTracks(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'library', reducer });
const withSaga = injectSaga({ key: 'library', saga });

export default compose(
  withStyles(styles),
  reduxForm({
    form: 'track'
  }),
  withReducer,
  withSaga,
  withConnect,
)(Library);
