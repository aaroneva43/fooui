"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var MouseArea = /*#__PURE__*/_react["default"].forwardRef(function (props, ref) {
  var addPrefix = props.addPrefix,
    headerHeight = props.headerHeight,
    height = props.height;
  var styles = {
    height: height
  };
  var spanStyles = {
    height: headerHeight - 1
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: ref,
    className: addPrefix('mouse-area'),
    style: styles
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: spanStyles
  }));
});
MouseArea.displayName = 'Table.MouseArea';
var _default = MouseArea;
exports["default"] = _default;