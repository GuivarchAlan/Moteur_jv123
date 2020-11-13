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
exports.DebugDrawCallsComponent = void 0;
var GraphicsAPI = require("../graphicsAPI");
var component_1 = require("./component");
var GL;
var origDrawElements;
var value = 0;
// ## Méthode *countDrawCalls*
// Cette méthode est appelée à la place de *drawElements*
// de l'API WebGL. Puisqu'on utilise une manière détournée
// d'atteindre cette méthode, le pointeur *this*
// correspond au contexte WebGL. On incrémente donc le
// compteur d'appels de rendu, et on appelle ensuite
// la méthode d'origine.
function countDrawCalls(mode, count, type, offset) {
    value++;
    origDrawElements.apply(GL, [mode, count, type, offset]);
}
var DebugDrawCallsComponent = /** @class */ (function (_super) {
    __extends(DebugDrawCallsComponent, _super);
    function DebugDrawCallsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ## Méthode *create*
    // On substitue ici la méthode *drawElements* de l'API
    // WebGL par une fonction locale.
    DebugDrawCallsComponent.prototype.create = function () {
        GL = GraphicsAPI.context;
        origDrawElements = GL.drawElements;
        GL.drawElements = countDrawCalls;
    };
    // ## Méthode *setup*
    // On conserve la référence vers l'élément HTML dans
    // lequel on écrira le nombre d'appels de rendu.
    DebugDrawCallsComponent.prototype.setup = function (descr) {
        this.target = document.getElementById(descr.field);
    };
    // ## Méthode *update*
    // On affiche le nombre d'appels de rendu exécuté à
    // la dernière itération et on remet le compteur à zéro.
    DebugDrawCallsComponent.prototype.update = function () {
        this.target.innerHTML = value.toString();
        value = 0;
    };
    return DebugDrawCallsComponent;
}(component_1.Component));
exports.DebugDrawCallsComponent = DebugDrawCallsComponent;
