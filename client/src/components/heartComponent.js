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
exports.HeartComponent = void 0;
var component_1 = require("./component");
var HeartComponent = /** @class */ (function (_super) {
    __extends(HeartComponent, _super);
    function HeartComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ## Méthode *create*
    // Cette méthode est appelée pour configurer le composant avant
    // que tous les composants d'un objet aient été créés.
    HeartComponent.prototype.create = function (descr) {
        this.heal = descr.heal;
        this.lifetime = descr.lifetime;
    };
    // ## Méthode *setup*
    // Cette méthode est appelée pour configurer le composant après
    // que tous les composants d'un objet aient été créés.
    HeartComponent.prototype.setup = function () {
        this.start = (new Date()).getTime();
    };
    // ## Méthode *update*
    // La méthode *update* de chaque composant est appelée une fois
    // par itération de la boucle de jeu.
    HeartComponent.prototype.update = function (timing) {
        var elapsed = timing.now.getTime() - this.start;
        if (elapsed > this.lifetime) {
            this.owner.active = false;
            this.owner.parent.removeChild(this.owner);
        }
    };
    return HeartComponent;
}(component_1.Component));
exports.HeartComponent = HeartComponent;
