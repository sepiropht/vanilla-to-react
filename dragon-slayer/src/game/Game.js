import React from 'react';

import { connect } from 'react-redux';

const mapStateToProps = state => ({ player: state });

const GameComp = ({ player }) => {
  return (
    <div className="interface-box interface-game">
      <h1>Mon nom est {player.pseudo}</h1>
      <canvas id="interface-map" width="640" height="480" />
      <table id="interface-status-bar" className="interface-status-bar">
        <thead>
          <tr>
            <th className="disabled" />
            <th className="player" />
            <th className="disabled" />
            <th className="disabled" />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td />
            <td />
            <td />
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Game = connect(mapStateToProps)(GameComp);

export default Game;
