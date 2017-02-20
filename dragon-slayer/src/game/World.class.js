import * as dataGame from '../dragon-slayer-data';

const World = function() {
  this.offsetX = 0;
  this.offsetY = 0;
};

World.prototype.canEntityMoveAt = function(x, y) {
  var tile;

  // Est-ce que les coordonnées spécifiées sont en dehors de la carte du monde ?
  if (
    x < 0 || x >= dataGame.WORLD_WIDTH || (y < 0 || y >= dataGame.WORLD_HEIGHT)
  ) {
    // Oui, il est donc impossible de s'y déplacer.
    return false;
  }

  // Récupération du carreau se trouvant aux coordonnées absolues spécifiées.
  tile = dataGame.dataWorld[y][x];

  // Renvoie vrai si on a le droit de se déplacer sur ce carreau.
  return dataGame.dataTiles[tile].walkable;
};

World.prototype.getTileAt = function(x, y) {
  // Renvoie le carreau se trouvant aux coordonnées relatives spécifiées.
  return dataGame.dataWorld[this.offsetY + y][this.offsetX + x];
};

World.prototype.scroll = function(direction) {
  switch (direction) {
    case dataGame.DIRECTION_EAST:
      if (this.offsetX < dataGame.WORLD_WIDTH - dataGame.MAP_WIDTH) {
        // Décalage vers la droite de la carte du monde.
        this.offsetX++;
      }
      break;

    case dataGame.DIRECTION_WEST:
      if (this.offsetX > 0) {
        // Décalage vers la gauche de la carte du monde.
        this.offsetX--;
      }
      break;
  }
};
export default World;
