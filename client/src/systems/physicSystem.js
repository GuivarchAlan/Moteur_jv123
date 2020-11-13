"use strict";
exports.__esModule = true;
exports.PhysicSystem = void 0;
var colliderComponent_1 = require("../components/colliderComponent");
var scene_1 = require("../scene");
// # Classe *PhysicSystem*
// Représente le système permettant de détecter les collisions
var PhysicSystem = /** @class */ (function () {
    function PhysicSystem() {
    }
    // Méthode *iterate*
    // Appelée à chaque tour de la boucle de jeu
    PhysicSystem.prototype.iterate = function (dT) {
        var colliders = [];
        for (var _i = 0, _a = scene_1.Scene.current.entities(); _i < _a.length; _i++) {
            var e = _a[_i];
            for (var _b = 0, _c = e.components; _b < _c.length; _b++) {
                var comp = _c[_b];
                if (comp instanceof colliderComponent_1.ColliderComponent && comp.enabled) {
                    colliders.push(comp);
                }
            }
        }
        var collisions = [];
        for (var i = 0; i < colliders.length; i++) {
            var c1 = colliders[i];
            if (!c1.enabled || !c1.owner.active) {
                continue;
            }
            for (var j = i + 1; j < colliders.length; j++) {
                var c2 = colliders[j];
                if (!c2.enabled || !c2.owner.active) {
                    continue;
                }
                if (c1.area.intersectsWith(c2.area)) {
                    collisions.push([c1, c2]);
                }
            }
        }
        for (var _d = 0, collisions_1 = collisions; _d < collisions_1.length; _d++) {
            var _e = collisions_1[_d], c1 = _e[0], c2 = _e[1];
            if (c1.handler) {
                c1.handler.onCollision(c2);
            }
            if (c2.handler) {
                c2.handler.onCollision(c1);
            }
        }
    };
    return PhysicSystem;
}());
exports.PhysicSystem = PhysicSystem;
