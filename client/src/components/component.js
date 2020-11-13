"use strict";
exports.__esModule = true;
exports.Component = void 0;
var scene_1 = require("../scene");
// ## Classe *Component*
// Cette classe est une classe de base pour l'ensemble des
// composants et implémente les méthodes par défaut.
var Component = /** @class */ (function () {
    // ### Constructeur de la classe *Composant*
    // Le constructeur de cette classe prend en paramètre l'objet
    // propriétaire du composant, et l'assigne au membre `owner`.
    function Component(owner) {
        this.owner = owner;
        this._enabled = true;
    }
    Object.defineProperty(Component.prototype, "enabled", {
        // ## Accesseur *enabled*
        // L'accesseur *enabled* active ou désactive le composant, et appelle
        // une méthode en réponse si l'état a changé.
        get: function () {
            return this._enabled;
        },
        set: function (val) {
            if (this.enabled === val) {
                return;
            }
            this._enabled = val;
            if (this.enabled) {
                this.onEnabled();
            }
            else {
                this.onDisabled();
            }
        },
        enumerable: false,
        configurable: true
    });
    Component.findComponent = function (name) {
        if (typeof (name) !== "string") {
            return name;
        }
        var tokens = name.split(".");
        var targetName = tokens[0];
        var compName = tokens[1];
        var target = scene_1.Scene.current.findObject(targetName);
        return target && target.getComponent(compName);
    };
    // ### Méthode *create*
    // Cette méthode est appelée pour configurer le composant avant
    // que tous les composants d'un objet aient été créés.
    Component.prototype.create = function (desc) {
        // Rien
    };
    // ### Méthode *setup*
    // Cette méthode est appelée pour configurer le composant après
    // que tous les composants d'un objet aient été créés.
    Component.prototype.setup = function (descr) {
        // Rien
    };
    Component.prototype.enable = function (val) {
        this.enabled = val;
    };
    // ## Méthode *onEnabled*
    // La méthode *onEnabled* est appelée quand l'objet passe de l'état
    // activé à désactivé.
    Component.prototype.onEnabled = function () {
        // Rien
    };
    // ## Méthode *onDisabled*
    // La méthode *onDisabled* est appelée quand l'objet passe de l'état
    // désactivé à activé.
    Component.prototype.onDisabled = function () {
        // Rien
    };
    return Component;
}());
exports.Component = Component;
