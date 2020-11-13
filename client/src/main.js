"use strict";
exports.__esModule = true;
exports.run = exports.GlobalConfig = void 0;
var resources_1 = require("./resources");
var scene_1 = require("./scene");
var displaySystem_1 = require("./systems/displaySystem");
var logicSystem_1 = require("./systems/logicSystem");
var physicSystem_1 = require("./systems/physicSystem");
var utils_1 = require("./utils");
// ## Variable *systems*
// Représente la liste des systèmes utilisés par notre moteur
var systems;
// ## Méthode *run*
// Cette méthode initialise les différents systèmes nécessaires
// et démarre l'exécution complète du jeu.
function run(config) {
    exports.GlobalConfig = config;
    setupSystem(config);
    return launchGame(config);
}
exports.run = run;
function loadScene(file) {
    var content = resources_1.Resources.load(file);
    var sceneDescription = JSON.parse(content);
    return scene_1.Scene.create(sceneDescription);
}
// ## Méthode *launchGame*
// Cette méthode initialise la scène du jeu et lance la
// boucle de jeu.
function launchGame(config) {
    loadScene(config.launchScene);
    var lastTime;
    function iterate(time) {
        if (lastTime === undefined) {
            lastTime = time;
        }
        // Le temps est compté en millisecondes, on désire
        // l'avoir en secondes, sans avoir de valeurs trop énorme.
        var delta = utils_1.clamp((time - lastTime) / 1000, 0, 0.1);
        // Limiter le taux de rafraîchissement à 30 FPS
        if (delta > (1.0 / 30.0)) {
            lastTime = time;
            for (var _i = 0, systems_1 = systems; _i < systems_1.length; _i++) {
                var system = systems_1[_i];
                system.iterate(delta);
            }
        }
        window.requestAnimationFrame(iterate);
    }
    window.requestAnimationFrame(iterate);
}
// ## Méthode *setupSystem*
// Cette méthode initialise les différents systèmes nécessaires.
function setupSystem(config) {
    var physic = new physicSystem_1.PhysicSystem();
    var logic = new logicSystem_1.LogicSystem();
    var display = new displaySystem_1.DisplaySystem(config.canvasId);
    systems = [physic, logic, display];
}
