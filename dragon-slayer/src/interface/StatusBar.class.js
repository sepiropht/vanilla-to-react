////////////////////// CONSTRUCTEUR ET METHODES DE LA CLASSE //////////////////////

const StatusBar = function() {
  // Recherche de l'objet jQuery représentant la barre de statut du jeu.
  this.$statusBar = $('#interface-status-bar');
};

StatusBar.prototype.refresh = function(dragon, player) {
  var dragonHp;
  var playerArmor;
  var playerSword;

  // Gestion des points de vie du dragon.
  dragonHp = 'N/A';
  if (dragon != null) {
    // Il y a bien un dragon, récupération de ses points de vie.
    dragonHp = dragon.hp;

    this.$statusBar
      .find('th:first-child')
      .addClass('dragon')
      .removeClass('disabled');
  } else {
    this.$statusBar
      .find('th:first-child')
      .addClass('disabled')
      .removeClass('dragon');
  }

  // Gestion de l'armure du joueur.
  playerArmor = 'Aucune';
  if (player.armor != null) {
    // Le joueur possède une armure, récupération de son nom.
    playerArmor = player.armor;

    this.$statusBar
      .find('th:nth-child(3)')
      .addClass('player')
      .removeClass('disabled');
  }

  // Gestion de l'épée du joueur.
  playerSword = 'Aucune';
  if (player.sword != null) {
    // Le joueur possède une épée, récupération de son nom.
    playerSword = player.sword;

    this.$statusBar
      .find('th:nth-child(4)')
      .addClass('player')
      .removeClass('disabled');
  }

  // Voir la méthode setup() ci-dessous pour l'ordre des colonnes du tableau.
  this.$statusBar.find('td:first-child').text(dragonHp);
  this.$statusBar.find('td:nth-child(2)').text(player.hp);
  this.$statusBar.find('td:nth-child(3)').text(playerArmor);
  this.$statusBar.find('td:nth-child(4)').text(playerSword);
};

StatusBar.prototype.setup = function() {
  this.$statusBar.find('th:first-child').text('PV Dragon');
  this.$statusBar.find('th:nth-child(2)').text('PV Joueur');
  this.$statusBar.find('th:nth-child(3)').text('Armure');
  this.$statusBar.find('th:nth-child(4)').text('Epée');
};

export default StatusBar;
