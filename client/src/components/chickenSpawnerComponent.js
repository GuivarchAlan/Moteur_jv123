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
exports.ChickenSpawnerComponent = void 0;
var scene_1 = require("../scene");
var component_1 = require("./component");
var ChickenSpawnerComponent = /** @class */ (function (_super) {
    __extends(ChickenSpawnerComponent, _super);
    function ChickenSpawnerComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ## Méthode *create*
    // Cette méthode est appelée pour configurer le composant avant
    // que tous les composants d'un objet aient été créés.
    ChickenSpawnerComponent.prototype.create = function (descr) {
        this.sourceArea = descr.sourceArea;
        this.targetArea = descr.targetArea;
        this.spawnDelay = descr.spawnDelay;
        this.spawnWaitFactor = descr.spawnWaitFactor;
        this.chickenTemplate = descr.chickenTemplate;
    };
    // ## Méthode *setup*
    // Cette méthode est appelée pour configurer le composant après
    // que tous les composants d'un objet aient été créés.
    ChickenSpawnerComponent.prototype.setup = function (descr) {
        this.spriteSheet = component_1.Component.findComponent(descr.spriteSheet);
    };
    // ## Méthode *update*
    // À chaque itération, on vérifie si on a attendu un délai
    // quelconque. Si c'est le cas, on génère un poulet, et on
    // réduit le temps d'attente.
    ChickenSpawnerComponent.prototype.update = function (timing) {
        var spawnDelay = Math.floor(this.spawnDelay);
        if ((timing.frame % spawnDelay) === 0) {
            this.spawnDelay = Math.max(8, this.spawnDelay * this.spawnWaitFactor);
            this.spawn(timing.frame);
        }
    };
    // ## Méthode *spawn*
    // Cette méthode crée un nouveau poulet. On configure son
    // apparition sur un rectangle autour de l'écran, et sa
    // cible sur l'aire de jeu.
    ChickenSpawnerComponent.prototype.spawn = function (frame) {
        var x = 0;
        var y = 0;
        if (Math.floor(Math.random() * 2) === 0) {
            x = this.sourceArea.x;
            if (Math.floor(Math.random() * 2) === 0) {
                x += this.sourceArea.w;
            }
            y = Math.random() * this.sourceArea.h + this.sourceArea.y;
        }
        else {
            y = this.sourceArea.y;
            if (Math.floor(Math.random() * 2) === 0) {
                y += this.sourceArea.h;
            }
            x = Math.random() * this.sourceArea.w + this.sourceArea.x;
        }
        this.chickenTemplate.components.Chicken.target = {
            x: Math.random() * this.targetArea.w + this.targetArea.x,
            y: Math.random() * this.targetArea.h + this.targetArea.y
        };
        this.chickenTemplate.components.Position = {
            x: x,
            y: y,
            z: 0
        };
        this.chickenTemplate.components.Sprite.spriteSheet = this.spriteSheet;
        scene_1.Scene.current.createChild(this.chickenTemplate, frame.toString(), this.owner);
    };
    return ChickenSpawnerComponent;
}(component_1.Component));
exports.ChickenSpawnerComponent = ChickenSpawnerComponent;
