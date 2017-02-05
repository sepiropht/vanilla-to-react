import React, { Component } from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import './App.css';

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

const Menu = () => (
  <form id="interface-menu" className="interface-box interface-menu">
    <fieldset>
      <legend><i className="fa fa-gamepad" /> Menu de démarrage</legend>
      <ul>
        <li>
          <label htmlFor="nickName">Votre pseudo :</label>
          <input id="nickName" name="nickName" type="text" maxLength="10" />
        </li>
      </ul>
    </fieldset>
  </form>
);

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Home}>
          <Route path="menu" component={Menu} />
        </Route>
      </Router>
    );
  }
}

export default App;
