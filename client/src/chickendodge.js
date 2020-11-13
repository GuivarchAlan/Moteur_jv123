"use strict";
exports.__esModule = true;
exports.init = exports.preload = void 0;
var main_1 = require("./main");
var resources_1 = require("./resources");
function preload() {
    return resources_1.Resources.init("data/resources.json");
}
exports.preload = preload;
function init() {
    var equipe = resources_1.Resources.load("equipe.txt");
    console.log(equipe);
    if (equipe === "Coéquipiers") {
        alert("N'oubliez pas d'inscrire les membres de votre équipe dans le fichier client/data/equipe.txt!");
    }
    var config = {
        canvasId: "canvas",
        launchScene: "scenes/play.json"
    };
    return main_1.run(config);
}
exports.init = init;
