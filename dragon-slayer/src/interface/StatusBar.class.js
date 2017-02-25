import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ status: state.status });

const Status = ({ status }) => {
  return (
    <table id="interface-status-bar" className="interface-status-bar">
      <thead>
        <tr>
          <th className="disabled">PV Dragon</th>
          <th className="player">PV Joueur</th>
          <th className="disabled">Armure</th>
          <th className="disabled">Sword</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {status ? status.dragon : 'N/A'}
          </td>
          <td>
            {status && status.player ? status.player : 'N/A'}
          </td>
          <td>
            {status && status.armor ? status.armor : 'N/A'}
          </td>
          <td>
            {status && status.sword ? status.sword : 'epée en bois'}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const StatusBar = connect(mapStateToProps)(Status);

export default StatusBar;
