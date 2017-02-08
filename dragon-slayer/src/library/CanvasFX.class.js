'use strict';


////////////////////// CONSTRUCTEUR ET METHODES DE LA CLASSE //////////////////////

var CanvasFX = function(canvasContext)
{
    // Enregistrement du contexte 2D du canvas pour dessiner dedans.
    this.canvasContext = canvasContext;

    this.alpha        = 0;
    this.alphaCompare = null;
    this.blue         = 0;
    this.delta        = null;
    this.enable       = false;
    this.green        = 0;
    this.mustUpdate   = false;
    this.red          = 0;
};

CanvasFX.prototype.clear = function()
{
    // Désactivation complète des effets graphiques sur le canvas.
    this.enable = false;
};

CanvasFX.prototype.fadeIn = function()
{
    // Mise à jour des propriétés, l'alpha va aller de 1 à 0.
    this.alpha        = 1;
    this.alphaCompare = 0;
    this.blue         = 0;
    this.delta        = -(1 / 30);
    this.enable       = true;
    this.green        = 0;
    this.mustUpdate   = true;
    this.red          = 0;
};

CanvasFX.prototype.fadeTo = function(red, green, blue)
{
    // Mise à jour des propriétés, l'alpha va aller de 0 à 0.66.
    this.alpha        = 0;
    this.alphaCompare = 0.66;
    this.blue         = blue;
    this.delta        = (1 / 30);
    this.enable       = true;
    this.green        = green;
    this.mustUpdate   = true;
    this.red          = red;
};

CanvasFX.prototype.refresh = function()
{
    if(this.enable == false)
    {
        return;
    }

    // Sélection de la couleur pour remplir le canvas (avec la fonction CSS rgba() ).
    this.canvasContext.fillStyle =
        'rgba(' +
            this.red   + ',' +
            this.green + ',' +
            this.blue  + ',' +
            this.alpha +
        ')';

    // Dessine un rectangle remplissant tout le canvas.
    this.canvasContext.fillRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);

    // Doit-on mettre à jour la valeur de la couche alpha ?
    if(this.mustUpdate == false)
    {
        // Non, on s'arrête ici.
        return;
    }

    // Mise à jour de la valeur de la couche alpha.
    this.alpha += this.delta;

    if(this.delta < 0)
    {
        // Est-ce qu'on est arrivé à la fin ?
        if(this.alpha <= this.alphaCompare)
        {
            this.alpha = this.alphaCompare;

            // On arrête de mettre à jour la valeur de la couche alpha.
            this.mustUpdate = false;
        }
    }
    else
    {
        // Est-ce qu'on est arrivé à la fin ?
        if(this.alpha >= this.alphaCompare)
        {
            this.alpha = this.alphaCompare;

            // On arrête de mettre à jour la valeur de la couche alpha.
            this.mustUpdate = false;
        }
    }
};