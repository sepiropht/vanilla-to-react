import React, { Component } from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import './App.css';
import { createStore } from 'redux';
import player from './reducers';
import { startGame } from './action';
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

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudo: '',
      strength: 10,
      agility: 10,
      difficulty: 'normal',
      points: 3,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.pseudo.length > 5) {
      let player = {
        pseudo: this.state.pseudo,
        difficulty: this.state.difficulty,
        agility: this.state.agility,
        strength: this.state.strength,
      };
      console.log(player);
      store.dispatch(startGame(player));
      hashHistory.push('/game');
    }
  }
  increase(rate, e) {
    e.preventDefault();
    if (rate === 'agility')
      this.setState({
        agility: this.state.agility++,
        points: this.state.points--,
      });
    if (rate === 'strength')
      this.setState({
        strength: this.state.strength++,
        points: this.state.points--,
      });
  }
  decrease(rate, e) {
    e.preventDefault();
    if (rate === 'agility')
      this.setState({
        agility: this.state.agility--,
        points: this.state.points++,
      });
    if (rate === 'strength')
      this.setState({
        strength: this.state.strength--,
        points: this.state.points++,
      });
  }
  handleInputChange(event) {
    const target = event.target;
    let value;
    switch (target.type) {
      case 'text':
        value = target.value;
        break;
      case 'radio':
        value = target.value;
        break;
      default:
        value = target;
    }
    const name = target.name;
    this.setState({ [name]: value });
  }
  render() {
    return (
      <form id="interface-menu" className="interface-box interface-menu">
        <fieldset>
          <legend><i className="fa fa-gamepad" /> Menu de démarrage</legend>
          <ul>
            <li>
              <label htmlFor="nickName">Votre pseudo :</label>
              <input
                id="nickName"
                name="pseudo"
                value={this.state.pseudo}
                onChange={this.handleInputChange}
                type="text"
                maxLength="10"
              />
            </li>
            <li>
              <label htmlFor="strength">Force :</label>
              <meter
                id="strength"
                min="1"
                max="15"
                value={this.state.strength}
              />
              <button
                className="meter-control"
                data-action={this.decrease.bind(this, 'strength')}
              >
                <i className="fa fa-minus" />
              </button>
              <button
                className="meter-control"
                onClick={this.increase.bind(this, 'strength')}
              >
                <i className="fa fa-plus" />
              </button>
            </li>
            <li>
              <label htmlFor="agility">Agilité :</label>
              <meter id="agility" min="1" max="15" value="10" />
              <button
                className="meter-control"
                onClick={this.decrease.bind(this, 'agility')}
              >
                <i className="fa fa-minus" />
              </button>
              <button
                className="meter-control"
                data-action={this.increase.bind(this, 'agility')}
              >
                <i className="fa fa-plus" />
              </button>
            </li>
            <li>
              <p>
                Vous pouvez encore répartir
                <strong className="remaining-points">
                  {this.state.points}
                </strong>
                point(s)
              </p>
            </li>
            <li>
              <label htmlFor="difficulty-normal">Niveau de difficulté :</label>
              <input
                id="difficulty-easy"
                type="radio"
                name="difficulty"
                onChange={this.handleInputChange}
                value={this.state.difficulty === 'easy'}
              />
              <label className="radio" htmlFor="difficulty-easy">Baby</label>
              <input
                id="difficulty-normal"
                type="radio"
                name="difficulty"
                value="normal"
                onChange={this.handleInputChange}
                checked={this.state.difficulty === 'normal'}
              />
              <label className="radio" htmlFor="difficulty-normal">
                Slayer
              </label>
              <input
                id="difficulty-hard"
                type="radio"
                name="difficulty"
                onChange={this.handleInputChange}
                value="hard"
                checked={this.state.difficulty === 'hard'}
              />
              <label className="radio" htmlFor="difficulty-hard">
                Nightmare
              </label>
            </li>
            <li>
              <button className="start" onClick={this.handleSubmit}>
                Démarrer :-)
              </button>
            </li>
          </ul>
        </fieldset>
      </form>
    );
  }
}
// Home.context: {
//    router: object.isRequired
//  },
const Game = () => {
  //  console.log(props.params);
  let props = store.getState();
  return <h1>Le jeu commence avec {props.pseudo || 'noName'} !</h1>;
};

let store = createStore(player);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={Home}>
            <Route path="menu" component={Menu} />
            <Route path="game(:player)" component={Game} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default App;
