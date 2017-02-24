import React from 'react';
import GameMap from './Game.class';
import { connect } from 'react-redux';
import { addMessage } from '../actions/messages';
import { updateStatus } from '../actions/messages';
const mapStateToProps = state => ({ player: state.player });
const mapDispatchToProps = {
  addMessage: addMessage,
  updateStatus: updateStatus
};

const GameComp = ({ player, addMessage, updateStatus }) => {
  console.log(player, addMessage, updateStatus);
  return (
    <div>
      <GameMap
        player={player}
        addMessage={addMessage}
        updateStatus={updateStatus}
      />
    </div>
  );
};

const Game = connect(mapStateToProps, mapDispatchToProps)(GameComp);

export default Game;
