import React from 'react';
import GameMap from './Game.class';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ player: state });

const GameComp = ({ player }) => {
  return (
    <div>
      <GameMap {...player} />
    </div>
  );
};

const Game = connect(mapStateToProps)(GameComp);

export default Game;
