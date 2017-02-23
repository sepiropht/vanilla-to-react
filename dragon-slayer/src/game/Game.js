import React from 'react';
import GameMap from './Game.class';
import { connect } from 'react-redux';
import { addMessage } from '../actions/messages';
const mapStateToProps = state => ({ player: state.player });
const mapDispatchToProps = {
  addMessage: addMessage
};

const GameComp = ({ player, addMessage }) => {
  return (
    <div>
      <GameMap player={player} addMessage={addMessage} />
    </div>
  );
};

const Game = connect(mapStateToProps, mapDispatchToProps)(GameComp);

export default Game;
