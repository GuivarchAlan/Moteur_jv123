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
exports.PositionComponent = void 0;
var gl_matrix_1 = require("gl-matrix");
var component_1 = require("./component");
function isVec3(arg) {
    return arg.buffer !== undefined;
}
var PositionComponent = /** @class */ (function (_super) {
    __extends(PositionComponent, _super);
    function PositionComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ## Méthode *create*
    // Cette méthode est appelée pour configurer le composant avant
    // que tous les composants d'un objet aient été créés. Les valeurs
    // omises prennent la valeur 0 par défaut.
    PositionComponent.prototype.create = function (descr) {
        if (isVec3(descr)) {
            this.local = gl_matrix_1.vec3.clone(descr);
        }
        else {
            this.local = gl_matrix_1.vec3.fromValues(descr.x || 0, descr.y || 0, descr.z || 0);
        }
    };
    Object.defineProperty(PositionComponent.prototype, "worldPosition", {
        // ## Propriété *worldPosition*
        // Cette propriété combine les transformations des parents afin
        // de trouver la position absolue de l'objet dans le monde.
        get: function () {
            var pos = gl_matrix_1.vec3.clone(this.local);
            var parentPosition = this.owner.parent ? this.owner.parent.getComponent("Position") : undefined;
            if (parentPosition) {
                var parentWorld = parentPosition.worldPosition;
                gl_matrix_1.vec3.add(pos, pos, parentWorld);
            }
            return pos;
        },
        enumerable: false,
        configurable: true
    });
    // ## Méthode *translate*
    // Applique une translation sur l'objet.
    PositionComponent.prototype.translate = function (delta) {
        gl_matrix_1.vec3.add(this.local, this.local, delta);
    };
    // ## Méthode *clamp*
    // Cette méthode limite la position de l'objet dans une zone
    // donnée.
    PositionComponent.prototype.clamp = function (xMin, xMax, yMin, yMax, zMin, zMax) {
        if (xMin === void 0) { xMin = Number.MIN_VALUE; }
        if (xMax === void 0) { xMax = Number.MAX_VALUE; }
        if (yMin === void 0) { yMin = Number.MIN_VALUE; }
        if (yMax === void 0) { yMax = Number.MAX_VALUE; }
        if (zMin === void 0) { zMin = Number.MIN_VALUE; }
        if (zMax === void 0) { zMax = Number.MAX_VALUE; }
        if (this.local[0] < xMin) {
            this.local[0] = xMin;
        }
        if (this.local[0] > xMax) {
            this.local[0] = xMax;
        }
        if (this.local[1] < yMin) {
            this.local[1] = yMin;
        }
        if (this.local[1] > yMax) {
            this.local[1] = yMax;
        }
        if (this.local[2] < zMin) {
            this.local[2] = zMin;
        }
        if (this.local[2] > zMax) {
            this.local[2] = zMax;
        }
    };
    return PositionComponent;
}(component_1.Component));
exports.PositionComponent = PositionComponent;
