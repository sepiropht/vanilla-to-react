import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ messages: state.messages });

const Message = ({ messages }) => {
  const Messages = messages.map((message, index) => (
    <li
      key={index}
      className={
        message.categorie ? 'message-' + message.categorie : 'message-normal'
      }
    >
      {message.text}
    </li>
  ));
  return (
    <aside
      id="interface-message-panel"
      className="interface-box interface-message-panel"
    >
      <ul> {Messages} </ul>
    </aside>
  );
};

const MessagePanel = connect(mapStateToProps)(Message);
export default MessagePanel;
