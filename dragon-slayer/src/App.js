import React from 'react';
import Game from './game/Game';
import { Router, Route, Link, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import './App.css';
import { createStore } from 'redux';
import player from './player.reducer';
import messages from './reducers/messages.reducer';
import Menu from './interface/Menu.class';
import { combineReducers } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
const Home = props => (
  <div>
    <header>
      <h1 className="animate-fire">
        <Link to="menu">
          Dragon Slayer II : Resurrection
        </Link>
      </h1>
    </header>
    {props.children}
  </div>
);
const app = combineReducers({
  player,
  messages
});
let store = createStore(app, devToolsEnhancer());
const App = () => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Home}>
        <Route path="menu" component={Menu} />
        <Route path="game" component={Game} />
      </Route>
    </Router>
  </Provider>
);

export default App;
