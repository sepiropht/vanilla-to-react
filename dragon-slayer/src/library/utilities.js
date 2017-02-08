'use strict';


////////////////////// FONCTIONS UTILITAIRES //////////////////////

function getRandomInteger(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
 * Fonction imitant un dé jeté sur une table, comme dans les jeux de rôles sur papier ;-)
 */
function rollDice()
{
    return getRandomInteger(1, 6);
}