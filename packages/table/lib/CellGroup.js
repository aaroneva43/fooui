"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _utils = require("./utils");
var _TableContext = _interopRequireDefault(require("./TableContext"));
var _excluded = ["fixed", "width", "left", "height", "style", "classPrefix", "className", "children"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var CellGroup = /*#__PURE__*/_react["default"].forwardRef(function (props, ref) {
  var _withClassPrefix;
  var fixed = props.fixed,
    width = props.width,
    left = props.left,
    height = props.height,
    style = props.style,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'cell-group' : _props$classPrefix,
    className = props.className,
    children = props.children,
    rest = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  var _useContext = (0, _react.useContext)(_TableContext["default"]),
    translateDOMPositionXY = _useContext.translateDOMPositionXY;
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix((_withClassPrefix = {}, _withClassPrefix["fixed-" + fixed] = fixed, _withClassPrefix.scroll = !fixed, _withClassPrefix)));
  var styles = (0, _extends2["default"])({
    width: width,
    height: height
  }, style);
  translateDOMPositionXY === null || translateDOMPositionXY === void 0 ? void 0 : translateDOMPositionXY(styles, left, 0);
  return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({}, rest, {
    ref: ref,
    className: classes,
    style: styles
  }), children);
});
CellGroup.displayName = 'Table.CellGroup';
var _default = CellGroup;
exports["default"] = _default;