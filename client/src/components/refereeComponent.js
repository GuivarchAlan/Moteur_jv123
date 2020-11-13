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
exports.RefereeComponent = void 0;
var eventTrigger_1 = require("../eventTrigger");
var component_1 = require("./component");
var RefereeComponent = /** @class */ (function (_super) {
    __extends(RefereeComponent, _super);
    function RefereeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.winEvent = new eventTrigger_1.EventTrigger();
        _this.players = [];
        return _this;
    }
    // ## Méthode *create*
    // Cette méthode est appelée pour configurer le composant avant
    // que tous les composants d'un objet aient été créés.
    RefereeComponent.prototype.create = function () {
        this.winEvent.add(this, this.showWinMessage);
    };
    // ## Méthode *setup*
    // Cette méthode configure le composant.
    RefereeComponent.prototype.setup = function (descr) {
        for (var _i = 0, _a = descr.players; _i < _a.length; _i++) {
            var p = _a[_i];
            var player = component_1.Component.findComponent(p);
            this.players.push(player);
            player.deadEvent.add(this, this.onDead, undefined, player);
        }
    };
    // ## Méthode *onDead*
    // Cette méthode est déclenchée quand un joueur meurt
    RefereeComponent.prototype.onDead = function ( /*player*/) {
        var bestScore = -1;
        var bestPlayer = null;
        var worstScore = Number.MAX_VALUE;
        var worstPlayer = null;
        var gameOver = true;
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var p = _a[_i];
            if (!gameOver) {
                continue;
            }
            if (!p.isDead) {
                gameOver = false;
                continue;
            }
            if (p.score.value > bestScore) {
                bestScore = p.score.value;
                bestPlayer = p;
            }
            if (p.score.value < worstScore) {
                worstScore = p.score.value;
                worstPlayer = p;
            }
        }
        if (gameOver) {
            this.winEvent.trigger(bestPlayer, worstPlayer);
        }
    };
    // ## Méthode *showWinMessage*
    // Affiche un popup mentionnant le gagnant
    RefereeComponent.prototype.showWinMessage = function (winner, loser) {
        alert(winner.name + " a gagn\u00E9 contre " + loser.name);
    };
    return RefereeComponent;
}(component_1.Component));
exports.RefereeComponent = RefereeComponent;
