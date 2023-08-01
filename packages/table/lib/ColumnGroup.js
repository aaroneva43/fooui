"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _utils = require("./utils");
var _excluded = ["header", "className", "children", "classPrefix", "headerHeight", "verticalAlign", "align", "width", "groupHeaderHeight"];
var ColumnGroup = /*#__PURE__*/_react["default"].forwardRef(function (props, ref) {
  var header = props.header,
    className = props.className,
    children = props.children,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'column-group' : _props$classPrefix,
    _props$headerHeight = props.headerHeight,
    headerHeight = _props$headerHeight === void 0 ? 80 : _props$headerHeight,
    verticalAlign = props.verticalAlign,
    align = props.align,
    width = props.width,
    groupHeightProp = props.groupHeaderHeight,
    rest = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  var groupHeight = typeof groupHeightProp !== 'undefined' ? groupHeightProp : headerHeight / 2;
  var restHeight = typeof groupHeightProp !== 'undefined' ? headerHeight - groupHeightProp : headerHeight / 2;
  var styles = {
    height: groupHeight,
    width: width
  };
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix());
  var contentStyles = (0, _extends2["default"])({}, styles, {
    textAlign: align,
    verticalAlign: verticalAlign
  });
  return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
    ref: ref,
    className: classes
  }, rest), /*#__PURE__*/_react["default"].createElement("div", {
    className: prefix('header'),
    style: styles
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: prefix('header-content'),
    style: contentStyles
  }, header)), children ? _react["default"].Children.map(children, function (node) {
    return /*#__PURE__*/_react["default"].cloneElement(node, {
      className: prefix('cell'),
      predefinedStyle: {
        height: restHeight,
        top: styles.height
      },
      headerHeight: restHeight,
      verticalAlign: node.props.verticalAlign || verticalAlign,
      children: /*#__PURE__*/_react["default"].createElement("span", {
        className: prefix('cell-content')
      }, node.props.children)
    });
  }) : null);
});
ColumnGroup.displayName = 'Table.ColumnGroup';
var _default = ColumnGroup;
exports["default"] = _default;