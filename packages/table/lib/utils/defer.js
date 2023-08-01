"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _defer = _interopRequireDefault(require("lodash-es/defer"));
/**
 * Defer callbacks to wait for DOM rendering to complete.
 */
var _default = function _default(callback) {
  (0, _defer["default"])(callback, 'deferred');
};
exports["default"] = _default;