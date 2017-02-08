import World from './World.class';
import Player from './Player.class';
import Dragon from './Dragon.class';
import StatusBar from '../interface/StatusBar.class';
import Map from '../interface/Map';
import React, { Component } from 'react';

////////////////////// CONSTRUCTEUR ET METHODES DE LA CLASSE //////////////////////
const Game = function() {
  // Initalisation des propriétés de la classe.
  this.difficulty = null;
  this.dragon = null;
  this.map = new Map();
  this.player = null;
  this.state = null;
  this.statusBar = new StatusBar();
  this.world = new World();

  /*
     * Installation des gestionnaires d'évènements du jeu.
     *
     * .bind(this) permet de faire en sorte que la variable JavaScript this
     * fonctionne correctement dans les gestionnaires d'évènements.
     */
  // Gestion du changement d'état du jeu (voir dragon-slayer-data.js ligne 28)
  $(document).on('game:change-state', this.onGameChangeState.bind(this));

  // Gestion du démarrage du jeu (après avoir rempli le menu de démarrage)
  $(document).on('game:start', this.onGameStart.bind(this));
};

Game.prototype.setup = function() {
  var menu;
  var messagePanel;

  // Création et affichage du menu de démarrage.
  menu = new Menu();
  menu.refresh();

  // Création et initialisation du panneau de messages.
  messagePanel = new MessagePanel();
  messagePanel.clear();
};

Game.prototype.refreshLoop = function() {
  // Affichage de la carte.
  this.map.refresh(this.world);

  // Affichage de la barre de statut du jeu.
  this.statusBar.refresh(this.dragon, this.player);

  // On ne dessine le joueur que s'il est en train de se déplacer sur la carte.
  if (this.state == GAME_STATE_PLAY || this.state == GAME_STATE_PLAY_START) {
    // Affichage du joueur sur la carte.
    this.player.entity.refresh(this.map.canvasContext, this.world);
  }

  // Mise à jour de l'animation des sprites.
  this.player.entity.sprite.update();

  // Affichage des effets spéciaux graphiques éventuels.
  this.map.refreshPostEffect();

  /*
     * Demande au navigateur de nous appeler dans ~16ms
     * Pour créer des animations fluides, l'oeil humain a besoin de voir
     * 60 images par secondes différentes.
     *
     * 1000 millisecondes / 60 = ~16.7 millisecondes
     *
     * Pour plus d'informations :
     * http://devdocs.io/dom/window/requestanimationframe
     *
     *
     * .bind(this) permet de faire en sorte que la variable JavaScript this
     * fonctionne correctement dans la méthode.
     */
  window.requestAnimationFrame(this.refreshLoop.bind(this));
};

////////////////////// GESTIONNAIRES D'EVENEMENTS DE LA CLASSE //////////////////////
Game.prototype.onGameChangeState = function(event, gameState) {
  // Enregistrement de l'état du jeu dans lequel on se trouve désormais.
  this.state = gameState;

  // Désinstallation de tous les gestionnaires d'évènement du clavier.
  $(document).off('keydown');

  // Activation d'un effet spécial graphique pour indiquer le changement d'état.
  this.map.setPostEffect(gameState);

  switch (gameState) {
    case GAME_STATE_END: {
      if (this.dragon.isDead() == true) {
        $(
          document,
        ).trigger('message:add', [ 'Le cadavre du dragon noir fumant gît à vos pieds, ' + '<strong>victoire</strong> ! :-)', 'important' ]);
      } else // if(this.player.isDead() == true)
        {
          $(
            document,
          ).trigger('message:add', [ 'Vous avez été <strong>carbonisé</strong> par le dragon, ' + 'pas de chance :-(', 'important' ]);
        }

      $(
        document,
      ).trigger('message:add', [ '<a href="index.html">Cliquez sur le titre</a> pour relancer le jeu !', 'info' ]);

      break;
    }

    case GAME_STATE_FIGHT: {
      $(
        document,
      ).trigger('message:add', [ "Vous avez découvert la grotte d'un dragon, le combat s'engage " + '(<strong>touche F</strong>) !', 'important' ]);

      /*
             * Installation d'un gestionnaire d'évènement sur l'appui d'une touche.
             *
             * .bind(this) permet de faire en sorte que la variable JavaScript this
             * fonctionne correctement dans les gestionnaires d'évènements.
             */
      $(document).on('keydown', this.onKeyDownGameFight.bind(this));

      break;
    }

    case GAME_STATE_PLAY:
    case GAME_STATE_PLAY_START: {
      $(
        document,
      ).trigger('message:add', [ 'Trouvez et détruisez le <strong>DRAGON NOIR</strong> pour gagner ' + 'la partie&nbsp;!', 'info' ]);

      /*
             * Installation d'un gestionnaire d'évènement sur l'appui d'une touche.
             *
             * .bind(this) permet de faire en sorte que la variable JavaScript this
             * fonctionne correctement dans les gestionnaires d'évènements.
             */
      $(document).on('keydown', this.onKeyDownGamePlay.bind(this));

      if (gameState == GAME_STATE_PLAY_START) {
        $(
          document,
        ).trigger('message:add', [ 'Bienvenu(e) <em>' + this.player.nickName + '</em> ;-)', 'info' ]);

        // Mise en place de la barre de statut.
        this.statusBar.setup();

        // Affichage initial du jeu.
        this.refreshLoop();
      }

      break;
    }
  }
};

Game.prototype.onGameStart = function(event, menuData) {
  // Enregistrement de la difficulté du jeu.
  this.difficulty = menuData.difficulty;

  // Création du joueur.
  this.player = new Player(
    menuData.nickName,
    menuData.agility,
    menuData.strength,
  );

  // Placement du joueur sur la carte du monde.
  this.player.entity.moveTo(16, 23);

  // On cache le menu de démarrage...
  $('#interface-menu').fadeOut(1000, function() {
    // ...Puis on affiche le jeu.
    $('main').fadeIn(1500, function() {
      // Suppression de l'animation sur le titre du jeu.
      $('h1').removeClass('animate-fire');

      // Le joueur est maintenant sur la carte !
      $(document).trigger('game:change-state', GAME_STATE_PLAY_START);
    });
  });
};

Game.prototype.onKeyDownGameFight = function(event) {
  var dragonSpeed;
  var playerSpeed;

  // Est-ce que le joueur a appuyé sur la touche de combat (touche F) ?
  if (event.keyCode != KEY_F) {
    // Non, le joueur a appuyé sur une touche que l'on ne gère pas.
    return false;
  }

  // Calcul aléatoire de la vitesse du dragon et du joueur.
  dragonSpeed = rollDice();
  playerSpeed = rollDice();

  // Est-ce que le dragon est plus rapide que le joueur ?
  if (dragonSpeed > playerSpeed) {
    // Oui, le dragon attaque le joueur.
    this.dragon.attack(this.player);
  } else {
    // Non, le joueur ataque le dragon.
    this.player.attack(this.dragon);
  }

  if (this.dragon.isDead() == true) {
    if (this.dragon.type == DRAGON_TYPE_BLACK) {
      // Le joueur a gagné la partie !
      $(document).trigger('game:change-state', GAME_STATE_END);
    } else {
      $(
        document,
      ).trigger('message:add', [ "Le dragon est mort, mais ce n'est pas un dragon noir, " + '<strong>continuez</strong> ! :-)', 'important' ]);

      // Il n'y a plus de dragon à gérer.
      this.dragon = null;

      // Le joueur retourne sur la carte, à la recherche du dragon noir !
      $(document).trigger('game:change-state', GAME_STATE_PLAY);
    }
  }
  if (this.player.isDead() == true) {
    // Game over !
    $(document).trigger('game:change-state', GAME_STATE_END);
  }
};

Game.prototype.onKeyDownGamePlay = function(event) {
  var index;

  /*
     * Vérification de la touche du clavier sur lequel le joueur a appuyé.
     *
     * L'objet event contient des informations sur l'évènement dont le code
     * de touche du clavier.
     */
  switch (event.keyCode) {
    case KEY_DOWN_ARROW:
      // Tentative de déplacement du joueur d'une case vers le sud.
      this.player.tryMove(DIRECTION_SOUTH, this.world);
      break;

    case KEY_LEFT_ARROW:
      // Tentative de déplacement du joueur d'une case vers l'ouest.
      this.player.tryMove(DIRECTION_WEST, this.world);
      break;

    case KEY_RIGHT_ARROW:
      // Tentative de déplacement du joueur d'une case vers l'est.
      this.player.tryMove(DIRECTION_EAST, this.world);
      break;

    case KEY_UP_ARROW:
      // Tentative de déplacement du joueur d'une case vers le nord.
      this.player.tryMove(DIRECTION_NORTH, this.world);
      break;

    default:
      // Le joueur a appuyé sur une touche que l'on ne gère pas.
      return false;
  }

  /*
     * Vérification que le joueur ne s'est pas placé sur un carreau relié à un
     * évènement sur la carte.
     */
  for (index = 0; index < dataWorldEvents.length; index++) {
    // Est-ce que l'évènement ne s'est pas déjà produit ?
    if (dataWorldEvents[index].done == false) {
      // Non, est-ce que les coordonnées (x, y) correspondent avec celles du joueur ?
      if (
        dataWorldEvents[index].x == this.player.entity.x &&
          dataWorldEvents[index].y == this.player.entity.y
      ) {
        // Oui, quel type d'évènement faut-il déclencher ?
        switch (dataWorldEvents[index].what) {
          case 'dragon-1':
            if (this.difficulty == LEVEL_EASY) {
              this.dragon = new Dragon(DRAGON_TYPE_GREEN);
            } else {
              this.dragon = new Dragon(DRAGON_TYPE_RED);
            }
            $(document).trigger('game:change-state', GAME_STATE_FIGHT);
            break;

          case 'dragon-2':
            this.dragon = new Dragon(DRAGON_TYPE_BLACK);
            $(document).trigger('game:change-state', GAME_STATE_FIGHT);
            break;

          case 'treasure-1':
            this.player.giveTreasure(TREASURE_TYPE_SWORD, this.difficulty);
            break;

          case 'treasure-2':
            this.player.giveTreasure(TREASURE_TYPE_ARMOR, this.difficulty);
            break;
        }

        // L'évènement s'est produit, il ne doit plus s'exécuter de nouveau.
        dataWorldEvents[index].done = true;
      }
    }
  }
};
export default Game;
