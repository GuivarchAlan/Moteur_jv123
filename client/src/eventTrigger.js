"use strict";
exports.__esModule = true;
exports.EventTrigger = void 0;
// # Classe *EventTrigger*
// Classe utilitaire pour appeler des méthodes en réaction
// à des événements.
var EventTrigger = /** @class */ (function () {
    function EventTrigger() {
        this.handlers = new Map();
        this.autoIndex = 0;
    }
    // ## Méthode *add*
    // Ajoute une méthode à appeler lors du déclenchement de
    // l'événement.
    EventTrigger.prototype.add = function (instance, method, name, context) {
        if (!name) {
            name = (this.autoIndex++).toString();
        }
        this.handlers.set(name, {
            context: context,
            instance: instance,
            method: method
        });
        return name;
    };
    // ## Méthode *remove*
    // Supprime une méthode du tableau de méthodes à appeler.
    EventTrigger.prototype.remove = function (name) {
        this.handlers["delete"](name);
    };
    // ## Méthode *trigger*
    // Déclenche les méthodes enregistrées.
    EventTrigger.prototype.trigger = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        for (var _a = 0, _b = this.handlers.values(); _a < _b.length; _a++) {
            var handler = _b[_a];
            if (handler.context) {
                params.push(handler.context);
            }
            var method = handler.method;
            if (typeof (method) === "string") {
                method = handler.instance[method];
            }
            method.apply(handler.instance, params);
        }
    };
    return EventTrigger;
}());
exports.EventTrigger = EventTrigger;
