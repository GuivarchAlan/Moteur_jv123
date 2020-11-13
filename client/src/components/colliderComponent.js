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
exports.ColliderComponent = void 0;
var component_1 = require("./component");
var rectangle_1 = require("./rectangle");
var ColliderComponent = /** @class */ (function (_super) {
    __extends(ColliderComponent, _super);
    function ColliderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ## Méthode *create*
    // Cette méthode est appelée pour configurer le composant avant
    // que tous les composants d'un objet aient été créés.
    ColliderComponent.prototype.create = function (descr) {
        this.flag = descr.flag;
        this.mask = descr.mask;
        this.size = descr.size;
    };
    // ## Méthode *setup*
    // Si un type *handler* est défini, on y appellera une méthode
    // *onCollision* si une collision est détectée sur cet objet.
    ColliderComponent.prototype.setup = function (descr) {
        if (descr.handler) {
            this.handler = this.owner.getComponent(descr.handler);
        }
    };
    Object.defineProperty(ColliderComponent.prototype, "area", {
        // ## Propriété *area*
        // Cette fonction calcule l'aire courante de la zone de
        // collision, après avoir tenu compte des transformations
        // effectuées sur les objets parent.
        get: function () {
            var position = this.owner.getComponent("Position").worldPosition;
            return new rectangle_1.Rectangle({
                x: position[0],
                y: position[1],
                // tslint:disable-next-line:object-literal-sort-keys
                width: this.size.w,
                height: this.size.h
            });
        },
        enumerable: false,
        configurable: true
    });
    return ColliderComponent;
}(component_1.Component));
exports.ColliderComponent = ColliderComponent;
