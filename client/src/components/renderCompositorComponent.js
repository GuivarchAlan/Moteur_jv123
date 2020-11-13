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
exports.RenderCompositorComponent = void 0;
var GraphicsAPI = require("../graphicsAPI");
var compositorComponent_1 = require("./compositorComponent");
var GL;
// # Classe *RenderCompositorComponent*
// Ce compositeur affiche la texture à l'écran. Il devrait être le dernier
// de la liste.
var RenderCompositorComponent = /** @class */ (function (_super) {
    __extends(RenderCompositorComponent, _super);
    function RenderCompositorComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ## Méthode *setup*
    // Charge les shaders et configure le composant
    RenderCompositorComponent.prototype.setup = function (descr) {
        GL = GraphicsAPI.context;
        _super.prototype.setup.call(this, descr);
        this.positionAttrib = GL.getAttribLocation(this.shader, "aPosition");
        this.uSampler = GL.getUniformLocation(this.shader, "uSampler");
        var verts = [1, 1, -1, 1, -1, -1, -1, -1, 1, -1, 1, 1];
        this.screenQuad = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.screenQuad);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(verts), GL.STATIC_DRAW);
        this.itemSize = 2;
        this.numItems = 6;
    };
    // ## Méthode *compose*
    // Cette méthode est appelée afin d'effectuer le rendu final.
    RenderCompositorComponent.prototype.compose = function (texture) {
        GL.bindFramebuffer(GL.FRAMEBUFFER, null);
        // tslint:disable-next-line:no-bitwise
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
        GL.useProgram(this.shader);
        GL.bindBuffer(GL.ARRAY_BUFFER, this.screenQuad);
        GL.enableVertexAttribArray(this.positionAttrib);
        GL.vertexAttribPointer(this.positionAttrib, this.itemSize, GL.FLOAT, false, 0, 0);
        GL.activeTexture(GL.TEXTURE0);
        GL.bindTexture(GL.TEXTURE_2D, texture);
        GL.uniform1i(this.uSampler, 0);
        GL.drawArrays(GL.TRIANGLES, 0, this.numItems);
        GL.disableVertexAttribArray(this.positionAttrib);
        // On ne s'en sert plus après ça
        return texture;
    };
    return RenderCompositorComponent;
}(compositorComponent_1.CompositorComponent));
exports.RenderCompositorComponent = RenderCompositorComponent;
