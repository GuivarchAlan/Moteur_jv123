"use strict";
// # Fonctions d'affichage
exports.__esModule = true;
exports.requestFullScreen = exports.init = exports.context = exports.canvas = void 0;
// ## Méthode *init*
// La méthode d'initialisation prend en paramètre le nom d'un objet de
// type *canvas* de la page web où dessiner. On y extrait
// et conserve alors une référence vers le contexte de rendu 3D.
function init(canvasId) {
    exports.canvas = document.getElementById(canvasId);
    var gl = exports.canvas.getContext("webgl");
    if (!gl) {
        throw new Error("Impossible de récupérer le contexte WebGL!");
    }
    exports.context = gl;
    return exports.context;
}
exports.init = init;
// ## Méthode *requestFullScreen*
// Méthode utilitaire pour mettre le canvas en plein écran.
// Il existe plusieurs méthodes selon le navigateur, donc on
// se doit de vérifier l'existence de celles-ci avant de les
// appeler.
//
// À noter qu'un script ne peut appeler le basculement en plein
// écran que sur une action explicite du joueur.
function requestFullScreen() {
    exports.canvas.requestFullscreen();
}
exports.requestFullScreen = requestFullScreen;
