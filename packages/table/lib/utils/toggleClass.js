"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _addClass = _interopRequireDefault(require("dom-lib/addClass"));
var _removeClass = _interopRequireDefault(require("dom-lib/removeClass"));
var toggleClass = function toggleClass(node, className, condition) {
  if (condition) {
    (0, _addClass["default"])(node, className);
  } else {
    (0, _removeClass["default"])(node, className);
  }
};
var _default = function _default(node, className, condition) {
  if (!node) {
    return;
  }
  if (Array.isArray(node) || Object.getPrototypeOf(node).hasOwnProperty('length')) {
    node = node;
    Array.from(node).forEach(function (item) {
      toggleClass(item, className, condition);
    });
    return;
  }
  toggleClass(node, className, condition);
};
exports["default"] = _default;