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
exports.TextSpriteComponent = void 0;
var scene_1 = require("../scene");
var component_1 = require("./component");
// # Classe *TextSpriteComponent*
var TextAlign;
(function (TextAlign) {
    TextAlign["Left"] = "left";
    TextAlign["Right"] = "right";
})(TextAlign || (TextAlign = {}));
var TextSpriteComponent = /** @class */ (function (_super) {
    __extends(TextSpriteComponent, _super);
    function TextSpriteComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprites = [];
        _this._text = [];
        return _this;
    }
    // ## Méthode *create*
    // Cette méthode est appelée pour configurer le composant avant
    // que tous les composants d'un objet aient été créés.
    TextSpriteComponent.prototype.create = function (descr) {
        this.align = descr.align;
    };
    // ## Méthode *setup*
    // Cette méthode conserve la feuille de sprite comportant
    // les glyphes du texte, et met le texte à jour.
    TextSpriteComponent.prototype.setup = function (descr) {
        this.spriteSheet = component_1.Component.findComponent(descr.spriteSheet);
        return this.updateTextSprites();
    };
    Object.defineProperty(TextSpriteComponent.prototype, "text", {
        // ## Propriété *text*
        // Cette propriété met à jour le texte affiché. On force tout
        // d'abord le paramètre à un type de chaîne de caractères,
        // et on ne met à jour que si le texte a changé.
        set: function (text) {
            this.array = String(text).split("");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextSpriteComponent.prototype, "array", {
        // ## Propriété *array*
        // Cette propriété met à jour le texte affiché, à partir d'un
        // tableau d'identifiants de sprites.
        set: function (array) {
            var changed = array.length !== this._text.length;
            if (!changed) {
                for (var i = 0; i < array.length; ++i) {
                    if (array[i] !== this._text[i]) {
                        changed = true;
                    }
                }
            }
            if (!changed) {
                return;
            }
            this._text = array;
            this.updateTextSprites();
        },
        enumerable: false,
        configurable: true
    });
    // ## Méthode *updateTextSprites*
    // On crée de nouvelles sprites pour chaque caractère de la
    // chaîne, on les positionne correctement, et on détruit les
    // anciens sprites.
    TextSpriteComponent.prototype.updateTextSprites = function () {
        var _this = this;
        var oldSprites = this.sprites;
        this.sprites = [];
        var offset = 0;
        var dir = (this.align === TextAlign.Left) ? 1 : -1;
        var text = this._text.slice();
        if (this.align === TextAlign.Right) {
            text = text.reverse();
        }
        text.forEach(function (c, index) {
            if (!_this.spriteSheet.sprites[c]) {
                return;
            }
            var x = offset;
            offset += _this.spriteSheet.sprites[c].sourceSize.w * dir;
            var template = {
                components: {
                    Position: {
                        x: x
                    },
                    Sprite: {
                        isAnimated: false,
                        spriteName: c,
                        spriteSheet: _this.spriteSheet
                    }
                }
            };
            var newSpriteObj = scene_1.Scene.current.createChild(template, _this._text + "_" + index, _this.owner);
            _this.sprites.push(newSpriteObj);
        });
        for (var _i = 0, oldSprites_1 = oldSprites; _i < oldSprites_1.length; _i++) {
            var s = oldSprites_1[_i];
            s.parent.removeChild(s);
        }
    };
    return TextSpriteComponent;
}(component_1.Component));
exports.TextSpriteComponent = TextSpriteComponent;
