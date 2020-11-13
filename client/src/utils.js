"use strict";
// # Fonctions utilitaires
// Fonctions utilitaires pour des méthodes génériques qui n'ont
// pas de lien direct avec le jeu.
exports.__esModule = true;
exports.clamp = exports.inRange = void 0;
// ## Fonction *inRange*
// Méthode utilitaire retournant le booléen *vrai* si une
// valeur se situe dans un interval.
function inRange(x, min, max) {
    return (min <= x) && (x <= max);
}
exports.inRange = inRange;
// ## Fonction *clamp*
// Méthode retournant la valeur passée en paramètre si elle
// se situe dans l'interval spécifié, ou l'extrémum correspondant
// si elle est hors de l'interval.
function clamp(x, min, max) {
    return Math.min(Math.max(x, min), max);
}
exports.clamp = clamp;
