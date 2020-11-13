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
exports.CompositorComponent = void 0;
var GraphicsAPI = require("../graphicsAPI");
var resources_1 = require("../resources");
var component_1 = require("./component");
var GL;
// ## Fonction *compileShader*
// Cette fonction permet de créer un shader du type approprié
// (vertex ou fragment) à partir de son code GLSL.
function compileShader(source, type) {
    var shader = GL.createShader(type);
    GL.shaderSource(shader, source);
    GL.compileShader(shader);
    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
        alert("Erreur en compilant le shader: " + GL.getShaderInfoLog(shader));
        throw new Error();
    }
    return shader;
}
var CompositorComponent = /** @class */ (function (_super) {
    __extends(CompositorComponent, _super);
    function CompositorComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ## Méthode *compose*
    // Cette méthode est appelée afin d'appliquer un effet sur la caméra
    CompositorComponent.prototype.compose = function (texture) {
        return texture;
    };
    // ## Méthode *setup*
    // Charge les shaders et configure le composant
    CompositorComponent.prototype.setup = function (descr) {
        GL = GraphicsAPI.context;
        var vs = compileShader(resources_1.Resources.load(descr.vertexShader), GL.VERTEX_SHADER);
        var fs = compileShader(resources_1.Resources.load(descr.fragmentShader), GL.FRAGMENT_SHADER);
        this.shader = GL.createProgram();
        GL.attachShader(this.shader, vs);
        GL.attachShader(this.shader, fs);
        GL.linkProgram(this.shader);
        if (!GL.getProgramParameter(this.shader, GL.LINK_STATUS)) {
            alert("Initialisation du shader \u00E9chou\u00E9e: " + GL.getProgramInfoLog(this.shader));
        }
        GL.useProgram(this.shader);
    };
    return CompositorComponent;
}(component_1.Component));
exports.CompositorComponent = CompositorComponent;
