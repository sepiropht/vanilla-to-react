import { TILESET_PIXEL_SIZE } from '../dragon-slayer-data';
////////////////////// CONSTRUCTEUR ET METHODES DE LA CLASSE //////////////////////
var Sprite = function(fileName, height, animationFrameCount) {
  /*
     * Chargement du fichier image spécifié contenant le sprite.
     *
     * La classe Image représente un objet DOM de la balise HTML <img>.
     */
  this.image = new Image();
  this.image.src = fileName;

  // Initialisation des coordonnées (x, y) source à l'intérieur de l'image du sprite.
  this.sx = 0;
  this.sy = 0;

  // Initialisation des propriétés utilisées pour animer le sprite.
  this.animationFrameCount = animationFrameCount;
  this.frame = 0;
  this.height = height;
};

Sprite.prototype.setDirection = function(direction) {
  /*
     * Les images des sprites sont triées dans le même ordre que les valeurs
     * des constantes : sud, ouest, nord, est.
     *
     * Il suffit alors de "multiplier" la direction par 16 pour obtenir la
     * coordonnée X source à l'intérieur de l'image du sprite.
     */
  this.sx = TILESET_PIXEL_SIZE * direction;
};

Sprite.prototype.update = function() {
  // Mise à jour du compteur d'images par seconde.
  this.frame++;

  // Est-ce que le compteur à atteint le seuil pour animer le sprite ?
  if (this.frame == this.animationFrameCount) {
    // Oui, réinitialisation du compteur d'images par secondes.
    this.frame = 0;

    // Mise à jour de la coordonnée Y source à l'intérieur de l'image du sprite.
    this.sy += TILESET_PIXEL_SIZE;

    // Est-ce que la coordonnée Y source a atteint la taille de l'image du sprite ?
    if (this.sy == this.height) {
      // Oui, retour à la coordonnée Y source 0 afin de boucler l'animation.
      this.sy = 0;
    }
  }
};

export default Sprite;
