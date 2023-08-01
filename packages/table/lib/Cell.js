"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends4 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _omit = _interopRequireDefault(require("lodash-es/omit"));
var _isNil = _interopRequireDefault(require("lodash-es/isNil"));
var _get = _interopRequireDefault(require("lodash-es/get"));
var _constants = require("./constants");
var _utils = require("./utils");
var _TableContext = _interopRequireDefault(require("./TableContext"));
var _Column = require("./Column");
var _excluded = ["classPrefix", "width", "left", "headerHeight", "depth", "height", "style", "className", "fullText", "firstColumn", "lastColumn", "isHeaderCell", "align", "children", "rowData", "dataKey", "rowIndex", "removed", "rowKey", "rowSpan", "wordWrap", "verticalAlign", "expanded", "treeCol", "hasChildren", "predefinedStyle", "renderCell", "renderTreeToggle", "onClick", "onTreeToggle"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// import ArrowRight from '@rsuite/icons/ArrowRight';
var ArrowRight = function ArrowRight() {
  return /*#__PURE__*/_react["default"].createElement("svg", {
    viewBox: "0 0 1024 1024",
    "class": "icon",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "#000000"
  }, /*#__PURE__*/_react["default"].createElement("g", {
    id: "SVGRepo_bgCarrier",
    "stroke-width": "0"
  }), /*#__PURE__*/_react["default"].createElement("g", {
    id: "SVGRepo_tracerCarrier",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }), /*#__PURE__*/_react["default"].createElement("g", {
    id: "SVGRepo_iconCarrier"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z",
    fill: "#000000"
  })));
};
// import ArrowDown from '@rsuite/icons/ArrowDown';
var ArrowDown = function ArrowDown() {
  return 'arrowdown';
};
var groupKeys = ['groupCount', 'groupHeader', 'groupHeaderHeight', 'groupAlign', 'groupVerticalAlign', 'renderSortIcon'];
var Cell = /*#__PURE__*/_react["default"].forwardRef(function (props, ref) {
  var _extends2, _extends3;
  var _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'cell' : _props$classPrefix,
    _props$width = props.width,
    width = _props$width === void 0 ? 0 : _props$width,
    _props$left = props.left,
    left = _props$left === void 0 ? 0 : _props$left,
    _props$headerHeight = props.headerHeight,
    headerHeight = _props$headerHeight === void 0 ? _constants.ROW_HEADER_HEIGHT : _props$headerHeight,
    _props$depth = props.depth,
    depth = _props$depth === void 0 ? 0 : _props$depth,
    _props$height = props.height,
    height = _props$height === void 0 ? _constants.ROW_HEIGHT : _props$height,
    style = props.style,
    className = props.className,
    fullText = props.fullText,
    firstColumn = props.firstColumn,
    lastColumn = props.lastColumn,
    isHeaderCell = props.isHeaderCell,
    align = props.align,
    children = props.children,
    rowData = props.rowData,
    dataKey = props.dataKey,
    rowIndex = props.rowIndex,
    removed = props.removed,
    rowKey = props.rowKey,
    rowSpan = props.rowSpan,
    wordWrap = props.wordWrap,
    verticalAlign = props.verticalAlign,
    expanded = props.expanded,
    treeCol = props.treeCol,
    hasChildren = props.hasChildren,
    predefinedStyle = props.predefinedStyle,
    renderCell = props.renderCell,
    renderTreeToggle = props.renderTreeToggle,
    onClick = props.onClick,
    onTreeToggle = props.onTreeToggle,
    rest = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  var _React$useContext = _react["default"].useContext(_TableContext["default"]),
    rtl = _React$useContext.rtl,
    hasCustomTreeCol = _React$useContext.hasCustomTreeCol,
    isTree = _React$useContext.isTree;
  var isTreeCol = treeCol || !hasCustomTreeCol && firstColumn && isTree;
  var cellHeight = typeof height === 'function' ? height(rowData) : height;
  if (isTreeCol && !isHeaderCell && !rowData) {
    throw new Error('[Table.Cell]: `rowData` is required for tree column');
  }
  var handleTreeToggle = (0, _react.useCallback)(function (event) {
    onTreeToggle === null || onTreeToggle === void 0 ? void 0 : onTreeToggle(rowKey, rowIndex, rowData, event);
  }, [onTreeToggle, rowData, rowIndex, rowKey]);
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix({
    expanded: expanded && isTreeCol,
    first: firstColumn,
    last: lastColumn,
    rowspan: rowSpan && !isHeaderCell,
    'full-text': fullText
  }));
  var nextHeight = isHeaderCell ? headerHeight : cellHeight;
  var styles = (0, _extends4["default"])({}, predefinedStyle, (_extends2 = {}, _extends2[fullText ? 'minWidth' : 'width'] = width, _extends2.height = nextHeight, _extends2.zIndex = depth, _extends2[rtl ? 'right' : 'left'] = left, _extends2));
  var paddingKey = rtl ? 'paddingRight' : 'paddingLeft';
  var contentStyles = (0, _extends4["default"])({}, style, (_extends3 = {
    width: fullText ? width - 1 : width,
    height: nextHeight,
    textAlign: align
  }, _extends3[paddingKey] = isTreeCol ? depth * _constants.LAYER_WIDTH + 10 : (style === null || style === void 0 ? void 0 : style[paddingKey]) || (style === null || style === void 0 ? void 0 : style.padding), _extends3));
  if (verticalAlign) {
    contentStyles.display = 'table-cell';
    contentStyles.verticalAlign = verticalAlign;
  }
  if (wordWrap) {
    contentStyles.wordBreak = typeof wordWrap === 'boolean' ? 'break-all' : wordWrap;
    contentStyles.overflowWrap = wordWrap === 'break-word' ? wordWrap : undefined;
  }
  var cellContent = (0, _isNil["default"])(children) && rowData && dataKey ? (0, _get["default"])(rowData, dataKey) : children;
  if (typeof children === 'function') {
    cellContent = children(rowData, rowIndex);
  }
  var renderTreeNodeExpandIcon = function renderTreeNodeExpandIcon() {
    var ExpandIconComponent = expanded ? ArrowDown : ArrowRight;
    var expandButton = /*#__PURE__*/_react["default"].createElement(ExpandIconComponent, {
      className: prefix('expand-icon')
    });
    if (isTreeCol && hasChildren) {
      return /*#__PURE__*/_react["default"].createElement("span", {
        role: "button",
        tabIndex: -1,
        className: prefix('expand-wrapper'),
        onClick: handleTreeToggle
      }, renderTreeToggle ? renderTreeToggle(expandButton, rowData, expanded) : expandButton);
    }
    return null;
  };
  var content = wordWrap ? /*#__PURE__*/_react["default"].createElement("div", {
    className: prefix('wrap')
  }, renderTreeNodeExpandIcon(), renderCell ? renderCell(cellContent) : cellContent) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, renderTreeNodeExpandIcon(), renderCell ? renderCell(cellContent) : cellContent);
  if (removed) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement("div", (0, _extends4["default"])({
    ref: ref,
    role: isHeaderCell ? 'columnheader' : 'gridcell'
  }, (0, _omit["default"])(rest, [].concat(groupKeys, _Column.columnHandledProps)), {
    onClick: onClick,
    className: classes,
    style: styles
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: prefix('content'),
    style: contentStyles
  }, content));
});
Cell.displayName = 'Table.Cell';
var _default = Cell;
exports["default"] = _default;