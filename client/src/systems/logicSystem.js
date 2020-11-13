"use strict";
exports.__esModule = true;
exports.LogicSystem = void 0;
var scene_1 = require("../scene");
var timing_1 = require("../timing");
// # Fonction *isLogicComponent*
// Vérifie si le composant est du type `ILogicComponent``
// Voir [la documentation de TypeScript](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards)
function isLogicComponent(arg) {
    return arg.update !== undefined;
}
// # Classe *LogicSystem*
// Représente le système permettant de mettre à jour la logique
var LogicSystem = /** @class */ (function () {
    function LogicSystem() {
        this.frameCount = 0;
    }
    // Méthode *iterate*
    // Appelée à chaque tour de la boucle de jeu
    LogicSystem.prototype.iterate = function (dT) {
        var timing = new timing_1.Timing(dT, this.frameCount++);
        for (var _i = 0, _a = scene_1.Scene.current.entities(); _i < _a.length; _i++) {
            var e = _a[_i];
            for (var _b = 0, _c = e.components; _b < _c.length; _b++) {
                var comp = _c[_b];
                if (isLogicComponent(comp) && comp.enabled) {
                    comp.update(timing);
                }
            }
        }
    };
    return LogicSystem;
}());
exports.LogicSystem = LogicSystem;
