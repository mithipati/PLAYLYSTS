
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form/immutable';

import injectReducer from "../../utils/injectReducer";
import reducer from './reducer';
import injectSaga from '../../utils/injectSaga';
import saga from '../../services/parser';

import { addTrack, removeTrack, changeTrackURL } from './actions';
import { makeSelectTracks, makeSelectTrackURL, makeSelectIsTrackURLError } from './selectors';

import Grid from 'material-ui/Grid';
import { FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import { TextField } from 'redux-form-material-ui';

import Table from '../../components/Table';

import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import styles from './style';


class Library extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container item={true}>
          <Grid item xs={12} sm={12}>
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
                {/*onChange={(event) => this.props.onChangeTrackURL(event.target.value)}*/}
                {/*onKeyPress={(event) => { if (event.key === 'Enter') this.props.onAddTrack(event.target.value) }}*/}
              <FormHelperText className={classes.helperText}>
                Need help?
              </FormHelperText>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography type='display2' className={classes.heading}>
              My Songs
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Table tracks={this.props.tracks} onRemoveTrack={this.props.onRemoveTrack} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onAddTrack: (trackURL) => dispatch(addTrack(trackURL)),
    onChangeTrackURL: (trackURL) => dispatch(changeTrackURL(trackURL)),
    onRemoveTrack: (track) => dispatch(removeTrack(track)),
  };
}

const mapStateToProps = createStructuredSelector({
  tracks: makeSelectTracks(),
  trackLink: makeSelectTrackURL(),
  isTrackURLError: makeSelectIsTrackURLError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'library', reducer });
const withSaga = injectSaga({ key: 'library', saga });

export default compose(
  withStyles(styles),
  withReducer,
  withSaga,
  withConnect,
  reduxForm({
    form: 'track'
  }),
)(Library);
