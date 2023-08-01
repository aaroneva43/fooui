"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _utils = require("./utils");
var _TableContext = _interopRequireDefault(require("./TableContext"));
var _constants = require("./constants");
var _excluded = ["classPrefix", "height", "headerHeight", "className", "width", "top", "style", "isHeaderRow", "rowRef", "children", "rowSpan"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Row = /*#__PURE__*/_react["default"].forwardRef(function (props, ref) {
  var _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'row' : _props$classPrefix,
    _props$height = props.height,
    height = _props$height === void 0 ? _constants.ROW_HEIGHT : _props$height,
    _props$headerHeight = props.headerHeight,
    headerHeight = _props$headerHeight === void 0 ? _constants.ROW_HEADER_HEIGHT : _props$headerHeight,
    className = props.className,
    width = props.width,
    top = props.top,
    style = props.style,
    isHeaderRow = props.isHeaderRow,
    rowRef = props.rowRef,
    children = props.children,
    rowSpan = props.rowSpan,
    rest = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  var _useContext = (0, _react.useContext)(_TableContext["default"]),
    translateDOMPositionXY = _useContext.translateDOMPositionXY;
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix({
    header: isHeaderRow,
    rowspan: rowSpan
  }));
  var styles = (0, _extends2["default"])({
    minWidth: width,
    height: isHeaderRow ? headerHeight : height
  }, style);
  translateDOMPositionXY === null || translateDOMPositionXY === void 0 ? void 0 : translateDOMPositionXY(styles, 0, top);
  return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
    role: "row"
  }, rest, {
    ref: (0, _utils.mergeRefs)(rowRef, ref),
    className: classes,
    style: styles
  }), children);
});
Row.displayName = 'Table.Row';
var _default = Row;
exports["default"] = _default;