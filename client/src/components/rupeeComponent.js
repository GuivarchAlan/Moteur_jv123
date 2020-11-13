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
exports.RupeeComponent = void 0;
var component_1 = require("./component");
var RupeeComponent = /** @class */ (function (_super) {
    __extends(RupeeComponent, _super);
    function RupeeComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RupeeComponent.prototype, "value", {
        // ## Propriété *value*
        // Cette propriété retourne la valeur numérique correspondant
        // au rubis.
        get: function () {
            return this.values[this.type];
        },
        enumerable: false,
        configurable: true
    });
    // ## Méthode *create*
    // Cette méthode est appelée pour configurer le composant avant
    // que tous les composants d'un objet aient été créés.
    RupeeComponent.prototype.create = function (descr) {
        this.values = descr.values;
        this.lifetime = descr.lifetime;
    };
    // ## Méthode *setup*
    // Cette méthode choisit une valeur aléatoire pour le rubis, et
    // détermine la sprite correspondante.
    RupeeComponent.prototype.setup = function () {
        var types = Object.keys(this.values);
        var count = types.length;
        this.type = types[Math.floor(Math.random() * count)];
        var sprite = this.owner.getComponent("Sprite");
        sprite.spriteName = this.type;
        this.start = (new Date()).getTime();
    };
    // ## Méthode *update*
    // La méthode *update* de chaque composant est appelée une fois
    // par itération de la boucle de jeu.
    RupeeComponent.prototype.update = function (timing) {
        var elapsed = timing.now.getTime() - this.start;
        if (elapsed > this.lifetime) {
            this.owner.active = false;
            this.owner.parent.removeChild(this.owner);
        }
    };
    return RupeeComponent;
}(component_1.Component));
exports.RupeeComponent = RupeeComponent;
