import Sprite from '../library/Sprite.class';
import {
  TILESET_PIXEL_SIZE,
  DIRECTION_SOUTH,
  DIRECTION_WEST,
  DIRECTION_NORTH,
  DIRECTION_EAST
} from '../dragon-slayer-data';
////////////////////// CONSTRUCTEUR ET METHODES DE LA CLASSE //////////////////////
var Entity = function(fileName, height, animationFrameCount) {
  this.sprite = new Sprite(fileName, height, animationFrameCount);
  this.x = null;
  // Au début l'entité est nulle part
  this.y = null; // Au début l'entité est nulle part
};

Entity.prototype.moveTo = function(x, y) {
  this.x = x;
  this.y = y;
};

Entity.prototype.refresh = function(canvasContext, world) {
  var x, y;

  x = this.x - world.offsetX;
  // Coordonnée X relative au monde
  y = this.y - world.offsetY;
  // Coordonnée Y relative au monde
  /*
     * API Canvas, drawImage()
     * http://devdocs.io/dom/canvasrenderingcontext2d/drawimage
     */
  // Dessine le sprite de l'entité dans le canvas.
  canvasContext.drawImage(
    this.sprite.image,
    // image
    this.sprite.sx,
    // sx
    this.sprite.sy,
    // sy
    TILESET_PIXEL_SIZE,
    // sWidth  (16 pixels)
    TILESET_PIXEL_SIZE,
    // sHeight (16 pixels)
    x * TILESET_PIXEL_SIZE,
    // dx
    y * TILESET_PIXEL_SIZE,
    // dy
    TILESET_PIXEL_SIZE,
    // dWidth  (16 pixels)
    // dHeight (16 pixels)
    TILESET_PIXEL_SIZE
  );
};

Entity.prototype.tryMove = function(direction, world) {
  var x, y;

  // Changement de la direction du sprite de l'entité.
  this.sprite.setDirection(direction);

  // Copie des coordonnées de l'entité dans des variables intermédiaires.
  x = this.x;
  y = this.y;
  // Mise à jour des variables intermédiaires en fonction de la direction spécifiée.
  switch (direction) {
    case DIRECTION_EAST:
      x++;
      break;

    case DIRECTION_NORTH:
      y--;
      break;

    case DIRECTION_SOUTH:
      y++;
      break;

    case DIRECTION_WEST:
      x--;
      break;
  }

  // Est-ce que l'entité a le droit de se placer sur le carreau à ces coordonnées ?
  if (world.canEntityMoveAt(x, y) == true) {
    // Copie des variables intermédiaires dans les coordonnées de l'entité.
    this.x = x;
    this.y = y;

    // L'entité s'est bien déplacée.
    return true;
  }

  // L'entité ne s'est pas déplacée.
  return false;
};

export default Entity;
