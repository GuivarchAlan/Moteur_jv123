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
exports.BackgroundLoaderComponent = void 0;
var resources_1 = require("../resources");
var scene_1 = require("../scene");
var component_1 = require("./component");
var BackgroundLoaderComponent = /** @class */ (function (_super) {
    __extends(BackgroundLoaderComponent, _super);
    function BackgroundLoaderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ## Méthode *create*
    // Cette méthode est appelée pour configurer le composant avant
    // que tous les composants d'un objet aient été créés.
    BackgroundLoaderComponent.prototype.create = function (descr) {
        this.entryMap = descr.entryMap;
        this.scale = descr.scale;
    };
    // ## Méthode *setup*
    // Cette méthode est responsable d'instancier les différents
    // objets contenant des sprites.
    BackgroundLoaderComponent.prototype.setup = function (descr) {
        var spriteSheet = component_1.Component.findComponent(descr.spriteSheet);
        var content = resources_1.Resources.load(descr.description);
        var lines = content.split(/\r?\n/);
        for (var row = 0; row < lines.length; ++row) {
            var chars = lines[row].split("");
            for (var col = 0; col < chars.length; ++col) {
                var char = chars[col];
                var entry = this.entryMap[char];
                if (!entry) {
                    continue;
                }
                scene_1.Scene.current.createChild({
                    components: {
                        Position: {
                            x: col * this.scale,
                            y: row * this.scale,
                            z: row * 0.01
                        },
                        Sprite: {
                            frameSkip: entry.frameSkip,
                            isAnimated: entry.isAnimated,
                            spriteName: entry.spriteName,
                            spriteSheet: spriteSheet
                        }
                    }
                }, col + "-" + row, this.owner);
            }
        }
    };
    return BackgroundLoaderComponent;
}(component_1.Component));
exports.BackgroundLoaderComponent = BackgroundLoaderComponent;
