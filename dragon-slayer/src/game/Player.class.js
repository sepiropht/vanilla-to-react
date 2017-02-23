import { getRandomInteger, rollDice } from '../library/utilities';
import Entity from '../interface/Entity.class';
import $ from 'jquery';
import * as dataGame from '../dragon-slayer-data';
import link from '../images/link.png';
////////////////////// CONSTRUCTEUR ET METHODES DE LA CLASSE //////////////////////
const Player = function(nickName, agility, strength, message) {
  // Est-ce que le joueur a saisi un pseudo ?
  if (nickName.length === 0) {
    // Non, utilisation d'un pseudo par défaut.
    nickName = 'link';
  }

  this.agility = agility;
  this.armor = null;
  // Au début le joueur n'a pas d'armure
  this.attackLevel = 1;
  // Niveau d'attaque minimum
  this.defenseLevel = 1;
  this.addMessage = message;
  // Niveau de défense minimum
  this.entity = new Entity(link, 32, 12);
  this.hp = getRandomInteger(200, 250);
  this.nickName = nickName.toLowerCase();
  this.strength = strength;
  this.sword = null; // Au début le joueur n'a pas d'épée
};

Player.prototype.attack = function(dragon) {
  var damagePoints;

  // Est-ce que le dragon va réussir à éviter le coup ?
  if (dragon.tryHit(this) == false) {
    this.addMessage({
      text: 'Vous avez raté votre coup contre le dragon !'
    });

    return;
  }

  // Calcul des dégâts à infliger au dragon.
  damagePoints = rollDice() * 4;
  damagePoints -= dragon.defenseLevel;
  damagePoints += this.getAttackLevel();
  if (damagePoints <= 0) {
    /*
         * On n'a pas réussi à vraiment faire de mal au dragon, on lui inflige
         * seulement une erraflure, soit 5 points de vie en moins.
         */
    damagePoints = 5;
  }

  // Diminution des points de vie du dragon.
  dragon.takeHp(damagePoints);
  this.addMessage({
    text: 'Vous avez infligé ' + damagePoints + ' dégâts au dragon !',
    categorie: 'important'
  });
};

Player.prototype.getAttackLevel = function() {
  return rollDice() * this.attackLevel + this.strength;
};

Player.prototype.giveHp = function(healthPoints) {
  this.hp += healthPoints;
};

Player.prototype.giveTreasure = function(type, difficulty) {
  if (type == dataGame.TREASURE_TYPE_ARMOR) {
    this.armor = dataGame.dataTreasures[difficulty].armor;

    switch (this.armor) {
      case dataGame.ARMOR_COPPER:
        this.defenseLevel = 2;
        break;

      case dataGame.ARMOR_IRON:
        this.defenseLevel = 6;
        break;

      case dataGame.ARMOR_MAGICAL:
        this.defenseLevel = 12;
        break;
    }

    this.addMessage({
      text: "Vous avez trouvé l'" + this.armor + ' !',
      categorie: 'important'
    });
  } else if (type == dataGame.TREASURE_TYPE_SWORD) {
    this.sword = dataGame.dataTreasures[difficulty].sword;

    switch (this.sword) {
      case dataGame.SWORD_WOOD:
        this.attackLevel = 2;
        break;

      case dataGame.SWORD_STEEL:
        this.attackLevel = 6;
        break;

      case dataGame.SWORD_EXCALIBUR:
        this.attackLevel = 12;
        break;
    }

    this.addMessage({
      text: "Vous avez trouvé l'" + this.sword + ' !',
      categorie: 'important'
    });
  }
};

Player.prototype.isDead = function() {
  return this.hp <= 0;
};

Player.prototype.takeHp = function(damagePoints) {
  this.hp -= damagePoints;
};

Player.prototype.tryHit = function(dragon) {
  var dragonLuck;
  var playerLuck;

  // Calcul aléatoire de la chance du dragon et du joueur.
  dragonLuck = rollDice() * 2;
  playerLuck = rollDice();

  return dragon.agility + dragonLuck >= this.agility + playerLuck;
};

Player.prototype.tryMove = function(direction, world) {
  // Est-ce que le joueur peut se déplacer dans la direction spécifiée ?
  console.log('tryMove', direction, world);
  if (this.entity.tryMove(direction, world) === true) {
    // Oui, déplacement (scrolling) de la carte du monde si besoin.
    console.log('tryMove scrolling', direction, world);
    world.scroll(direction);
  }
};

export default Player;
