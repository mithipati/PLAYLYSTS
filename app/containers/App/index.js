
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { firebaseConnect, getVal } from 'react-redux-firebase';

import AppWrapper from './style';

import TopNav from '../TopNav';
import SideNav from '../SideNav';
import Player from '../Player';
import Library from '../Library';
import Landing from '../../components/Landing';
import Playlist from '../Playlist';
import NotFoundPage from '../NotFoundPage';

import { makeSelectAuth } from './selectors';
import { withLoader } from './withLoader';

const App = (props) => {

  const { auth } = props;

  return (
    <AppWrapper>
      <TopNav/>
      { withLoader(<TopNav/>, <TopNav/>, <TopNav/>, auth) }
      { withLoader(<SideNav/>, null, null, auth) }
      <Switch>
        <Route
          exact
          path='/'
          render={withLoader.bind(this, <Library/>, <Landing isLoaded={true} />, <Landing isLoaded={false} />, auth)}
        />
        <Route
          path='/list/:name'
          render={withLoader.bind(this, <Playlist/>, <Landing isLoaded={true} />, <Landing isLoaded={false} />, auth)}
        />
        <Route component={NotFoundPage} />
      </Switch>
      { withLoader(<Player/>, null, null, auth) }
    </AppWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  firebaseConnect(),
  withConnect,
)(App);
