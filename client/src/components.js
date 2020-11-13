"use strict";
exports.__esModule = true;
exports.ComponentFactory = void 0;
var backgroundLoaderComponent_1 = require("./components/backgroundLoaderComponent");
var cameraComponent_1 = require("./components/cameraComponent");
var chickenComponent_1 = require("./components/chickenComponent");
var chickenSpawnerComponent_1 = require("./components/chickenSpawnerComponent");
var colliderComponent_1 = require("./components/colliderComponent");
var countdownComponent_1 = require("./components/countdownComponent");
var debugDrawCallsComponent_1 = require("./components/debugDrawCallsComponent");
var deformationCompositorComponent_1 = require("./components/deformationCompositorComponent");
var enablerComponent_1 = require("./components/enablerComponent");
var heartComponent_1 = require("./components/heartComponent");
var inputComponent_1 = require("./components/inputComponent");
var layerComponent_1 = require("./components/layerComponent");
var lifeComponent_1 = require("./components/lifeComponent");
var playerComponent_1 = require("./components/playerComponent");
var positionComponent_1 = require("./components/positionComponent");
var rawSpriteComponent_1 = require("./components/rawSpriteComponent");
var refereeComponent_1 = require("./components/refereeComponent");
var renderCompositorComponent_1 = require("./components/renderCompositorComponent");
var rupeeComponent_1 = require("./components/rupeeComponent");
var scoreComponent_1 = require("./components/scoreComponent");
var spriteComponent_1 = require("./components/spriteComponent");
var spriteSheetComponent_1 = require("./components/spriteSheetComponent");
var textSpriteComponent_1 = require("./components/textSpriteComponent");
var timerComponent_1 = require("./components/timerComponent");
var ComponentFactory = /** @class */ (function () {
    function ComponentFactory() {
    }
    // ## Fonction statique *create*
    // Cette fonction instancie un nouveau composant choisi dans
    // le tableau `componentCreators` depuis son nom.
    ComponentFactory.create = function (type, owner) {
        if (!ComponentFactory.componentCreators[type]) {
            console.error(type);
        }
        var comp = new ComponentFactory.componentCreators[type](owner);
        comp.__type = type;
        return comp;
    };
    // ## Attribut statique *componentCreators*
    // Ce tableau associatif fait le lien entre les noms des composants
    // tels qu'utilisés dans le fichier JSON et les classes de
    // composants correspondants.
    ComponentFactory.componentCreators = {
        BackgroundLoader: backgroundLoaderComponent_1.BackgroundLoaderComponent,
        Camera: cameraComponent_1.CameraComponent,
        Chicken: chickenComponent_1.ChickenComponent,
        ChickenSpawner: chickenSpawnerComponent_1.ChickenSpawnerComponent,
        Collider: colliderComponent_1.ColliderComponent,
        Countdown: countdownComponent_1.CountdownComponent,
        DebugDrawCalls: debugDrawCallsComponent_1.DebugDrawCallsComponent,
        DeformationCompositor: deformationCompositorComponent_1.DeformationCompositorComponent,
        Enabler: enablerComponent_1.EnablerComponent,
        Heart: heartComponent_1.HeartComponent,
        Input: inputComponent_1.InputComponent,
        Layer: layerComponent_1.LayerComponent,
        Life: lifeComponent_1.LifeComponent,
        Player: playerComponent_1.PlayerComponent,
        Position: positionComponent_1.PositionComponent,
        RawSprite: rawSpriteComponent_1.RawSpriteComponent,
        Referee: refereeComponent_1.RefereeComponent,
        RenderCompositor: renderCompositorComponent_1.RenderCompositorComponent,
        Rupee: rupeeComponent_1.RupeeComponent,
        Score: scoreComponent_1.ScoreComponent,
        Sprite: spriteComponent_1.SpriteComponent,
        SpriteSheet: spriteSheetComponent_1.SpriteSheetComponent,
        TextSprite: textSpriteComponent_1.TextSpriteComponent,
        Timer: timerComponent_1.TimerComponent
    };
    return ComponentFactory;
}());
exports.ComponentFactory = ComponentFactory;
