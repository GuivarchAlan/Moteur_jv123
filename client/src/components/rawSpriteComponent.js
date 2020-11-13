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
exports.RawSpriteComponent = void 0;
var GraphicsAPI = require("../graphicsAPI");
var textureComponent_1 = require("./textureComponent");
var GL;
var RawSpriteComponent = /** @class */ (function (_super) {
    __extends(RawSpriteComponent, _super);
    function RawSpriteComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ## Méthode *create*
    RawSpriteComponent.prototype.create = function (descr) {
        GL = GraphicsAPI.context;
        // On charge l'image et les shaders
        _super.prototype.create.call(this, descr);
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
        this.updateComponents(descr);
    };
    // ## Méthode *display*
    // La méthode *display* choisit le shader et la texture appropriée
    // via la méthode *bind* sélectionne le tableau de vertices et
    // d'indices et fait l'appel de rendu.
    RawSpriteComponent.prototype.display = function () {
        GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.bind();
        GL.drawElements(GL.TRIANGLES, 6, GL.UNSIGNED_SHORT, 0);
        this.unbind();
    };
    // ## Méthode *updateComponents*
    // Cette méthode met à jour le contenu de chaque vertex.
    RawSpriteComponent.prototype.updateComponents = function (descr) {
        var ref;
        var position = this.owner.getComponent("Position").worldPosition;
        // tslint:disable:no-conditional-assignment
        var width = (ref = descr.width) !== undefined ? ref : this.image.width;
        var height = (ref = descr.height) !== undefined ? ref : this.image.height;
        // tslint:enable:no-conditional-assignment
        if (descr.scale) {
            width *= descr.scale;
            height *= descr.scale;
        }
        var z = position[2];
        var xMin = position[0] - width / 2;
        var xMax = xMin + width;
        var yMax = position[1] - height / 2;
        var yMin = yMax - height;
        var v = [
            xMin, yMin, z, 0, 0,
            xMax, yMin, z, 1, 0,
            xMax, yMax, z, 1, 1,
            xMin, yMax, z, 0, 1,
        ];
        this.vertices.set(v);
        GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
        GL.bufferSubData(GL.ARRAY_BUFFER, 0, this.vertices);
    };
    return RawSpriteComponent;
}(textureComponent_1.TextureComponent));
exports.RawSpriteComponent = RawSpriteComponent;
