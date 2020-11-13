"use strict";
exports.__esModule = true;
exports.Timing = void 0;
var Timing = /** @class */ (function () {
    function Timing(dT, frame) {
        this.dT = dT;
        this.frame = frame;
        this.now = new Date();
    }
    return Timing;
}());
exports.Timing = Timing;
