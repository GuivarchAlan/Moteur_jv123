"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.Scene = void 0;
var entity_1 = require("./entity");
// # Classe *Scene*
// La classe *Scene* représente la hiérarchie d'objets contenus
// simultanément dans la logique du jeu.
var Scene = /** @class */ (function () {
    function Scene() {
        this.root = new entity_1.Entity();
    }
    // ## Fonction statique *create*
    // La fonction *create* permet de créer une nouvelle instance
    // de la classe *Scene*, contenant tous les objets instanciés
    // et configurés. Le paramètre `description` comprend la
    // description de la hiérarchie et ses paramètres.
    Scene.create = function (description) {
        var scene = new Scene();
        Scene.current = scene;
        var toSetup = new Map();
        scene.createChildren(description, scene.root, toSetup);
        scene.setupChildren(toSetup);
        return scene;
    };
    Scene.prototype.createChild = function (descr, name, parent) {
        var toSetup = new Map();
        var newChild = this.createChildInternal(descr, name, parent, toSetup);
        this.setupChildren(toSetup);
        return newChild;
    };
    // ## Fonction *findObject*
    // La fonction *findObject* retourne l'objet de la scène
    // portant le nom spécifié.
    Scene.prototype.findObject = function (objectName) {
        return this.findObjectRecursive(this.root, objectName);
    };
    // ## Méthode *entities*
    // Cette méthode parcourt l'ensemble des entités de la scène
    Scene.prototype.entities = function (onlyActive) {
        if (onlyActive === void 0) { onlyActive = true; }
        return this.entitiesRecursive(this.root, onlyActive);
    };
    Scene.prototype.createChildInternal = function (descr, name, parent, toSetup) {
        var newObj = new entity_1.Entity();
        parent.addChild(name, newObj);
        this.createChildren(descr.children || {}, newObj, toSetup);
        for (var type in descr.components) {
            if (!descr.components.hasOwnProperty(type)) {
                continue;
            }
            var compDescr = descr.components[type];
            var newComp = newObj.addComponent(type, compDescr, true);
            toSetup.set(newComp, compDescr);
        }
        return newObj;
    };
    Scene.prototype.createChildren = function (description, parent, toSetup) {
        for (var name_1 in description) {
            if (!description.hasOwnProperty(name_1)) {
                continue;
            }
            var descr = description[name_1];
            this.createChildInternal(descr, name_1, parent, toSetup);
        }
    };
    Scene.prototype.setupChildren = function (pending) {
        for (var _i = 0, pending_1 = pending; _i < pending_1.length; _i++) {
            var _a = pending_1[_i], comp = _a[0], desc = _a[1];
            comp.setup(desc);
        }
    };
    Scene.prototype.findObjectRecursive = function (parent, objectName) {
        var found = parent.getChild(objectName);
        if (found) {
            return found;
        }
        for (var _i = 0, _a = parent.children; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (!found) {
                found = this.findObjectRecursive(obj, objectName);
            }
        }
        return found;
    };
    Scene.prototype.entitiesRecursive = function (entity, onlyActive) {
        var _i, _a, child;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (onlyActive && !entity.active) {
                        return [2 /*return*/];
                    }
                    _i = 0, _a = entity.children;
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    child = _a[_i];
                    return [4 /*yield*/, child];
                case 2:
                    _b.sent();
                    return [5 /*yield**/, __values(this.entitiesRecursive(child, onlyActive))];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    };
    return Scene;
}());
exports.Scene = Scene;
