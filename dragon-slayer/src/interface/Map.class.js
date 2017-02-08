'use strict';
////////////////////// CONSTRUCTEUR ET METHODES DE LA CLASSE //////////////////////

const Map = function() {
  var canvas;

  // Recherche de l'objet JavaScript natif représentant la balise <canvas>.
  canvas = document.querySelector('#interface-map');

  // Récupération du contexte 2D du canvas.
  this.canvasContext = canvas.getContext('2d');

  // Création d'un objet permettant de faire des effets graphiques dans le canvas.
  this.canvasFX = new CanvasFX(this.canvasContext);

  /*
     * Chargement du fichier image contenant tous les petits carreaux.
     *
     * La classe Image représente un objet DOM de la balise HTML <img>.
     */
  this.tileset = new Image();
  this.tileset.src = 'images/tileset.png';
};

Map.prototype.refresh = function(world) {
  var tile;
  var x, y;

  for (y = 0; y < MAP_HEIGHT; y++) {
    for (x = 0; x < MAP_WIDTH; x++) {
      // Récupération du petit carreau aux coordonnées (x, y).
      tile = world.getTileAt(x, y);

      /*
             * API Canvas, drawImage()
             * http://devdocs.io/dom/canvasrenderingcontext2d/drawimage
             */
      // Dessine le petit carreau dans le canvas.
      this.canvasContext.drawImage(
        this.tileset,
        // image
        dataTiles[tile].sx,
        // sx
        dataTiles[tile].sy,
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
        TILESET_PIXEL_SIZE,
      );
    }
  }
};

Map.prototype.refreshPostEffect = function() {
  this.canvasFX.refresh();
};

Map.prototype.setPostEffect = function(gameState) {
  switch (gameState) {
    case GAME_STATE_END:
      this.canvasFX.fadeTo(0, 0, 0);
      break;

    case GAME_STATE_FIGHT:
      this.canvasFX.fadeTo(64, 0, 0);
      break;

    case GAME_STATE_PLAY:
      this.canvasFX.clear();
      break;

    case GAME_STATE_PLAY_START:
      this.canvasFX.fadeIn();
      break;
  }
};
export default Map;
