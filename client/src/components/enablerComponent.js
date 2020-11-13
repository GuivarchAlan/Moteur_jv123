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
exports.EnablerComponent = void 0;
var eventTrigger_1 = require("../eventTrigger");
var component_1 = require("./component");
var EnablerComponent = /** @class */ (function (_super) {
    __extends(EnablerComponent, _super);
    function EnablerComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventTargets = new eventTrigger_1.EventTrigger();
        return _this;
    }
    // ## Méthode *setup*
    // Cette méthode est appelée pour configurer le composant après
    // que tous les composants d'un objet aient été créés.
    EnablerComponent.prototype.setup = function (descr) {
        for (var name_1 in descr.onStart) {
            if (!descr.onStart.hasOwnProperty(name_1)) {
                continue;
            }
            var enabled = descr.onStart[name_1];
            var target = component_1.Component.findComponent(name_1);
            target.enabled = enabled;
        }
        for (var name_2 in descr.onEvent) {
            if (!descr.onEvent.hasOwnProperty(name_2)) {
                continue;
            }
            var enabled = descr.onEvent[name_2];
            var target = component_1.Component.findComponent(name_2);
            this.eventTargets.add(target, "enable", undefined, enabled);
        }
    };
    // ## Méthode *onEvent*
    // Active ou désactive les composants en réaction à un événement.
    EnablerComponent.prototype.onEvent = function () {
        this.eventTargets.trigger();
    };
    return EnablerComponent;
}(component_1.Component));
exports.EnablerComponent = EnablerComponent;
