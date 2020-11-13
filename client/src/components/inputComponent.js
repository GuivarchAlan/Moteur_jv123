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
exports.InputComponent = void 0;
var component_1 = require("./component");
// ## Variable *keyPressed*
// Tableau associatif vide qui contiendra l'état courant
// des touches du clavier.
var keyPressed = {};
// ## Méthode *setupKeyboardHandler*
// Cette méthode enregistre des fonctions qui seront
// appelées par le navigateur lorsque l'utilisateur appuie
// sur des touches du clavier. On enregistre alors si la touche
// est appuyée ou relâchée dans le tableau `keyPressed`.
//
// On utilise la propriété `code` de l'événement, qui est
// indépendant de la langue du clavier (ie.: WASD vs ZQSD)
//
// Cette méthode est appelée lors du chargement de ce module.
function setupKeyboardHandler() {
    document.addEventListener("keydown", function (evt) {
        keyPressed[evt.code] = true;
    }, false);
    document.addEventListener("keyup", function (evt) {
        keyPressed[evt.code] = false;
    }, false);
}
var InputComponent = /** @class */ (function (_super) {
    __extends(InputComponent, _super);
    function InputComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isLocal = true;
        return _this;
    }
    // ## Méthode *create*
    // Cette méthode est appelée pour configurer le composant avant
    // que tous les composants d'un objet aient été créés.
    InputComponent.prototype.create = function (descr) {
        this.symbols = descr.symbols;
    };
    InputComponent.prototype.listSymbols = function () {
        return Object.keys(this.symbols);
    };
    // ## Fonction *getKey*
    // Cette méthode retourne une valeur correspondant à un symbole défini.
    //
    // Si on le voulait, on pourrait substituer cette implémentation
    // par clavier par une implémentation de l'[API Gamepad.](https://developer.mozilla.org/fr/docs/Web/Guide/API/Gamepad)
    InputComponent.prototype.getKey = function (symbol) {
        if (keyPressed[this.symbols[symbol]]) {
            return true;
        }
        return false;
    };
    return InputComponent;
}(component_1.Component));
exports.InputComponent = InputComponent;
// Configuration de la capture du clavier au chargement du module.
// On met dans un bloc `try/catch` afin de pouvoir exécuter les
// tests unitaires en dehors du navigateur.
try {
    setupKeyboardHandler();
}
catch (e) {
    // Rien
}
