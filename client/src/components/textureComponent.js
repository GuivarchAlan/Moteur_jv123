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
exports.TextureComponent = void 0;
var gl_matrix_1 = require("gl-matrix");
var GraphicsAPI = require("../graphicsAPI");
var resources_1 = require("../resources");
var cameraComponent_1 = require("./cameraComponent");
var component_1 = require("./component");
var GL;
var TextureComponent = /** @class */ (function (_super) {
    __extends(TextureComponent, _super);
    function TextureComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ## Méthode *create*
    TextureComponent.prototype.create = function (descr) {
        GL = GraphicsAPI.context;
        this.image = resources_1.Resources.load(descr.texture);
        // On crée une texture WebGL à partir de l'image chargée
        this.texture = GL.createTexture();
        GL.bindTexture(GL.TEXTURE_2D, this.texture);
        GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, this.image);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
        GL.bindTexture(GL.TEXTURE_2D, null);
        // On charge ensuite les shaders
        var vs = this.compileShader(resources_1.Resources.load(descr.vertexShader), GL.VERTEX_SHADER);
        var fs = this.compileShader(resources_1.Resources.load(descr.fragmentShader), GL.FRAGMENT_SHADER);
        // On attache les deux shaders ensemble
        this.shader = GL.createProgram();
        GL.attachShader(this.shader, vs);
        GL.attachShader(this.shader, fs);
        GL.linkProgram(this.shader);
        if (!GL.getProgramParameter(this.shader, GL.LINK_STATUS)) {
            alert("Initialisation du shader \u00E9chou\u00E9e:  " + GL.getProgramInfoLog(this.shader));
        }
        GL.useProgram(this.shader);
        // On récupère des références vers les paramètres configurables des shaders
        this.vertexPositionAttrib = GL.getAttribLocation(this.shader, "aVertexPosition");
        this.textureCoordAttrib = GL.getAttribLocation(this.shader, "aTextureCoord");
        this.pUniform = GL.getUniformLocation(this.shader, "uPMatrix");
        this.mvUniform = GL.getUniformLocation(this.shader, "uMVMatrix");
        this.uSampler = GL.getUniformLocation(this.shader, "uSampler");
    };
    // ## Méthode *bind*
    // La méthode *bind* choisit le shader et y assigne les
    // bonnes valeurs.
    TextureComponent.prototype.bind = function () {
        // On commence par choisir le shader à utiliser
        GL.useProgram(this.shader);
        // On indique au vertex shader la position des paramètres
        // dans le tableau de mémoire (vertex buffer object).
        var stride = TextureComponent.vertexSize * TextureComponent.floatSize;
        GL.enableVertexAttribArray(this.vertexPositionAttrib);
        GL.enableVertexAttribArray(this.textureCoordAttrib);
        GL.vertexAttribPointer(this.vertexPositionAttrib, 3, GL.FLOAT, false, stride, 0);
        GL.vertexAttribPointer(this.textureCoordAttrib, 2, GL.FLOAT, false, stride, 3 * TextureComponent.floatSize);
        // On configure les matrices de transformation
        GL.uniformMatrix4fv(this.pUniform, false, cameraComponent_1.CameraComponent.current.projection);
        var identity = gl_matrix_1.mat4.create();
        GL.uniformMatrix4fv(this.mvUniform, false, identity);
        // On assigne la texture à utiliser pour le fragment shader
        GL.activeTexture(GL.TEXTURE0);
        GL.bindTexture(GL.TEXTURE_2D, this.texture);
        GL.uniform1i(this.uSampler, 0);
        // On active la semi-transparence
        GL.enable(GL.BLEND);
        GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
    };
    // ## Méthode *unbind*
    // Nettoie les paramètres WebGL
    TextureComponent.prototype.unbind = function () {
        GL.disableVertexAttribArray(this.vertexPositionAttrib);
        GL.disableVertexAttribArray(this.textureCoordAttrib);
    };
    // ## Fonction *compileShader*
    // Cette fonction permet de créer un shader du type approprié
    // (vertex ou fragment) à partir de son code GLSL.
    TextureComponent.prototype.compileShader = function (source, type) {
        var shader = GL.createShader(type);
        GL.shaderSource(shader, source);
        GL.compileShader(shader);
        if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
            alert("Erreur en compilant le shader: " + GL.getShaderInfoLog(shader));
            throw new Error();
        }
        return shader;
    };
    // ## Constante *vertexSize*
    // Cette constante représente le nombre d'éléments d'un vertex,
    // soit 3 valeurs pour la position, et 2 pour la texture
    TextureComponent.vertexSize = 3 + 2; // position(3d), texture(2d)
    // ## Constante *floatSize*
    // Cette constante représente le nombre d'octets dans une valeur
    // flottante. On s'en sert pour calculer la position des éléments
    // de vertex dans des tableaux de mémoire bruts.
    TextureComponent.floatSize = 4; // 32 bits
    return TextureComponent;
}(component_1.Component));
exports.TextureComponent = TextureComponent;
