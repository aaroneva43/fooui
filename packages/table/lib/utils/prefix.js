"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
exports.prefix = prefix;
var _classnames = _interopRequireDefault(require("classnames"));
var _curry = _interopRequireDefault(require("lodash-es/curry"));
function prefix(pre, className) {
  if (!pre || !className) {
    return '';
  }
  if (Array.isArray(className)) {
    return (0, _classnames["default"])(className.filter(function (name) {
      return !!name;
    }).map(function (name) {
      return pre + "-" + name;
    }));
  }

  // TODO Compatible with V4
  if (pre[pre.length - 1] === '-') {
    return "" + pre + className;
  }
  return pre + "-" + className;
}
var _default = (0, _curry["default"])(prefix);
exports["default"] = _default;