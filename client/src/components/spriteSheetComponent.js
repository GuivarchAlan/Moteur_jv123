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
exports.SpriteSheetComponent = void 0;
var resources_1 = require("../resources");
var textureComponent_1 = require("./textureComponent");
var SpriteSheetComponent = /** @class */ (function (_super) {
    __extends(SpriteSheetComponent, _super);
    function SpriteSheetComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ## Méthode *create*
    SpriteSheetComponent.prototype.create = function (descr) {
        // On charge l'image et les shaders
        _super.prototype.create.call(this, descr);
        // On charge ensuite le fichier de description de l'image,
        // qui contient l'emplacement et les dimensions des sprites
        // contenues sur la feuille.
        var content = resources_1.Resources.load(descr.description);
        var rawDescription = JSON.parse(content);
        this.parseDescription(rawDescription);
    };
    // ## Méthode *parseDescription*
    // Cette méthode extrait la description de la feuille de sprite.
    SpriteSheetComponent.prototype.parseDescription = function (rawDescription) {
        this.sprites = rawDescription.frames;
        for (var k in rawDescription.frames) {
            if (!rawDescription.frames.hasOwnProperty(k)) {
                continue;
            }
            var v = rawDescription.frames[k];
            v.uv = this.normalizeUV(v.frame, rawDescription.meta.size);
        }
    };
    // ## Fonction *normalizeUV*
    // La fonction *normalizeUV* retourne la position relative, entre
    // 0 et 1, des rectangles comportant les sprites de la feuille.
    SpriteSheetComponent.prototype.normalizeUV = function (frame, size) {
        return {
            x: frame.x / size.w,
            y: frame.y / size.h,
            // tslint:disable-next-line:object-literal-sort-keys
            w: frame.w / size.w,
            h: frame.h / size.h
        };
    };
    return SpriteSheetComponent;
}(textureComponent_1.TextureComponent));
exports.SpriteSheetComponent = SpriteSheetComponent;
