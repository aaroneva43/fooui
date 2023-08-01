import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["classPrefix", "width", "left", "headerHeight", "depth", "height", "style", "className", "fullText", "firstColumn", "lastColumn", "isHeaderCell", "align", "children", "rowData", "dataKey", "rowIndex", "removed", "rowKey", "rowSpan", "wordWrap", "verticalAlign", "expanded", "treeCol", "hasChildren", "predefinedStyle", "renderCell", "renderTreeToggle", "onClick", "onTreeToggle"];
import React, { useCallback } from 'react';
import omit from 'lodash-es/omit';
import isNil from 'lodash-es/isNil';
import get from 'lodash-es/get';
import { LAYER_WIDTH, ROW_HEADER_HEIGHT, ROW_HEIGHT } from './constants';
import { useClassNames } from './utils';
import TableContext from './TableContext';
// import ArrowRight from '@rsuite/icons/ArrowRight';
var ArrowRight = function ArrowRight() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 1024 1024",
    "class": "icon",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "#000000"
  }, /*#__PURE__*/React.createElement("g", {
    id: "SVGRepo_bgCarrier",
    "stroke-width": "0"
  }), /*#__PURE__*/React.createElement("g", {
    id: "SVGRepo_tracerCarrier",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }), /*#__PURE__*/React.createElement("g", {
    id: "SVGRepo_iconCarrier"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z",
    fill: "#000000"
  })));
};
// import ArrowDown from '@rsuite/icons/ArrowDown';
var ArrowDown = function ArrowDown() {
  return 'arrowdown';
};
import { columnHandledProps } from './Column';
var groupKeys = ['groupCount', 'groupHeader', 'groupHeaderHeight', 'groupAlign', 'groupVerticalAlign', 'renderSortIcon'];
var Cell = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _extends2, _extends3;
  var _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'cell' : _props$classPrefix,
    _props$width = props.width,
    width = _props$width === void 0 ? 0 : _props$width,
    _props$left = props.left,
    left = _props$left === void 0 ? 0 : _props$left,
    _props$headerHeight = props.headerHeight,
    headerHeight = _props$headerHeight === void 0 ? ROW_HEADER_HEIGHT : _props$headerHeight,
    _props$depth = props.depth,
    depth = _props$depth === void 0 ? 0 : _props$depth,
    _props$height = props.height,
    height = _props$height === void 0 ? ROW_HEIGHT : _props$height,
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
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _React$useContext = React.useContext(TableContext),
    rtl = _React$useContext.rtl,
    hasCustomTreeCol = _React$useContext.hasCustomTreeCol,
    isTree = _React$useContext.isTree;
  var isTreeCol = treeCol || !hasCustomTreeCol && firstColumn && isTree;
  var cellHeight = typeof height === 'function' ? height(rowData) : height;
  if (isTreeCol && !isHeaderCell && !rowData) {
    throw new Error('[Table.Cell]: `rowData` is required for tree column');
  }
  var handleTreeToggle = useCallback(function (event) {
    onTreeToggle === null || onTreeToggle === void 0 ? void 0 : onTreeToggle(rowKey, rowIndex, rowData, event);
  }, [onTreeToggle, rowData, rowIndex, rowKey]);
  var _useClassNames = useClassNames(classPrefix),
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
  var styles = _extends({}, predefinedStyle, (_extends2 = {}, _extends2[fullText ? 'minWidth' : 'width'] = width, _extends2.height = nextHeight, _extends2.zIndex = depth, _extends2[rtl ? 'right' : 'left'] = left, _extends2));
  var paddingKey = rtl ? 'paddingRight' : 'paddingLeft';
  var contentStyles = _extends({}, style, (_extends3 = {
    width: fullText ? width - 1 : width,
    height: nextHeight,
    textAlign: align
  }, _extends3[paddingKey] = isTreeCol ? depth * LAYER_WIDTH + 10 : (style === null || style === void 0 ? void 0 : style[paddingKey]) || (style === null || style === void 0 ? void 0 : style.padding), _extends3));
  if (verticalAlign) {
    contentStyles.display = 'table-cell';
    contentStyles.verticalAlign = verticalAlign;
  }
  if (wordWrap) {
    contentStyles.wordBreak = typeof wordWrap === 'boolean' ? 'break-all' : wordWrap;
    contentStyles.overflowWrap = wordWrap === 'break-word' ? wordWrap : undefined;
  }
  var cellContent = isNil(children) && rowData && dataKey ? get(rowData, dataKey) : children;
  if (typeof children === 'function') {
    cellContent = children(rowData, rowIndex);
  }
  var renderTreeNodeExpandIcon = function renderTreeNodeExpandIcon() {
    var ExpandIconComponent = expanded ? ArrowDown : ArrowRight;
    var expandButton = /*#__PURE__*/React.createElement(ExpandIconComponent, {
      className: prefix('expand-icon')
    });
    if (isTreeCol && hasChildren) {
      return /*#__PURE__*/React.createElement("span", {
        role: "button",
        tabIndex: -1,
        className: prefix('expand-wrapper'),
        onClick: handleTreeToggle
      }, renderTreeToggle ? renderTreeToggle(expandButton, rowData, expanded) : expandButton);
    }
    return null;
  };
  var content = wordWrap ? /*#__PURE__*/React.createElement("div", {
    className: prefix('wrap')
  }, renderTreeNodeExpandIcon(), renderCell ? renderCell(cellContent) : cellContent) : /*#__PURE__*/React.createElement(React.Fragment, null, renderTreeNodeExpandIcon(), renderCell ? renderCell(cellContent) : cellContent);
  if (removed) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    role: isHeaderCell ? 'columnheader' : 'gridcell'
  }, omit(rest, [].concat(groupKeys, columnHandledProps)), {
    onClick: onClick,
    className: classes,
    style: styles
  }), /*#__PURE__*/React.createElement("div", {
    className: prefix('content'),
    style: contentStyles
  }, content));
});
Cell.displayName = 'Table.Cell';
export default Cell;