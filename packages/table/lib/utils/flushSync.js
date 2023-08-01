"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _reactDom = _interopRequireDefault(require("react-dom"));
var majorVersion = parseInt(_reactDom["default"].version);

/**
 * Force React to flush any updates inside the provided callback synchronously.
 * This ensures that the DOM is updated immediately.
 */
var flushSync = function flushSync(callback) {
  if (majorVersion >= 18) {
    var _ReactDOM$flushSync;
    (_ReactDOM$flushSync = _reactDom["default"].flushSync) === null || _ReactDOM$flushSync === void 0 ? void 0 : _ReactDOM$flushSync.call(_reactDom["default"], callback);
    return;
  }
  callback();
};
var _default = flushSync;
exports["default"] = _default;