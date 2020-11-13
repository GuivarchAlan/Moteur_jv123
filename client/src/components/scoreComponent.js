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
exports.ScoreComponent = void 0;
var eventTrigger_1 = require("../eventTrigger");
var component_1 = require("./component");
var ScoreComponent = /** @class */ (function (_super) {
    __extends(ScoreComponent, _super);
    function ScoreComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scoreChangedEvent = new eventTrigger_1.EventTrigger();
        return _this;
    }
    // ## Méthode *setup*
    // Cette méthode conserve le composant de texte qui affiche
    // le pointage, et initialise sa valeur.
    ScoreComponent.prototype.setup = function (descr) {
        this.scoreSprite = component_1.Component.findComponent(descr.scoreSprite);
        this.value = 0;
    };
    Object.defineProperty(ScoreComponent.prototype, "value", {
        // ## Propriété *value*
        // Cette méthode met à jour le pointage et l'affichage de
        // ce dernier.
        get: function () {
            return this._value;
        },
        set: function (newVal) {
            this._value = newVal;
            this.scoreChangedEvent.trigger(this.value);
            this.scoreSprite.text = this.value.toString();
        },
        enumerable: false,
        configurable: true
    });
    return ScoreComponent;
}(component_1.Component));
exports.ScoreComponent = ScoreComponent;
