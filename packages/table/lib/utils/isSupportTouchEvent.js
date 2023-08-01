"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = isSupportTouchEvent;
var _canUseDOM = _interopRequireDefault(require("dom-lib/canUseDOM"));
function isSupportTouchEvent() {
  return _canUseDOM["default"] && 'ontouchstart' in window;
}