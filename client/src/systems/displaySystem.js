"use strict";
exports.__esModule = true;
exports.DisplaySystem = void 0;
var GraphicsAPI = require("../graphicsAPI");
var scene_1 = require("../scene");
// # Fonction *isDisplayComponent*
// Vérifie si le composant est du type `IDisplayComponent``
// Voir [la documentation de TypeScript](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards)
function isDisplayComponent(arg) {
    return arg.display !== undefined;
}
// # Fonction *isCameraComponent*
// Vérifie si le composant est du type `ICameraComponent``
// Voir [la documentation de TypeScript](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards)
function isCameraComponent(arg) {
    return arg.render !== undefined;
}
// # Classe *DisplaySystem*
// Représente le système permettant de gérer l'affichage
var DisplaySystem = /** @class */ (function () {
    // ## Constructeur
    // Initialise l'API graphique.
    function DisplaySystem(canvasId) {
        GraphicsAPI.init(canvasId);
    }
    // Méthode *iterate*
    // Appelée à chaque tour de la boucle de jeu
    DisplaySystem.prototype.iterate = function (dT) {
        var displayComp = [];
        var cameraComp = [];
        for (var _i = 0, _a = scene_1.Scene.current.entities(); _i < _a.length; _i++) {
            var e = _a[_i];
            for (var _b = 0, _c = e.components; _b < _c.length; _b++) {
                var comp = _c[_b];
                if (isDisplayComponent(comp) && comp.enabled) {
                    displayComp.push(comp);
                }
                if (isCameraComponent(comp) && comp.enabled) {
                    cameraComp.push(comp);
                }
            }
        }
        for (var _d = 0, displayComp_1 = displayComp; _d < displayComp_1.length; _d++) {
            var c = displayComp_1[_d];
            c.display(dT);
        }
        for (var _e = 0, cameraComp_1 = cameraComp; _e < cameraComp_1.length; _e++) {
            var c = cameraComp_1[_e];
            c.render(dT);
        }
    };
    return DisplaySystem;
}());
exports.DisplaySystem = DisplaySystem;
