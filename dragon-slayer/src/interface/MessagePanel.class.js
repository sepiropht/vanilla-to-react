import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ messages: state.messages });

const Message = ({ messages }) => {
  let mess = messages;
  if (messages.length > 31) mess = messages.filter((m, index) => index > 10);
  const Messages = mess.map((message, index) => (
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
