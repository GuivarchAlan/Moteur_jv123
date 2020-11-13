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
exports.PlayerComponent = void 0;
var gl_matrix_1 = require("gl-matrix");
var eventTrigger_1 = require("../eventTrigger");
var component_1 = require("./component");
var Facing;
(function (Facing) {
    Facing["Back"] = "B";
    Facing["Front"] = "F";
    Facing["Left"] = "L";
    Facing["Right"] = "R";
})(Facing || (Facing = {}));
var PlayerComponent = /** @class */ (function (_super) {
    __extends(PlayerComponent, _super);
    function PlayerComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.deadEvent = new eventTrigger_1.EventTrigger();
        _this.isDead = false;
        _this.facing = Facing.Front;
        _this.isAttacking = false;
        _this.isMoving = false;
        _this.isHurt = false;
        _this.isInvulnerable = false;
        return _this;
    }
    // ## Méthode *create*
    // Cette méthode est appelée pour configurer le composant avant
    // que tous les composants d'un objet aient été créés.
    PlayerComponent.prototype.create = function (descr) {
        this.name = descr.name;
        this.prefix = descr.prefix;
        this.gameArea = descr.gameArea;
        this.invulnerableDuration = descr.invulnerableDuration;
        this.hurtDuration = descr.hurtDuration;
        this.hurtMotion = descr.hurtMotion;
    };
    // ## Méthode *setup*
    // Cette méthode configure le composant. Elle crée une instance
    // de sprite, et y configure une fonction de rappel lorsque
    // l'animation d'attaque est terminée.
    PlayerComponent.prototype.setup = function (descr) {
        var _this = this;
        this.input = component_1.Component.findComponent(descr.input);
        this.score = component_1.Component.findComponent(descr.score);
        this.life = component_1.Component.findComponent(descr.life);
        this.life.deadEvent.add(this, this.onDead);
        this.life.hurtEvent.add(this, this.onHurt);
        var _loop_1 = function (item) {
            var component = component_1.Component.findComponent(item);
            this_1.life.hurtEvent.add(this_1, function () {
                component.enabled = true;
            });
        };
        var this_1 = this;
        for (var _i = 0, _a = descr.onHurtEnable; _i < _a.length; _i++) {
            var item = _a[_i];
            _loop_1(item);
        }
        this.sprite = this.owner.getComponent("Sprite");
        this.sprite.animationEndedEvent.push(function () {
            _this.isAttacking = false;
            _this.sprite.frameSkip = 2;
            _this.updateSprite();
            _this.sprite.updateMesh();
        });
        this.updateSprite();
    };
    // ## Méthode *update*
    // Cette méthode récupère les entrées du joueur, effectue les
    // déplacements appropriés, déclenche l'état d'attaque et ajuste
    // la sprite du joueur.
    PlayerComponent.prototype.update = function (timing) {
        var delta;
        if (this.isDead) {
            delta = this.updateDead();
        }
        else if (this.isHurt) {
            delta = this.updateHurt();
        }
        else {
            delta = this.updateStandard();
        }
        var visible = (!this.isInvulnerable) || (timing.frame % 2 !== 0);
        this.sprite.enabled = visible;
        var position = this.owner.getComponent("Position");
        gl_matrix_1.vec3.scale(delta, delta, timing.dT * 60);
        position.translate(delta);
        position.clamp(this.gameArea.x, this.gameArea.x + this.gameArea.w, this.gameArea.y, this.gameArea.y + this.gameArea.h);
    };
    // ## Méthode *onCollision*
    // Cette méthode est appelée par le *CollisionComponent*
    // lorsqu'il y a collision entre le joueur et un objet pertinent.
    // Si cet objet est un rubis, on le récupère et on incrémente
    // le score, si c'est un poulet, on le détruit si on est en
    // état d'attaque, sinon on soustrait le score et on désactive
    // ce poulet.
    PlayerComponent.prototype.onCollision = function (otherCollider) {
        var obj = otherCollider.owner;
        var rupee = obj.getComponent("Rupee");
        var heart = obj.getComponent("Heart");
        var chicken = obj.getComponent("Chicken");
        if (rupee) {
            this.score.value += rupee.value;
            obj.active = false;
            obj.parent.removeChild(obj);
        }
        if (heart) {
            this.life.value += heart.heal;
            obj.active = false;
            obj.parent.removeChild(obj);
        }
        if (chicken) {
            if (this.isAttacking) {
                chicken.onAttack();
            }
            else {
                this.life.value -= chicken.attack;
            }
        }
    };
    // ## Méthode *onDead*
    // Déclenchée lorsque le joueur est mort
    PlayerComponent.prototype.onDead = function () {
        this.isDead = true;
        this.deadEvent.trigger();
    };
    // ## Méthode *onHurt*
    // Déclenchée lorsque le joueur est blessé
    PlayerComponent.prototype.onHurt = function () {
        var _this = this;
        var collider = this.owner.getComponent("Collider");
        this.isHurt = true;
        setTimeout(function () {
            _this.isHurt = false;
        }, this.hurtDuration);
        this.isInvulnerable = true;
        collider.enabled = false;
        setTimeout(function () {
            _this.isInvulnerable = false;
            collider.enabled = true;
        }, this.invulnerableDuration);
    };
    // ## Méthode *updateDead*
    // Met à jour le joueur quand il est mort
    PlayerComponent.prototype.updateDead = function () {
        this.isMoving = false;
        this.isAttacking = false;
        this.sprite.isAnimated = false;
        this.sprite.spriteName = this.prefix + "D";
        this.sprite.updateMesh();
        var collider = this.owner.getComponent("Collider");
        collider.enabled = false;
        return gl_matrix_1.vec3.create();
    };
    // ## Méthode *updateHurt*
    // Met à jour le joueur quand il est blessé
    PlayerComponent.prototype.updateHurt = function () {
        this.isMoving = false;
        this.isAttacking = false;
        this.sprite.isAnimated = false;
        this.sprite.spriteName = this.prefix + "H" + this.facing;
        this.sprite.updateMesh();
        var delta = gl_matrix_1.vec3.create();
        switch (this.facing) {
            case Facing.Back:
                delta[1] = this.hurtMotion;
                break;
            case Facing.Front:
                delta[1] = -this.hurtMotion;
                break;
            case Facing.Left:
                delta[0] = this.hurtMotion;
                break;
            case Facing.Right:
                delta[0] = -this.hurtMotion;
                break;
        }
        return delta;
    };
    // ## Méthode *updateStandard*
    // Met à jour le mouvement normal du joueur
    PlayerComponent.prototype.updateStandard = function () {
        if (!this.isAttacking && this.input.getKey("attack")) {
            this.isAttacking = true;
            this.sprite.animationFrame = 1;
            this.sprite.frameSkip = 1;
        }
        var delta = gl_matrix_1.vec3.create();
        if (this.input.getKey("up")) {
            delta[1]--;
            this.facing = Facing.Back;
        }
        if (this.input.getKey("down")) {
            delta[1]++;
            this.facing = Facing.Front;
        }
        if (this.input.getKey("left")) {
            delta[0]--;
            this.facing = Facing.Left;
        }
        if (this.input.getKey("right")) {
            delta[0]++;
            this.facing = Facing.Right;
        }
        this.isMoving = gl_matrix_1.vec3.length(delta) > 0;
        this.updateSprite();
        this.sprite.updateMesh();
        return delta;
    };
    // ## Méthode *updateSprite*
    // Choisi la sprite appropriée selon le contexte.
    PlayerComponent.prototype.updateSprite = function () {
        this.sprite.isAnimated = this.isMoving || this.isAttacking;
        var mod = this.isAttacking ? "A" : "M";
        var frame = this.sprite.isAnimated ? "" : "1";
        this.sprite.spriteName = "" + this.prefix + mod + this.facing + frame;
    };
    return PlayerComponent;
}(component_1.Component));
exports.PlayerComponent = PlayerComponent;
