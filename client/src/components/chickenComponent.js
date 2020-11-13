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
exports.ChickenComponent = void 0;
var gl_matrix_1 = require("gl-matrix");
var scene_1 = require("../scene");
var component_1 = require("./component");
var dropId = 0;
var ChickenComponent = /** @class */ (function (_super) {
    __extends(ChickenComponent, _super);
    function ChickenComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dropped = false;
        _this.distance = 0;
        return _this;
    }
    // ## Méthode *create*
    // Cette méthode est appelée pour configurer le composant avant
    // que tous les composants d'un objet aient été créés.
    ChickenComponent.prototype.create = function (descr) {
        this.target = gl_matrix_1.vec3.fromValues(descr.target.x, descr.target.y, 0);
        this.rupeeTemplate = descr.rupeeTemplate;
        this.heartAttackChance = descr.heartAttackChance;
        this.heartTemplate = descr.heartTemplate;
        this.attack = descr.attack;
    };
    // ## Méthode *setup*
    // Cette méthode détermine la trajectoire du poulet et configure
    // la sprite à utiliser pour son affichage.
    ChickenComponent.prototype.setup = function () {
        var position = this.owner.getComponent("Position");
        this.velocity = gl_matrix_1.vec3.create();
        gl_matrix_1.vec3.subtract(this.velocity, this.target, position.local);
        gl_matrix_1.vec3.normalize(this.velocity, this.velocity);
        gl_matrix_1.vec3.scale(this.velocity, this.velocity, Math.random() * 45 + 30);
        var sprite = this.owner.getComponent("Sprite");
        var dir = (this.velocity[0] > 0) ? "R" : "L";
        sprite.spriteName = "C" + dir;
    };
    // ## Méthode *update*
    // La méthode *update* met à jour la position du poulet. Si il
    // a atteint sa cible, il laisse tomber un rubis. Le poulet est
    // automatiquement détruit si il a parcouru une distance trop
    // grande (il sera déjà en dehors de l'écran).
    ChickenComponent.prototype.update = function (timing) {
        var position = this.owner.getComponent("Position");
        var targetDistanceSq = gl_matrix_1.vec3.squaredDistance(this.target, position.local);
        var delta = gl_matrix_1.vec3.create();
        gl_matrix_1.vec3.scale(delta, this.velocity, timing.dT);
        position.translate(delta);
        var newTargetDistanceSq = gl_matrix_1.vec3.squaredDistance(this.target, position.local);
        if ((!this.dropped) && (newTargetDistanceSq > targetDistanceSq)) {
            this.drop(this.rupeeTemplate, dropId++);
        }
        this.distance += gl_matrix_1.vec3.length(delta);
        if (this.distance > 500) {
            this.owner.parent.removeChild(this.owner);
        }
    };
    // ## Méthode *onAttack*
    // Cette méthode est appelée quand le poulet se fait attaquer
    ChickenComponent.prototype.onAttack = function () {
        var toDrop = (Math.random() < this.heartAttackChance) ? this.heartTemplate : this.rupeeTemplate;
        this.drop(toDrop, dropId++);
        var collider = this.owner.getComponent("Collider");
        collider.enabled = false;
        this.velocity[0] *= -1;
        var sprite = this.owner.getComponent("Sprite");
        var dir = (this.velocity[0] > 0) ? "R" : "L";
        sprite.spriteName = "C" + dir;
    };
    // ## Méthode *drop*
    // Cette méthode instancie un objet au même endroit que le
    // poulet.
    ChickenComponent.prototype.drop = function (template, id) {
        var position = this.owner.getComponent("Position");
        template.components.Position = position.local;
        template.components.Sprite.spriteSheet = this.owner.getComponent("Sprite").spriteSheet;
        scene_1.Scene.current.createChild(template, id.toString(), this.owner.parent);
        this.dropped = true;
    };
    return ChickenComponent;
}(component_1.Component));
exports.ChickenComponent = ChickenComponent;
