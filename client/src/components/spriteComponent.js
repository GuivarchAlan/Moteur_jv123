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
exports.SpriteComponent = void 0;
var GraphicsAPI = require("../graphicsAPI");
var component_1 = require("./component");
var textureComponent_1 = require("./textureComponent");
var GL;
var SpriteComponent = /** @class */ (function (_super) {
    __extends(SpriteComponent, _super);
    function SpriteComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.animationEndedEvent = [];
        return _this;
    }
    // ## Méthode *create*
    // Cette méthode est appelée pour configurer le composant avant
    // que tous les composants d'un objet aient été créés.
    SpriteComponent.prototype.create = function (descr) {
        var ref;
        this.spriteName = descr.spriteName || "(unknown)";
        // tslint:disable:no-conditional-assignment
        this.isAnimated = (ref = descr.isAnimated) !== undefined ? ref : false;
        this.frameSkip = (ref = descr.frameSkip) !== undefined ? ref : 1;
        this.animWait = (ref = descr.animWait) !== undefined ? ref : 0;
        // tslint:enable:no-conditional-assignment
        this.animationFrame = 1;
        this.animWaitCounter = this.animWait;
    };
    // ## Méthode *setup*
    SpriteComponent.prototype.setup = function (descr) {
        GL = GraphicsAPI.context;
        // On récupère ici la feuille de sprite correspondant à ce composant.
        this.spriteSheet = component_1.Component.findComponent(descr.spriteSheet);
        // On crée ici un tableau de 4 vertices permettant de représenter
        // le rectangle à afficher.
        this.vertexBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
        this.vertices = new Float32Array(4 * textureComponent_1.TextureComponent.vertexSize);
        GL.bufferData(GL.ARRAY_BUFFER, this.vertices, GL.DYNAMIC_DRAW);
        // On crée ici un tableau de 6 indices, soit 2 triangles, pour
        // représenter quels vertices participent à chaque triangle:
        // ```
        // 0    1
        // +----+
        // |\   |
        // | \  |
        // |  \ |
        // |   \|
        // +----+
        // 3    2
        // ```
        this.indexBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        var indices = new Uint16Array([0, 1, 2, 2, 3, 0]);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, indices, GL.DYNAMIC_DRAW);
        // Et on initialise le contenu des vertices
        this.updateMesh();
    };
    // ## Méthode *update*
    // Cette méthode met à jour l'animation de la sprite, si il
    // y a lieu, et met à jour le contenu des vertices afin de tenir
    // compte des changements de position et autres.
    SpriteComponent.prototype.update = function (timing) {
        if (this.isAnimated) {
            if (this.animWaitCounter > 0) {
                this.animWaitCounter--;
            }
            else if ((timing.frame % this.frameSkip) === 0) {
                this.updateMesh();
            }
        }
        this.updateComponents(this.descr);
    };
    // ## Méthode *display*
    // La méthode *display* choisit le shader et la texture appropriée
    // via la méthode *bind* de la feuille de sprite, sélectionne le
    // tableau de vertices et d'indices et fait l'appel de rendu.
    SpriteComponent.prototype.display = function () {
        GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.spriteSheet.bind();
        GL.drawElements(GL.TRIANGLES, 6, GL.UNSIGNED_SHORT, 0);
        this.spriteSheet.unbind();
    };
    // ## Méthode *updateMesh*
    // Cette méthode met à jour les informations relatives à la sprite
    // à afficher.
    SpriteComponent.prototype.updateMesh = function () {
        var spriteName = this.isAnimated ? this.findNextFrameName() : this.spriteName;
        if (!this.spriteSheet.sprites[spriteName]) {
            console.error(spriteName, this.spriteName, this.owner);
            return;
        }
        this.descr = this.spriteSheet.sprites[spriteName];
        this.spriteSize = this.descr.sourceSize;
    };
    // ## Fonction *findNextFrameName*
    // La fonction *findNextFrameName* détermine le nom de la sprite
    // à afficher dans une animation, et déclenche des événements
    // enregistrés si on atteint la fin de l'animation.
    SpriteComponent.prototype.findNextFrameName = function () {
        var animationSprite = "" + this.spriteName + this.animationFrame;
        if (this.spriteSheet.sprites[animationSprite]) {
            this.animationFrame++;
            return animationSprite;
        }
        if (this.animationFrame === 1) {
            return this.spriteName;
        }
        else {
            this.animationFrame = 1;
            this.animWaitCounter = this.animWait;
            for (var _i = 0, _a = this.animationEndedEvent; _i < _a.length; _i++) {
                var e = _a[_i];
                e();
            }
            return this.findNextFrameName();
        }
    };
    // ## Méthode *updateComponents*
    // Cette méthode met à jour le contenu de chaque vertex, soient
    // leurs position et les coordonnées de texture, en tenant compte
    // des transformations et de la sprite courante.
    SpriteComponent.prototype.updateComponents = function (descr) {
        var position = this.owner.getComponent("Position").worldPosition;
        var z = position[2];
        var xMin = position[0];
        var xMax = xMin + descr.frame.w;
        var yMax = position[1];
        var yMin = yMax - descr.frame.h;
        var uMin = descr.uv.x;
        var uMax = uMin + descr.uv.w;
        var vMin = descr.uv.y;
        var vMax = vMin + descr.uv.h;
        var v = [
            xMin, yMin, z, uMin, vMin,
            xMax, yMin, z, uMax, vMin,
            xMax, yMax, z, uMax, vMax,
            xMin, yMax, z, uMin, vMax,
        ];
        var offset = 0;
        this.vertices.set(v, offset);
        GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
        GL.bufferSubData(GL.ARRAY_BUFFER, offset, this.vertices);
    };
    return SpriteComponent;
}(component_1.Component));
exports.SpriteComponent = SpriteComponent;
