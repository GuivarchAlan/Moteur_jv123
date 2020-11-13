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
exports.LifeComponent = void 0;
var eventTrigger_1 = require("../eventTrigger");
var component_1 = require("./component");
var LifeComponent = /** @class */ (function (_super) {
    __extends(LifeComponent, _super);
    function LifeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.deadEvent = new eventTrigger_1.EventTrigger();
        _this.hurtEvent = new eventTrigger_1.EventTrigger();
        return _this;
    }
    // ## Méthode *create*
    // Cette méthode est appelée pour configurer le composant avant
    // que tous les composants d'un objet aient été créés.
    LifeComponent.prototype.create = function (descr) {
        this.max = descr.max;
        this.sprites = descr.sprites;
    };
    // ## Méthode *setup*
    // Cette méthode conserve le composant de texte qui affiche
    // la vie, et initialise sa valeur.
    LifeComponent.prototype.setup = function (descr) {
        this.lifeSprite = component_1.Component.findComponent(descr.lifeSprite);
        this.value = descr["default"];
    };
    Object.defineProperty(LifeComponent.prototype, "value", {
        // ## Propriété *value*
        // Cette méthode met à jour la vie et l'affichage de
        // cette dernière.
        get: function () {
            return this._value;
        },
        set: function (newVal) {
            if (newVal < 0) {
                newVal = 0;
            }
            if (newVal > this.max) {
                newVal = this.max;
            }
            if (newVal === 0) {
                this.deadEvent.trigger();
            }
            else if (newVal < this.value) {
                this.hurtEvent.trigger();
            }
            this._value = newVal;
            var hearts = [];
            for (var i = 0; i < this.max; ++i) {
                var sIndex = 0;
                if (i < this.value) {
                    sIndex = 1;
                }
                if (i + 1 <= this.value) {
                    sIndex = 2;
                }
                hearts.push(this.sprites[sIndex]);
            }
            this.lifeSprite.array = hearts;
        },
        enumerable: false,
        configurable: true
    });
    return LifeComponent;
}(component_1.Component));
exports.LifeComponent = LifeComponent;
