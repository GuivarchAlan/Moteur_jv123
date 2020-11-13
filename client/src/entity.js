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
exports.__esModule = true;
exports.Entity = void 0;
var components_1 = require("./components");
// # Classe *Entity*
// La classe *Entity* représente un objet de la scène qui
// peut contenir des enfants et des composants.
var Entity = /** @class */ (function () {
    function Entity() {
        // ## Membre *active*
        // Si ce membre a une valeur fausse, les systèmes devraient
        // ignorer les composants de cet objet et ses enfants.
        this.active = true;
        this.parent = null;
        this._components = new Map();
        this.nextChildOrder = 0;
        this._children = new Set();
        this.childrenByName = new Map();
        this.childrenByChild = new Map();
    }
    Object.defineProperty(Entity.prototype, "components", {
        get: function () {
            return this._components.values();
        },
        enumerable: false,
        configurable: true
    });
    // ## Méthode *addComponent*
    // Cette méthode prend en paramètre le type d'un composant et
    // instancie un nouveau composant.
    Entity.prototype.addComponent = function (type, descr, deferred) {
        if (deferred === void 0) { deferred = false; }
        var newComponent = Entity.componentCreator(type, this);
        this._components.set(type, newComponent);
        newComponent.create(descr);
        if (!deferred) {
            newComponent.setup(descr);
        }
        return newComponent;
    };
    // ## Fonction *getComponent*
    // Cette fonction retourne un composant existant du type spécifié
    // associé à l'objet.
    Entity.prototype.getComponent = function (type) {
        return this._components.get(type);
    };
    // ## Méthode *addChild*
    // La méthode *addChild* ajoute à l'objet courant un objet
    // enfant.
    Entity.prototype.addChild = function (objectName, child) {
        if (child.parent) {
            throw new Error("Cet objet est déjà attaché à un parent");
        }
        var childEntry = {
            child: child,
            name: objectName,
            order: this.nextChildOrder++
        };
        this._children.add(childEntry);
        this.childrenByName.set(objectName, childEntry);
        this.childrenByChild.set(child, childEntry);
        child.parent = this;
    };
    // ## Méthode *removeChild*
    // La méthode *removeChild* enlève un enfant de l'objet courant
    Entity.prototype.removeChild = function (child) {
        if (child.parent !== this) {
            throw new Error("Cet object n'est pas attaché à ce parent");
        }
        var childEntry = this.childrenByChild.get(child);
        this.childrenByChild["delete"](child);
        if (this.childrenByName.get(childEntry.name) === childEntry) {
            this.childrenByName["delete"](childEntry.name);
        }
        this._children["delete"](childEntry);
        child.parent = null;
    };
    // ## Fonction *getChild*
    // La fonction *getChild* retourne un objet existant portant le
    // nom spécifié, dont l'objet courant est le parent.
    Entity.prototype.getChild = function (objectName) {
        var childEntry = this.childrenByName.get(objectName);
        if (childEntry) {
            return childEntry.child;
        }
    };
    Object.defineProperty(Entity.prototype, "children", {
        get: function () {
            return this.sortedChildren();
        },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.sortedChildren = function () {
        var sortedChildren, _i, sortedChildren_1, v;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sortedChildren = Array.from(this._children).sort(function (a, b) { return a.order - b.order; });
                    _i = 0, sortedChildren_1 = sortedChildren;
                    _a.label = 1;
                case 1:
                    if (!(_i < sortedChildren_1.length)) return [3 /*break*/, 4];
                    v = sortedChildren_1[_i];
                    return [4 /*yield*/, v.child];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    // ## Fonction *componentCreator*
    // Référence vers la fonction permettant de créer de
    // nouveaux composants. Permet ainsi de substituer
    // cette fonction afin de réaliser des tests unitaires.
    Entity.componentCreator = components_1.ComponentFactory.create;
    return Entity;
}());
exports.Entity = Entity;
