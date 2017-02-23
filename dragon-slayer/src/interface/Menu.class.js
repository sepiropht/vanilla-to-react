import { hashHistory } from 'react-router';
import React from 'react';
import {
  startGame,
  pseudoChange,
  increase,
  decrease,
  radioChange
} from '../action';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  startGame: startGame,
  pseudoChange: pseudoChange,
  decrease: decrease,
  increase: increase,
  radioChange: radioChange
};

const mapStateToProps = state => ({ player: state.player });

const MenuComp = (
  { player, startGame, pseudoChange, decrease, increase, radioChange }
) => {
  const handleInputChange = event => {
    const target = event.target;
    switch (target.type) {
      case 'text':
        pseudoChange(target.value);
        break;
      default:
        radioChange(target.value);
    }
  };
  const goToGame = () => {
    if (player && player.pseudo.length === 0) return;
    startGame(player);
    hashHistory.push('/game');
  };
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
              value={player.pseudo}
              onChange={e => handleInputChange(e)}
              type="text"
              maxLength="10"
            />
          </li>
          <li>
            <label htmlFor="strength">Force :</label>
            <meter id="strength" min="1" max="15" value={player.strength} />
            <button
              className="meter-control"
              onClick={e => {
                e.preventDefault();
                decrease('strength');
              }}
            >
              <i className="fa fa-minus" />
            </button>
            <button
              className="meter-control"
              onClick={e => {
                e.preventDefault();
                increase('strength');
              }}
            >
              <i className="fa fa-plus" />
            </button>
          </li>
          <li>
            <label htmlFor="agility">Agilité :</label>
            <meter id="agility" min="1" max="15" value="10" />
            <button
              className="meter-control"
              onClick={e => {
                e.preventDefault();
                decrease('agility');
              }}
            >
              <i className="fa fa-minus" />
            </button>
            <button
              className="meter-control"
              onClick={e => {
                e.preventDefault();
                increase('agility');
              }}
            >
              <i className="fa fa-plus" />
            </button>
          </li>
          <li>
            <p>
              Vous pouvez encore répartir
              <strong className="remaining-points">
                {player.points}
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
              value="easy"
              onChange={handleInputChange}
              checked={player.difficulty === 'easy'}
            />
            <label className="radio" htmlFor="difficulty-easy">Baby</label>
            <input
              id="difficulty-normal"
              type="radio"
              name="difficulty"
              value="normal"
              onChange={handleInputChange}
              checked={player.difficulty === 'normal'}
            />
            <label className="radio" htmlFor="difficulty-normal">
              Slayer
            </label>
            <input
              id="difficulty-hard"
              type="radio"
              name="difficulty"
              onChange={handleInputChange}
              value="hard"
              checked={player.difficulty === 'hard'}
            />
            <label className="radio" htmlFor="difficulty-hard">
              Nightmare
            </label>
          </li>
          <li>
            <button className="start" onClick={goToGame}>
              Démarrer :-)
            </button>
          </li>
        </ul>
      </fieldset>
    </form>
  );
};

const Menu = connect(mapStateToProps, mapDispatchToProps)(MenuComp);

export default Menu;
