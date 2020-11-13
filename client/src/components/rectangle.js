"use strict";
exports.__esModule = true;
exports.Rectangle = void 0;
function isRectangleDesc(arg) {
    return arg.xMin !== undefined;
}
var Rectangle = /** @class */ (function () {
    // ### Constructeur de la classe *Rectangle*
    // Le constructeur de cette classe prend en paramètre un
    // objet pouvant définir soit le centre et la taille du
    // rectangle (`x`, `y`, `width` et `height`) ou les côtés
    // de celui-ci (`xMin`, `xMax`, `yMin` et `yMax`).
    function Rectangle(descr) {
        if (isRectangleDesc(descr)) {
            this.xMin = descr.xMin;
            this.xMax = descr.xMax;
            this.yMin = descr.yMin;
            this.yMax = descr.yMax;
        }
        else {
            this.xMin = descr.x - descr.width / 2;
            this.xMax = descr.x + descr.width / 2;
            this.yMin = descr.y - descr.height / 2;
            this.yMax = descr.y + descr.height / 2;
        }
    }
    // ### Fonction *intersectsWith*
    // Cette fonction retourne *vrai* si ce rectangle et celui
    // passé en paramètre se superposent.
    Rectangle.prototype.intersectsWith = function (other) {
        return !((this.xMin >= other.xMax) ||
            (this.xMax <= other.xMin) ||
            (this.yMin >= other.yMax) ||
            (this.yMax <= other.yMin));
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
