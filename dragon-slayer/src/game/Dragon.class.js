'use strict';
////////////////////// CONSTRUCTEUR ET METHODES DE LA CLASSE //////////////////////

const Dragon = function(type) {
  this.agility = dataDragons[type].agility;
  this.attackLevel = dataDragons[type].attackLevel;
  this.defenseLevel = dataDragons[type].defenseLevel;
  this.hp = dataDragons[type].hp;
  this.strength = dataDragons[type].strength;
  this.type = type;
};

Dragon.prototype.attack = function(player) {
  var damagePoints;

  // Est-ce que le joueur va réussir à éviter le coup ?
  if (player.tryHit(this) == false) {
    $(
      document,
    ).trigger('message:add', "Le dragon n'a pas réussi à vous toucher !");

    return;
  }

  // Calcul des dégâts à infliger au joueur.
  damagePoints = rollDice() * 2;
  damagePoints -= player.defenseLevel;
  damagePoints += this.getAttackLevel();
  if (damagePoints <= 0) {
    /*
         * Le dragon n'a pas réussi à vraiment faire de mal au joueur qui reçoit
         * seulement une erraflure, soit 8 points de vie en moins.
         */
    damagePoints = 8;
  }

  // Diminution des points de vie du joueur.
  player.takeHp(damagePoints);

  $(
    document,
  ).trigger('message:add', [ 'Le dragon vous inflige ' + damagePoints + ' dégâts !', 'important' ]);
};

Dragon.prototype.getAttackLevel = function() {
  return rollDice() * this.attackLevel + this.strength;
};

Dragon.prototype.giveHp = function(healthPoints) {
  this.hp += healthPoints;
};

Dragon.prototype.isDead = function() {
  return this.hp <= 0;
};

Dragon.prototype.takeHp = function(damagePoints) {
  this.hp -= damagePoints;
};

Dragon.prototype.tryHit = function(player) {
  var dragonLuck;
  var playerLuck;

  // Calcul aléatoire de la chance du dragon et du joueur.
  dragonLuck = rollDice();
  playerLuck = rollDice() * 2;

  return player.agility + playerLuck >= this.agility + dragonLuck;
};

export default Dragon;