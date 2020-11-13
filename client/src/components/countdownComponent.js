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
exports.CountdownComponent = void 0;
var eventTrigger_1 = require("../eventTrigger");
var scene_1 = require("../scene");
var component_1 = require("./component");
var CountdownComponent = /** @class */ (function (_super) {
    __extends(CountdownComponent, _super);
    function CountdownComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handler = new eventTrigger_1.EventTrigger();
        _this.sprites = [];
        _this.index = -1;
        return _this;
    }
    // ## Méthode *create*
    // Cette méthode est appelée pour configurer le composant avant
    // que tous les composants d'un objet aient été créés.
    CountdownComponent.prototype.create = function (descr) {
        this.sprites = descr.sprites;
        this.delay = descr.delay;
        this.spriteTemplate = descr.spriteTemplate;
    };
    // ## Méthode *setup*
    // Cette méthode est appelée pour configurer le composant après
    // que tous les composants d'un objet aient été créés.
    CountdownComponent.prototype.setup = function (descr) {
        if (descr.handler) {
            var tokens = descr.handler.split(".");
            this.handler.add(this.owner.getComponent(tokens[0]), tokens[1]);
        }
    };
    // ## Méthode *update*
    // À chaque itération, on vérifie si on a attendu le délai
    // désiré, et on change d'image si c'est le cas.
    CountdownComponent.prototype.update = function (timing) {
        if ((timing.now.getTime() - this.shownTime) < this.delay) {
            return;
        }
        this.index++;
        if (this.current) {
            this.owner.removeChild(this.current);
            delete this.current;
        }
        if (this.index >= this.sprites.length) {
            this.handler.trigger();
            this.enabled = false;
        }
        else {
            return this.showImage();
        }
    };
    // ## Méthode *showImage*
    // Affiche une image parmi les sprites désirées, si il y en
    // a encore à afficher.
    CountdownComponent.prototype.showImage = function () {
        this.shownTime = (new Date()).getTime();
        this.showNamedImage(this.sprites[this.index]);
    };
    // ## Méthode *showNamedImage*
    // Affiche une image, directement à partir de son nom
    CountdownComponent.prototype.showNamedImage = function (textureName) {
        this.spriteTemplate.components.RawSprite.texture = textureName;
        this.current = scene_1.Scene.current.createChild(this.spriteTemplate, "sprite", this.owner);
    };
    return CountdownComponent;
}(component_1.Component));
exports.CountdownComponent = CountdownComponent;
