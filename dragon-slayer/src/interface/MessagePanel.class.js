////////////////////// CONSTRUCTEUR ET METHODES DE LA CLASSE //////////////////////
import $ from 'jquery';
import React, { Component } from 'react';

var MessagePanel = function(props) {
  console.log(props);
  const Messages = props.messages.map(message => (
    <li
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

// function render() {
//   //  Panneau de messages
//   <aside
//     id="interface-message-panel"
//     className="interface-box interface-message-panel"
//   >
//     <ul />
//   </aside>;
// }
export default MessagePanel;
