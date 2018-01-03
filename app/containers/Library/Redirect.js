
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import queryString from 'query-string';

import { makeSelectLocation } from '../App/selectors';
import { completeOAuth } from '../App/actions';
import oauth from '../../services/oauth';
import injectSaga from '../../utils/injectSaga';

class Redirect extends React.Component {

  componentDidMount() {
    const params = queryString.parse(this.props.location.get('search'));
    const code = params.code ? params.code : null;

    if (code !== null) {
      this.props.completeOAuth('spotify', code);
    }
  }

  render() {
    return null;
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    completeOAuth: (source, code) => dispatch(completeOAuth(source, code)),
  };
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withOAuthSaga = injectSaga({ key: 'oauth', saga: oauth });

export default compose(
  withOAuthSaga,
  withConnect,
)(Redirect);
