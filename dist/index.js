"use strict";

var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var regex = /\[([^[\]]?)\]\((https?:\/\/[^\.s?#].[^\s])\)/gm;
var enconding = 'utf-8';
function extrairLinks(caminhoDosLinks) {
  return new Promise(function (resolve, reject) {
    _fs["default"].readFile(caminhoDosLinks, enconding, function (err, data) {
      if (err) {
        reject(err);
      } else {
        var itensExtraidos = _toConsumableArray(data.matchAll(regex));
        var conteudo = itensExtraidos.map(function (itemExtraido) {
          return {
            text: itemExtraido[1],
            href: itemExtraido[2],
            file: caminhoDosLinks
          };
        });
        resolve(conteudo);
      }
    });
  });
}
extrairLinks('src/texto.md').then(function (conteudo) {
  return console.log(conteudo);
})["catch"](function (err) {
  return console.error(err);
});