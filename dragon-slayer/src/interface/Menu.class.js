'use strict';


////////////////////// CONSTRUCTEUR ET METHODES DE LA CLASSE //////////////////////

var Menu = function()
{
    // Recherche de l'objet jQuery représentant le menu de démarrage du jeu.
    this.$menu = $('#interface-menu');

    // Initalisation des autres propriétés de la classe.
    this.remainingPoints = 3;       // Le joueur peut répartir 3 points au départ


    /*
     * Installation des gestionnaires d'évènements du menu.
     *
     * .bind(this) permet de faire en sorte que la variable JavaScript this
     * fonctionne correctement dans les gestionnaires d'évènements.
     */

    // Gestion du clic sur les boutons de mise à jour des jauges du menu.
    this.$menu.find('.meter-control').on('click', this.onClickMeterButton.bind(this));

    // Gestion du clic sur le bouton démarrer du menu.
    this.$menu.find('.start').on('click', this.onClickStartButton.bind(this));
};

Menu.prototype.refresh = function()
{
    // Mise à jour de l'affichage du nombre de points restants à répartir.
    this.$menu.find('.remaining-points').text(this.remainingPoints);
};



////////////////////// GESTIONNAIRES D'EVENEMENTS DE LA CLASSE //////////////////////

Menu.prototype.onClickMeterButton = function(event)
{
    var $button;
    var meter;

    // Récupération de l'objet jQuery du bouton qui a déclenché l'évènement.
    $button = $(event.currentTarget);

    /*
     * Récupération de l'objet DOM de la jauge reliée au bouton.
     *
     * On utilise l'objet DOM natif et pas jQuery car on a besoin de tester
     * plusieurs attributs HTML de la balise <meter> que jQuery ne supporte pas
     * directement (à part en utilisant la méthode .attr() ).
     */
    meter = document.getElementById($button.data('meter'));


    // Est-ce qu'il s'agit d'un bouton pour diminuer ou augmenter la jauge ?
    if($button.data('action') == 'decrease')
    {
        // Est-ce que la jauge peut encore diminuer ?
        if(meter.value > meter.min)
        {
            // Oui, diminution de la jauge.
            meter.value--;

            // On peut désormais répartir un point supplémentaire.
            this.remainingPoints++;
        }
    }
    else // if(button.data('action') == 'increase')
    {
        // Est-ce qu'il y a encore des points à répartir ?
        if(this.remainingPoints > 0)
        {
            // Oui, est-ce que la jauge peut encore augmenter ?
            if(meter.value < meter.max)
            {
                // Oui, augmentation de la jauge.
                meter.value++;

                // On peut désormais répartir un point en moins.
                this.remainingPoints--;
            }
        }
    }


    // Mise à jour de l'affichage.
    this.refresh();

    // Suppression du comportement par défaut des boutons (soumission du formulaire).
    event.preventDefault();
};

Menu.prototype.onClickStartButton = function(event)
{
    var menuData;

    // Création d'un objet avec toutes les valeurs du menu de démarrage (formulaire).
    menuData =
    {
        agility    : this.$menu.find('#agility').val(),
        difficulty : this.$menu.find('[name=difficulty]:checked').val(),
        nickName   : this.$menu.find('[name=nickName]').val(),
        strength   : this.$menu.find('#strength').val()
    };

    // Démarrage du jeu, fourniture des options choisies du menu de démarrage.
    $(document).trigger('game:start', menuData);

    // Suppression du comportement par défaut des boutons (soumission du formulaire).
    event.preventDefault();
};