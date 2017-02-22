////////////////////// CONSTRUCTEUR ET METHODES DE LA CLASSE //////////////////////
import $ from 'jquery';
import React, { Component } from 'react';

const MessagePanel = props => {
  const Messages = props.messages.map((message, index) => (
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
export default MessagePanel;
