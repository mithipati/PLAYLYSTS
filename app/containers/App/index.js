
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppWrapper from './style';

import TopNav from '../../components/TopNav';
import SideNav from '../../components/SideNav';
import Player from '../../containers/Player';
import HomePage from '../../containers/HomePage';
import NotFoundPage from '../../containers/NotFoundPage/Loadable';

export default function App() {
  return (
    <AppWrapper>
      <TopNav />
      <SideNav />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Player />
    </AppWrapper>
  );
}
