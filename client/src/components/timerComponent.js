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
exports.TimerComponent = void 0;
var component_1 = require("./component");
// ## Méthode *format*
// Cette méthode prend un interval et le converti en une chaîne
// lisible.
function format(total_ms) {
    var total_s = Math.floor(total_ms / 1000);
    var minutes = Math.floor(total_s / 60);
    var seconds = total_s - (minutes * 60);
    var secText = seconds.toString();
    if (seconds < 10) {
        secText = "0" + secText;
    }
    return minutes + ":" + secText;
}
// # Classe *TimerComponent*
// Ce composant affiche le temps écoulé depuis son lancement.
var TimerComponent = /** @class */ (function (_super) {
    __extends(TimerComponent, _super);
    function TimerComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ## Méthode *setup*
    // Cette méthode conserve le composant de texte qui affiche
    // le pointage, et initialise sa valeur.
    TimerComponent.prototype.setup = function () {
        this.textSprite = this.owner.getComponent("TextSprite");
        this.start = (new Date()).getTime();
    };
    // ## Méthode *onEnabled*
    // La méthode *onEnabled* est appelée quand l'objet passe de l'état
    // activé à désactivé.
    TimerComponent.prototype.onEnabled = function () {
        var now = (new Date()).getTime();
        var paused = now - this.beginPause;
        this.start += paused;
    };
    // ## Méthode *onDisabled*
    // La méthode *onDisabled* est appelée quand l'objet passe de l'état
    // désactivé à activé.
    TimerComponent.prototype.onDisabled = function () {
        this.beginPause = (new Date()).getTime();
    };
    // ## Méthode *update*
    // La méthode *update* de chaque composant est appelée une fois
    // par itération de la boucle de jeu.
    TimerComponent.prototype.update = function (timing) {
        var elapsed = timing.now.getTime() - this.start;
        var array = format(elapsed).split("");
        for (var i = 0; i < array.length; ++i) {
            if (array[i] === ":") {
                array[i] = "colon";
            }
        }
        this.textSprite.array = array;
    };
    return TimerComponent;
}(component_1.Component));
exports.TimerComponent = TimerComponent;
