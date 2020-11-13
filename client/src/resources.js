"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.Resources = void 0;
// ## Fonction *loadAsync*
// Fonction qui charge un fichier de façon asynchrone,
// via une [promesse](http://bluebirdjs.com/docs/why-promises.html)
function loadAsync(url, mime, responseType) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    xhr.addEventListener("error", reject);
                    xhr.addEventListener("load", function () {
                        resolve(xhr);
                    });
                    if (mime) {
                        xhr.overrideMimeType(mime);
                    }
                    xhr.open("GET", url);
                    if (responseType) {
                        xhr.responseType = responseType;
                    }
                    xhr.send();
                })];
        });
    });
}
// ## Fonction *loadJSON*
// Fonction qui charge un fichier JSON de façon asynchrone,
// via une [promesse](http://bluebirdjs.com/docs/why-promises.html)
function loadJSON(url) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, loadAsync(url)
                    .then(function (xhr) {
                    return JSON.parse(xhr.responseText);
                })];
        });
    });
}
function loadImageFile(url) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    var imgDownload = new Image();
                    imgDownload.onload = function () {
                        resolve(imgDownload);
                    };
                    imgDownload.src = url;
                })];
        });
    });
}
var Resources = /** @class */ (function () {
    function Resources() {
    }
    Resources.init = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var relPath, desc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        relPath = url.substr(0, url.lastIndexOf("/"));
                        return [4 /*yield*/, loadJSON(url)];
                    case 1:
                        desc = _a.sent();
                        return [4 /*yield*/, Resources.loadText(relPath, desc.text || {})];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, Resources.loadImages(relPath, desc.images || [])];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Resources.load = function (file) {
        return Resources.resources.get(file);
    };
    Resources.loadText = function (relPath, files) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, mime, _c, _d, file, xhr;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = [];
                        for (_b in files)
                            _a.push(_b);
                        _i = 0;
                        _e.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        mime = _a[_i];
                        if (!files.hasOwnProperty(mime)) {
                            return [3 /*break*/, 5];
                        }
                        _c = 0, _d = files[mime];
                        _e.label = 2;
                    case 2:
                        if (!(_c < _d.length)) return [3 /*break*/, 5];
                        file = _d[_c];
                        return [4 /*yield*/, loadAsync(relPath + "/" + file, mime)];
                    case 3:
                        xhr = _e.sent();
                        Resources.resources.set(file, xhr.responseText);
                        _e.label = 4;
                    case 4:
                        _c++;
                        return [3 /*break*/, 2];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Resources.loadImages = function (relPath, files) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, files_1, file, image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, files_1 = files;
                        _a.label = 1;
                    case 1:
                        if (!(_i < files_1.length)) return [3 /*break*/, 4];
                        file = files_1[_i];
                        return [4 /*yield*/, loadImageFile(relPath + "/" + file)];
                    case 2:
                        image = _a.sent();
                        Resources.resources.set(file, image);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Resources.resources = new Map();
    return Resources;
}());
exports.Resources = Resources;
