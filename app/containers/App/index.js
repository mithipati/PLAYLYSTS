
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppWrapper from './style';

import TopNav from '../../containers/TopNav';
import SideNav from '../../containers/SideNav';
import Player from '../../containers/Player';
import Library from '../Library';
import Playlist from '../Playlist';
import NotFoundPage from '../../containers/NotFoundPage/Loadable';

export default function App() {
  return (
    <AppWrapper>
      <TopNav/>
      <SideNav/>
      <Switch>
        <Route exact path="/" component={Library} />
        <Route path="/list/:name" component={Playlist} />
        <Route component={NotFoundPage} />
      </Switch>
      <Player/>
    </AppWrapper>
  );
}
