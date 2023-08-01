"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _isNil = _interopRequireDefault(require("lodash-es/isNil"));
var _ColumnResizeHandler = _interopRequireDefault(require("./ColumnResizeHandler"));
var _utils = require("./utils");
var _Cell = _interopRequireDefault(require("./Cell"));
var _excluded = ["className", "classPrefix", "width", "dataKey", "headerHeight", "children", "left", "sortable", "sortColumn", "sortType", "groupHeader", "resizable", "fixed", "minWidth", "index", "flexGrow", "align", "verticalAlign", "onColumnResizeEnd", "onResize", "onColumnResizeStart", "onColumnResizeMove", "onSortColumn", "renderSortIcon"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// import Sort from '@rsuite/icons/Sort';
var Sort = function Sort() {
  return 'sort';
};
// import SortUp from '@rsuite/icons/SortUp';
var SortUp = function SortUp() {
  return 'up';
};
// import SortDown from '@rsuite/icons/SortDown';
var SortDown = function SortDown() {
  return 'down';
};
var SORTED_ICON = {
  desc: SortDown,
  asc: SortUp
};
var HeaderCell = /*#__PURE__*/_react["default"].forwardRef(function (props, ref) {
  var className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'cell-header' : _props$classPrefix,
    width = props.width,
    dataKey = props.dataKey,
    headerHeight = props.headerHeight,
    children = props.children,
    left = props.left,
    sortable = props.sortable,
    sortColumn = props.sortColumn,
    sortType = props.sortType,
    groupHeader = props.groupHeader,
    resizable = props.resizable,
    fixed = props.fixed,
    minWidth = props.minWidth,
    index = props.index,
    flexGrow = props.flexGrow,
    align = props.align,
    verticalAlign = props.verticalAlign,
    onColumnResizeEnd = props.onColumnResizeEnd,
    onResize = props.onResize,
    onColumnResizeStart = props.onColumnResizeStart,
    onColumnResizeMove = props.onColumnResizeMove,
    onSortColumn = props.onSortColumn,
    renderSortIcon = props.renderSortIcon,
    rest = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  var _useState = (0, _react.useState)((0, _isNil["default"])(flexGrow) ? width : 0),
    columnWidth = _useState[0],
    setColumnWidth = _useState[1];
  (0, _utils.useUpdateEffect)(function () {
    setColumnWidth((0, _isNil["default"])(flexGrow) ? width : 0);
  }, [flexGrow, width]);
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix({
    sortable: sortable
  }));
  var ariaSort;
  if (sortColumn === dataKey) {
    ariaSort = 'other';
    if (sortType === 'asc') {
      ariaSort = 'ascending';
    } else if (sortType === 'desc') {
      ariaSort = 'descending';
    }
  }
  var handleClick = (0, _react.useCallback)(function () {
    if (sortable) {
      onSortColumn === null || onSortColumn === void 0 ? void 0 : onSortColumn(dataKey);
    }
  }, [dataKey, onSortColumn, sortable]);
  var handleColumnResizeStart = (0, _react.useCallback)(function () {
    onColumnResizeStart === null || onColumnResizeStart === void 0 ? void 0 : onColumnResizeStart(columnWidth, left, !!fixed);
  }, [columnWidth, fixed, left, onColumnResizeStart]);
  var handleColumnResizeEnd = (0, _react.useCallback)(function (nextColumnWidth, cursorDelta) {
    setColumnWidth(nextColumnWidth);
    onColumnResizeEnd === null || onColumnResizeEnd === void 0 ? void 0 : onColumnResizeEnd(nextColumnWidth, cursorDelta, dataKey, index);
    onResize === null || onResize === void 0 ? void 0 : onResize(nextColumnWidth, dataKey);
  }, [dataKey, index, onColumnResizeEnd, onResize]);
  var renderSortColumn = function renderSortColumn() {
    if (sortable && !groupHeader) {
      var _classNames;
      var SortIcon = sortColumn === dataKey && sortType ? SORTED_ICON[sortType] : Sort;
      var iconClasses = (0, _classnames["default"])(prefix('icon-sort'), (_classNames = {}, _classNames[prefix("icon-sort-" + sortType)] = sortColumn === dataKey, _classNames));
      var sortIcon = renderSortIcon ? renderSortIcon(sortColumn === dataKey ? sortType : undefined) : /*#__PURE__*/_react["default"].createElement(SortIcon, {
        className: iconClasses
      });
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: prefix('sort-wrapper')
      }, sortIcon);
    }
    return null;
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: ref,
    className: classes
  }, /*#__PURE__*/_react["default"].createElement(_Cell["default"], (0, _extends2["default"])({
    "aria-sort": ariaSort
  }, rest, {
    width: width,
    dataKey: dataKey,
    left: left,
    headerHeight: headerHeight,
    isHeaderCell: true,
    align: !groupHeader ? align : undefined,
    verticalAlign: !groupHeader ? verticalAlign : undefined,
    onClick: !groupHeader ? handleClick : undefined
  }), children, renderSortColumn()), resizable ? /*#__PURE__*/_react["default"].createElement(_ColumnResizeHandler["default"], {
    defaultColumnWidth: columnWidth,
    key: columnWidth,
    columnLeft: left,
    columnFixed: fixed,
    height: headerHeight ? headerHeight - 1 : undefined,
    minWidth: minWidth,
    onColumnResizeMove: onColumnResizeMove,
    onColumnResizeStart: handleColumnResizeStart,
    onColumnResizeEnd: handleColumnResizeEnd
  }) : null);
});
HeaderCell.displayName = 'HeaderCell';
var _default = HeaderCell;
exports["default"] = _default;