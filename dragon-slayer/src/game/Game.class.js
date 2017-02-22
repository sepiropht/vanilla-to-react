import World from './World.class';
import Player from './Player.class';
import Dragon from './Dragon.class';
import StatusBar from '../interface/StatusBar.class';
import Map from '../interface/Map.class';
import React, { Component } from 'react';
import { rollDice } from '../library/utilities';
import $ from 'jquery';
import MessagePanel from '../interface/MessagePanel.class';
import {
  GAME_STATE_END,
  GAME_STATE_FIGHT,
  GAME_STATE_PLAY_START,
  GAME_STATE_PLAY,
  KEY_F,
  DRAGON_TYPE_BLACK,
  KEY_DOWN_ARROW,
  DIRECTION_SOUTH,
  KEY_LEFT_ARROW,
  DIRECTION_WEST,
  KEY_RIGHT_ARROW,
  dataWorldEvents,
  DIRECTION_EAST,
  KEY_UP_ARROW,
  TREASURE_TYPE_SWORD,
  TREASURE_TYPE_ARMOR,
  DIRECTION_NORTH,
  LEVEL_EASY,
  DRAGON_TYPE_GREEN,
  DRAGON_TYPE_RED
} from '../dragon-slayer-data';
////////////////////// CONSTRUCTEUR ET METHODES DE LA CLASSE //////////////////////
class GameMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props,
      difficulty: null,
      dragon: null,
      map: null,
      messages: [],
      player: null,
      state: null,
      world: new World()
    };

    this.setup();
  }
  componentDidMount() {
    this.setState({ map: new Map(this.refs.canvas) });
    $(document).on('game:change-state', this.onGameChangeState.bind(this));
    this.onGameStart(undefined, this.state.data);
    // Gestion du changement d'état du jeu (voir dragon-slayer-data.js ligne 28)
    //
    // // Gestion du démarrage du jeu (après avoir rempli le menu de démarrage)
    //$(document).on('game:start', this.onGameStart.bind(this));
  }
  // Initalisation des propriétés de la classe.
  /*
     * Installation des gestionnaires d'évènements du jeu.
     *
     * .bind(this) permet de faire en sorte que la variable JavaScript this
     * fonctionne correctement dans les gestionnaires d'évènements.
     */
  setup() {}

  refreshLoop() {
    // Affichage de la carte.
    this.state.map.refresh(this.state.world);

    // Affichage de la barre de statut du jeu.

    // On ne dessine le joueur que s'il est en train de se déplacer sur la carte.
    if (
      this.state.state === GAME_STATE_PLAY ||
      this.state.state === GAME_STATE_PLAY_START
    ) {
      // Affichage du joueur sur la carte.

      this.state.player.entity.refresh(
        this.state.map.canvasContext,
        this.state.world
      );
    }

    // Mise à jour de l'animation des sprites.
    this.state.player.entity.sprite.update();

    // Affichage des effets spéciaux graphiques éventuels.
    this.state.map.refreshPostEffect();

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
  }

  ////////////////////// GESTIONNAIRES D'EVENEMENTS DE LA CLASSE //////////////////////
  onGameChangeState(event, gameState) {
    // Enregistrement de l'état du jeu dans lequel on se trouve désormais.
    this.state.state = gameState;

    // Désinstallation de tous les gestionnaires d'évènement du clavier.
    $(document).off('keydown');

    // Activation d'un effet spécial graphique pour indiquer le changement d'état.
    this.state.map.setPostEffect(gameState);

    switch (gameState) {
      case GAME_STATE_END: {
        if (this.state.dragon.isDead() === true) {
          // $(document).trigger('message:add', [
          //   'Le cadavre du dragon noir fumant gît à vos pieds, ' +
          //     '<strong>victoire</strong> ! :-)',
          //   'important'
          // ]);
          this.setState({
            messages: [
              ...this.state.messages,
              {
                text: 'Le cadavre du dragon noir fumant gît à vos pieds, ' +
                  '<strong>victoire</strong> ! :-)',
                categorie: 'important'
              }
            ]
          });
        } else {
          // if(this.state.player.isDead() ==== true)
          $(document).trigger('message:add', [
            'Vous avez été <strong>carbonisé</strong> par le dragon, ' +
              'pas de chance :-(',
            'important'
          ]);
          this.setState({
            messages: [
              ...this.state.messages,
              {
                text: 'Vous avez été <strong>carbonisé</strong> par le dragon, ' +
                  'pas de chance :-(',
                categorie: 'important'
              }
            ]
          });
        }

        $(document).trigger('message:add', [
          '<a href="index.html">Cliquez sur le titre</a> pour relancer le jeu !',
          'info'
        ]);

        break;
      }

      case GAME_STATE_FIGHT: {
        $(document).trigger('message:add', [
          "Vous avez découvert la grotte d'un dragon, le combat s'engage " +
            '(<strong>touche F</strong>) !',
          'important'
        ]);

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
        $(document).trigger('message:add', [
          'Trouvez et détruisez le <strong>DRAGON NOIR</strong> pour gagner ' +
            'la partie&nbsp;!',
          'info'
        ]);
        this.setState({
          messages: [
            ...this.state.messages,
            {
              text: 'Trouvez et détruisez le <strong>DRAGON NOIR</strong> pour gagner ' +
                'la partie&nbsp;!',
              categorie: 'info'
            }
          ]
        });

        /*
             * Installation d'un gestionnaire d'évènement sur l'appui d'une touche.
             *
             * .bind(this) permet de faire en sorte que la variable JavaScript this
             * fonctionne correctement dans les gestionnaires d'évènements.
             */
        $(document).on('keydown', this.onKeyDownGamePlay.bind(this));

        if (gameState === GAME_STATE_PLAY_START) {
          // $(document).trigger('message:add', [
          //   'Bienvenu(e) <em>' + this.state.player.nickName + '</em> ;-)',
          //   'info'
          // ]);
          this.setState({
            messages: [
              ...this.state.messages,
              {
                text: 'Bienvenu(e) <em>' +
                  this.state.player.nickName +
                  '</em> ;-)',
                categorie: 'info'
              }
            ]
          });

          // Affichage initial du jeu.
          this.refreshLoop();
        }

        break;
      }
    }
  }

  onGameStart(event, menuData) {
    this.state.difficulty = menuData.difficulty;

    // Création du joueur.
    this.state.player = new Player(
      menuData.pseudo,
      menuData.agility,
      menuData.strength
    );

    // Placement du joueur sur la carte du monde.
    this.state.player.entity.moveTo(16, 23);

    // On cache le menu de démarrage...
    // ...Puis on affiche le jeu.
    $('main').fadeIn(1500, function() {
      // Suppression de l'animation sur le titre du jeu.
      $('h1').removeClass('animate-fire');

      // Le joueur est maintenant sur la carte !
      $(document).trigger('game:change-state', GAME_STATE_PLAY_START);
    });
  }

  onKeyDownGameFight(event) {
    var dragonSpeed;
    var playerSpeed;

    // Est-ce que le joueur a appuyé sur la touche de combat (touche F) ?
    if (event.keyCode !== KEY_F) {
      // Non, le joueur a appuyé sur une touche que l'on ne gère pas.
      return false;
    }

    // Calcul aléatoire de la vitesse du dragon et du joueur.
    dragonSpeed = rollDice();
    playerSpeed = rollDice();

    // Est-ce que le dragon est plus rapide que le joueur ?
    if (dragonSpeed > playerSpeed) {
      // Oui, le dragon attaque le joueur.
      this.state.dragon.attack(this.state.player);
    } else {
      // Non, le joueur ataque le dragon.
      this.state.player.attack(this.state.dragon);
    }

    if (this.state.dragon.isDead() === true) {
      if (this.state.dragon.type === DRAGON_TYPE_BLACK) {
        // Le joueur a gagné la partie !
        $(document).trigger('game:change-state', GAME_STATE_END);
      } else {
        $(document).trigger('message:add', [
          "Le dragon est mort, mais ce n'est pas un dragon noir, " +
            '<strong>continuez</strong> ! :-)',
          'important'
        ]);
        this.setState({
          messages: [
            ...this.state.messages,
            {
              text: "Le dragon est mort, mais ce n'est pas un dragon noir, " +
                '<strong>continuez</strong> ! :-)',
              categorie: 'important'
            }
          ]
        });

        // Il n'y a plus de dragon à gérer.
        this.state.dragon = null;

        // Le joueur retourne sur la carte, à la recherche du dragon noir !
        $(document).trigger('game:change-state', GAME_STATE_PLAY);
      }
    }
    if (this.state.player.isDead() === true) {
      // Game over !
      $(document).trigger('game:change-state', GAME_STATE_END);
    }
  }

  onKeyDownGamePlay(event) {
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
        this.state.player.tryMove(DIRECTION_SOUTH, this.state.world);
        break;

      case KEY_LEFT_ARROW:
        // Tentative de déplacement du joueur d'une case vers l'ouest.
        this.state.player.tryMove(DIRECTION_WEST, this.state.world);
        break;

      case KEY_RIGHT_ARROW:
        // Tentative de déplacement du joueur d'une case vers l'est.
        this.state.player.tryMove(DIRECTION_EAST, this.state.world);
        break;

      case KEY_UP_ARROW:
        // Tentative de déplacement du joueur d'une case vers le nord.
        this.state.player.tryMove(DIRECTION_NORTH, this.state.world);
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
      if (dataWorldEvents[index].done === false) {
        // Non, est-ce que les coordonnées (x, y) correspondent avec celles du joueur ?
        if (
          dataWorldEvents[index].x === this.state.player.entity.x &&
          dataWorldEvents[index].y === this.state.player.entity.y
        ) {
          // Oui, quel type d'évènement faut-il déclencher ?
          switch (dataWorldEvents[index].what) {
            case 'dragon-1':
              if (this.state.difficulty === LEVEL_EASY) {
                this.state.dragon = new Dragon(DRAGON_TYPE_GREEN);
              } else {
                this.state.dragon = new Dragon(DRAGON_TYPE_RED);
              }
              $(document).trigger('game:change-state', GAME_STATE_FIGHT);
              break;

            case 'dragon-2':
              this.state.dragon = new Dragon(DRAGON_TYPE_BLACK);
              $(document).trigger('game:change-state', GAME_STATE_FIGHT);
              break;

            case 'treasure-1':
              this.state.player.giveTreasure(
                TREASURE_TYPE_SWORD,
                this.state.difficulty
              );
              break;

            case 'treasure-2':
              this.state.player.giveTreasure(
                TREASURE_TYPE_ARMOR,
                this.state.difficulty
              );
              break;
          }

          // L'évènement s'est produit, il ne doit plus s'exécuter de nouveau.
          dataWorldEvents[index].done = true;
        }
      }
    }
  }
  render() {
    return (
      <main className="hide">
        <section className="interface-box interface-game">
          <canvas ref="canvas" width={640} height={480} />
          <StatusBar player={this.state.player} dragon={this.state.dragon} />
        </section>
        <MessagePanel messages={this.state.messages} />
      </main>
    );
  }
}

export default GameMap;
