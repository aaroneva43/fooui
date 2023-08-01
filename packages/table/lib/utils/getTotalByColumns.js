"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _isPlainObject = _interopRequireDefault(require("lodash-es/isPlainObject"));
var _getColumnProps2 = _interopRequireDefault(require("./getColumnProps"));
function getTotalByColumns(columns) {
  var totalFlexGrow = 0;
  var totalWidth = 0;
  var count = function count(items) {
    Array.from(items).forEach(function (column) {
      if ( /*#__PURE__*/_react["default"].isValidElement(column)) {
        var _getColumnProps = (0, _getColumnProps2["default"])(column),
          flexGrow = _getColumnProps.flexGrow,
          _getColumnProps$width = _getColumnProps.width,
          width = _getColumnProps$width === void 0 ? 0 : _getColumnProps$width;
        totalFlexGrow += flexGrow || 0;
        totalWidth += flexGrow ? 0 : width;
      } else if (Array.isArray(column)) {
        count(column);
      }
    });
  };
  if (Array.isArray(columns)) {
    count(columns);
  } else if ((0, _isPlainObject["default"])(columns)) {
    var _columns$props = columns === null || columns === void 0 ? void 0 : columns.props,
      flexGrow = _columns$props.flexGrow,
      _columns$props$width = _columns$props.width,
      width = _columns$props$width === void 0 ? 0 : _columns$props$width;
    totalFlexGrow = flexGrow || 0;
    totalWidth = flexGrow ? 0 : width;
  }
  return {
    totalFlexGrow: totalFlexGrow,
    totalWidth: totalWidth
  };
}
var _default = getTotalByColumns;
exports["default"] = _default;