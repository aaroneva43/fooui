"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _isRTL = _interopRequireDefault(require("./utils/isRTL"));
var TableContext = /*#__PURE__*/_react["default"].createContext({
  rtl: (0, _isRTL["default"])(),
  isTree: false,
  hasCustomTreeCol: false
});
var _default = TableContext;
exports["default"] = _default;