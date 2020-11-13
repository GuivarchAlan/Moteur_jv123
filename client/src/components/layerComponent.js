"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.LayerComponent = void 0;
var component_1 = require("./component");
var spriteComponent_1 = require("./spriteComponent");
// # Classe *LayerComponent*
// Ce composant représente un ensemble de sprites qui
// doivent normalement être considérées comme étant sur un
// même plan.
var LayerComponent = /** @class */ (function (_super) {
    __extends(LayerComponent, _super);
    function LayerComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ## Méthode *display*
    // La méthode *display* est appelée une fois par itération
    // de la boucle de jeu.
    LayerComponent.prototype.display = function (dT) {
        var layerSprites = this.listSprites();
        if (layerSprites.length === 0) {
            return;
        }
        var spriteSheet = layerSprites[0].spriteSheet;
    };
    // ## Fonction *listSprites*
    // Cette fonction retourne une liste comportant l'ensemble
    // des sprites de l'objet courant et de ses enfants.
    LayerComponent.prototype.listSprites = function () {
        var sprites = [];
        var queue = [this.owner];
        while (queue.length > 0) {
            var node = queue.shift();
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child.active) {
                    queue.push(child);
                }
            }
            for (var _b = 0, _c = node.components; _b < _c.length; _b++) {
                var comp = _c[_b];
                if (comp instanceof spriteComponent_1.SpriteComponent && comp.enabled) {
                    sprites.push(comp);
                }
            }
        }
        return sprites;
    };
    return LayerComponent;
}(component_1.Component));
exports.LayerComponent = LayerComponent;
