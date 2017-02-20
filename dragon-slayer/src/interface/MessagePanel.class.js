////////////////////// CONSTRUCTEUR ET METHODES DE LA CLASSE //////////////////////
import $ from 'jquery';

var MessagePanel = function() {
  // Recherche de l'objet jQuery représentant le menu de démarrage du jeu.
  this.$messagePanel = $('#interface-message-panel').children('ul');

  /*
     * Installation du gestionnaire d'évènements du panneau de messages.
     *
     * .bind(this) permet de faire en sorte que la variable JavaScript this
     * fonctionne correctement dans les gestionnaires d'évènements.
     */
  $(document).on('message:add', this.onMessageAdd.bind(this));
};

MessagePanel.prototype.clear = function() {
  // Effacement du contenu du panneau de messages.
  this.$messagePanel.empty();
};

////////////////////// GESTIONNAIRE D'EVENEMENTS DE LA CLASSE //////////////////////
MessagePanel.prototype.onMessageAdd = function(event, message, category) {
  var $messageItem;

  // Est-ce qu'une catégorie a été spécifiée pour le message ?
  if (category == undefined) {
    // Non, utilisation d'une catégorie par défaut.
    category = 'normal';
  }

  // Création avec jQuery d'une balise <li> avec le message spécifié en contenu.
  $messageItem = $('<li>').hide().addClass('message-' + category).html(message);

  // Ajout de la balise <li> à la fin du panneau de messages.
  this.$messagePanel.append($messageItem);

  // Affichage de la balise <li>.
  $messageItem.fadeIn('slow');

  // Est-ce qu'il y a encore de la place pour afficher un futur nouveau message ?
  if (this.$messagePanel.height() > 570) {
    /*
         * Non, suppression du message le plus ancien (celui tout en haut).
         *
         * Cela permet d'éviter d'avoir une barre de scrolling verticale.
         */
    this.$messagePanel.children().first().remove();
  }
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
