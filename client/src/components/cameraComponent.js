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
exports.CameraComponent = void 0;
var gl_matrix_1 = require("gl-matrix");
var GraphicsAPI = require("../graphicsAPI");
var component_1 = require("./component");
var GL;
var CameraComponent = /** @class */ (function (_super) {
    __extends(CameraComponent, _super);
    function CameraComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.compositors = [];
        return _this;
    }
    // ## Méthode *create*
    // Cette méthode est appelée pour configurer le composant avant
    // que tous les composants d'un objet aient été créés. On y
    // configure globalement le tests de profondeur, la couleur de
    // l'arrière-plan et la zone de rendu.
    CameraComponent.prototype.create = function (descr) {
        GL = GraphicsAPI.context;
        CameraComponent.current = this;
        this.clearColor = descr.color;
        this.viewHeight = descr.height;
        this.near = descr.near;
        this.far = descr.far;
        var canvas = this.canvas = GraphicsAPI.canvas;
        GL.disable(GL.DEPTH_TEST);
        GL.depthFunc(GL.LEQUAL);
        GL.clearColor(this.clearColor.r, this.clearColor.g, this.clearColor.b, this.clearColor.a);
        GL.viewport(0, 0, canvas.width, canvas.height);
        this.rttFrameBuffer = GL.createFramebuffer();
        GL.bindFramebuffer(GL.FRAMEBUFFER, this.rttFrameBuffer);
        this.renderTexture = GL.createTexture();
        GL.bindTexture(GL.TEXTURE_2D, this.renderTexture);
        GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, canvas.width, canvas.height, 0, GL.RGBA, GL.UNSIGNED_BYTE, null);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
        this.renderBuffer = GL.createRenderbuffer();
        GL.bindRenderbuffer(GL.RENDERBUFFER, this.renderBuffer);
        GL.renderbufferStorage(GL.RENDERBUFFER, GL.DEPTH_COMPONENT16, canvas.width, canvas.height);
        GL.framebufferTexture2D(GL.FRAMEBUFFER, GL.COLOR_ATTACHMENT0, GL.TEXTURE_2D, this.renderTexture, 0);
        GL.framebufferRenderbuffer(GL.FRAMEBUFFER, GL.DEPTH_ATTACHMENT, GL.RENDERBUFFER, this.renderBuffer);
        // tslint:disable-next-line:no-bitwise
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
        GL.bindTexture(GL.TEXTURE_2D, null);
        GL.bindRenderbuffer(GL.RENDERBUFFER, null);
        GL.bindFramebuffer(GL.FRAMEBUFFER, null);
    };
    // ## Méthode *setup*
    // La méthode *setup* récupère les compositeurs spécifiés pour
    // la caméra.
    CameraComponent.prototype.setup = function (descr) {
        for (var _i = 0, _a = descr.compositors; _i < _a.length; _i++) {
            var comp = _a[_i];
            var compositor = component_1.Component.findComponent(comp);
            if (compositor) {
                this.compositors.push(compositor);
            }
        }
    };
    // ## Méthode *render*
    // La méthode *render* est appelée une fois par itération de
    // la boucle de jeu. La caméra courante est conservée, et on
    // efface la zone de rendu. La zone de rendu sera à nouveau
    // remplie par les appels aux méthodes *display* des autres
    // composants.
    CameraComponent.prototype.render = function () {
        CameraComponent.current = this;
        var rt = this.renderTexture;
        for (var _i = 0, _a = this.compositors; _i < _a.length; _i++) {
            var comp = _a[_i];
            if (comp.enabled) {
                rt = comp.compose(rt);
            }
        }
        GL.bindFramebuffer(GL.FRAMEBUFFER, this.rttFrameBuffer);
        // tslint:disable-next-line:no-bitwise
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
    };
    Object.defineProperty(CameraComponent.prototype, "projection", {
        // ## Accesseur *projection*
        // Cet accesseur retourne la matrice de projection de la caméra.
        // Elle est utilisée pour configurer le shader par le composant
        // SpriteSheetComponent.
        get: function () {
            var ratio = this.canvas.width / this.canvas.height;
            var viewWidth = ratio * this.viewHeight;
            var position = this.owner.getComponent("Position").worldPosition;
            var ortho = gl_matrix_1.mat4.create();
            return gl_matrix_1.mat4.ortho(ortho, position[0] - viewWidth, position[0] + viewWidth, -position[1] + this.viewHeight, -position[1] - this.viewHeight, position[2] + this.near, position[2] + this.far);
        },
        enumerable: false,
        configurable: true
    });
    // ## Propriété statique *current*
    // Pour simplifier l'exercice, la caméra courante est stockée
    // dans ce champ. Elle est utilisée par le composant SpriteSheetComponent
    CameraComponent.current = null;
    return CameraComponent;
}(component_1.Component));
exports.CameraComponent = CameraComponent;
