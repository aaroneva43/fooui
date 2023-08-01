"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _translateDOMPositionXY = require("dom-lib/translateDOMPositionXY");
var _isFunction = _interopRequireDefault(require("lodash-es/isFunction"));
var _flatten = _interopRequireDefault(require("lodash-es/flatten"));
var _debounce = _interopRequireDefault(require("lodash-es/debounce"));
var _constants = require("./constants");
var _utils = require("./utils");
var _Scrollbar = _interopRequireDefault(require("./Scrollbar"));
var _CellGroup = _interopRequireDefault(require("./CellGroup"));
var _Row = _interopRequireDefault(require("./Row"));
var _TableContext = _interopRequireDefault(require("./TableContext"));
var _MouseArea = _interopRequireDefault(require("./MouseArea"));
var _Loader = _interopRequireDefault(require("./Loader"));
var _EmptyMessage = _interopRequireDefault(require("./EmptyMessage"));
var _excluded = ["affixHeader", "children", "classPrefix", "className", "data", "defaultSortType", "width", "expandedRowKeys", "defaultExpandAllRows", "defaultExpandedRowKeys", "style", "isTree", "hover", "bordered", "cellBordered", "wordWrap", "loading", "locale", "showHeader", "sortColumn", "rowHeight", "sortType", "headerHeight", "minHeight", "height", "autoHeight", "fillHeight", "rtl", "translate3d", "rowKey", "virtualized", "rowClassName", "rowExpandedHeight", "disabledScroll", "affixHorizontalScrollbar", "loadAnimation", "shouldUpdateScroll", "renderRow", "renderRowExpanded", "renderLoading", "renderEmpty", "onSortColumn", "onScroll", "renderTreeToggle", "onRowClick", "onRowContextMenu", "onExpandChange", "onTouchStart", "onTouchMove", "onTouchEnd"],
  _excluded2 = ["depth", "rowIndex"],
  _excluded3 = ["cellHeight"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Table = /*#__PURE__*/_react["default"].forwardRef(function (props, ref) {
  var affixHeader = props.affixHeader,
    children = props.children,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'rs-table' : _props$classPrefix,
    className = props.className,
    _props$data = props.data,
    dataProp = _props$data === void 0 ? [] : _props$data,
    _props$defaultSortTyp = props.defaultSortType,
    defaultSortType = _props$defaultSortTyp === void 0 ? _constants.SORT_TYPE.DESC : _props$defaultSortTyp,
    widthProp = props.width,
    expandedRowKeysProp = props.expandedRowKeys,
    defaultExpandAllRows = props.defaultExpandAllRows,
    defaultExpandedRowKeys = props.defaultExpandedRowKeys,
    style = props.style,
    isTree = props.isTree,
    _props$hover = props.hover,
    hover = _props$hover === void 0 ? true : _props$hover,
    bordered = props.bordered,
    cellBordered = props.cellBordered,
    wordWrap = props.wordWrap,
    loading = props.loading,
    _props$locale = props.locale,
    locale = _props$locale === void 0 ? {
      emptyMessage: 'No data found',
      loading: 'Loading...'
    } : _props$locale,
    _props$showHeader = props.showHeader,
    showHeader = _props$showHeader === void 0 ? true : _props$showHeader,
    sortColumn = props.sortColumn,
    _props$rowHeight = props.rowHeight,
    rowHeight = _props$rowHeight === void 0 ? _constants.ROW_HEIGHT : _props$rowHeight,
    sortTypeProp = props.sortType,
    _props$headerHeight = props.headerHeight,
    headerHeightProp = _props$headerHeight === void 0 ? _constants.ROW_HEADER_HEIGHT : _props$headerHeight,
    _props$minHeight = props.minHeight,
    minHeight = _props$minHeight === void 0 ? 0 : _props$minHeight,
    _props$height = props.height,
    height = _props$height === void 0 ? 200 : _props$height,
    autoHeight = props.autoHeight,
    fillHeight = props.fillHeight,
    rtlProp = props.rtl,
    translate3d = props.translate3d,
    rowKey = props.rowKey,
    virtualized = props.virtualized,
    rowClassName = props.rowClassName,
    _props$rowExpandedHei = props.rowExpandedHeight,
    rowExpandedHeight = _props$rowExpandedHei === void 0 ? 100 : _props$rowExpandedHei,
    disabledScroll = props.disabledScroll,
    affixHorizontalScrollbar = props.affixHorizontalScrollbar,
    loadAnimation = props.loadAnimation,
    _props$shouldUpdateSc = props.shouldUpdateScroll,
    shouldUpdateScroll = _props$shouldUpdateSc === void 0 ? true : _props$shouldUpdateSc,
    renderRowProp = props.renderRow,
    renderRowExpandedProp = props.renderRowExpanded,
    renderLoading = props.renderLoading,
    renderEmpty = props.renderEmpty,
    onSortColumn = props.onSortColumn,
    onScroll = props.onScroll,
    renderTreeToggle = props.renderTreeToggle,
    onRowClick = props.onRowClick,
    onRowContextMenu = props.onRowContextMenu,
    onExpandChange = props.onExpandChange,
    onTouchStart = props.onTouchStart,
    onTouchMove = props.onTouchMove,
    onTouchEnd = props.onTouchEnd,
    rest = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  var _useClassNames = (0, _utils.useClassNames)(classPrefix, typeof classPrefix !== 'undefined'),
    withClassPrefix = _useClassNames.withClassPrefix,
    mergeCls = _useClassNames.merge,
    prefix = _useClassNames.prefix;

  // Use `forceUpdate` to force the component to re-render after manipulating the DOM.
  var _useReducer = (0, _react.useReducer)(function (x) {
      return x + 1;
    }, 0),
    forceUpdate = _useReducer[1];
  var _useControlled = (0, _utils.useControlled)(expandedRowKeysProp, defaultExpandAllRows ? (0, _utils.findRowKeys)(dataProp, rowKey, (0, _isFunction["default"])(renderRowExpandedProp)) : defaultExpandedRowKeys || []),
    expandedRowKeys = _useControlled[0],
    setExpandedRowKeys = _useControlled[1];
  var _useState = (0, _react.useState)(function () {
      return dataProp;
    }),
    data = _useState[0],
    setData = _useState[1];

  // if (isTree) {
  //   if (!rowKey) {
  //     throw new Error('The `rowKey` is required when set isTree');
  //   } else if (data.length > 0) {
  //     if (!data[0].hasOwnProperty(rowKey)) {
  //       throw new Error('The `rowKey` is not found in data');
  //     }
  //   }
  // }

  var _useTableRows = (0, _utils.useTableRows)({
      data: dataProp,
      expandedRowKeys: expandedRowKeys,
      wordWrap: wordWrap,
      prefix: prefix
    }),
    tableRowsMaxHeight = _useTableRows.tableRowsMaxHeight,
    bindTableRowsRef = _useTableRows.bindTableRowsRef;
  var headerHeight = showHeader ? headerHeightProp : 0;
  var rtl = rtlProp || (0, _utils.isRTL)();
  var getRowHeight = function getRowHeight() {
    return typeof rowHeight === 'function' ? rowHeight() : rowHeight;
  };
  var translateDOMPositionXY = (0, _react.useRef)((0, _translateDOMPositionXY.getTranslateDOMPositionXY)({
    forceUseTransform: true,
    enable3DTransform: translate3d
  }));

  // Check for the existence of fixed columns in all column properties.
  var shouldFixedColumn = Array.from((0, _flatten["default"])(children)).some(function (child) {
    var _child$props;
    return child === null || child === void 0 ? void 0 : (_child$props = child.props) === null || _child$props === void 0 ? void 0 : _child$props.fixed;
  });

  // Check all column properties for the existence of rowSpan.
  var shouldRowSpanColumn = Array.from((0, _flatten["default"])(children)).some(function (child) {
    var _child$props2;
    return child === null || child === void 0 ? void 0 : (_child$props2 = child.props) === null || _child$props2 === void 0 ? void 0 : _child$props2.rowSpan;
  });
  var visibleRows = (0, _react.useRef)([]);
  var mouseAreaRef = (0, _react.useRef)(null);
  var tableRef = (0, _react.useRef)(null);
  var tableHeaderRef = (0, _react.useRef)(null);
  var affixHeaderWrapperRef = (0, _react.useRef)(null);
  var headerWrapperRef = (0, _react.useRef)(null);
  var tableBodyRef = (0, _react.useRef)(null);
  var wheelWrapperRef = (0, _react.useRef)(null);
  var scrollbarXRef = (0, _react.useRef)(null);
  var scrollbarYRef = (0, _react.useRef)(null);
  var handleTableResizeChange = function handleTableResizeChange(_prevSize, event) {
    forceUpdate();

    /**
     * Reset the position of the scroll bar after the table size changes.
     */
    if (typeof shouldUpdateScroll === 'function') {
      onScrollTo(shouldUpdateScroll(event));
    } else if (shouldUpdateScroll) {
      var vertical = event === 'bodyHeightChanged';
      vertical ? onScrollTop(0) : onScrollLeft(0);
    }
    if (event === 'bodyWidthChanged') {
      deferUpdatePosition();
    }
  };
  var _useTableDimension = (0, _utils.useTableDimension)({
      data: dataProp,
      width: widthProp,
      rowHeight: rowHeight,
      tableRef: tableRef,
      headerWrapperRef: headerWrapperRef,
      prefix: prefix,
      affixHeader: affixHeader,
      affixHorizontalScrollbar: affixHorizontalScrollbar,
      headerHeight: headerHeight,
      height: height,
      minHeight: minHeight,
      autoHeight: autoHeight,
      fillHeight: fillHeight,
      children: children,
      expandedRowKeys: expandedRowKeys,
      showHeader: showHeader,
      bordered: bordered,
      onTableScroll: (0, _debounce["default"])(function (coords) {
        return onScrollTo(coords);
      }, 100),
      onTableResizeChange: handleTableResizeChange
    }),
    contentHeight = _useTableDimension.contentHeight,
    contentWidth = _useTableDimension.contentWidth,
    minScrollY = _useTableDimension.minScrollY,
    minScrollX = _useTableDimension.minScrollX,
    scrollY = _useTableDimension.scrollY,
    scrollX = _useTableDimension.scrollX,
    tableWidth = _useTableDimension.tableWidth,
    tableOffset = _useTableDimension.tableOffset,
    headerOffset = _useTableDimension.headerOffset,
    setScrollY = _useTableDimension.setScrollY,
    setScrollX = _useTableDimension.setScrollX,
    getTableHeight = _useTableDimension.getTableHeight;
  (0, _utils.useAffix)({
    getTableHeight: getTableHeight,
    contentHeight: contentHeight,
    affixHorizontalScrollbar: affixHorizontalScrollbar,
    affixHeader: affixHeader,
    tableOffset: tableOffset,
    headerOffset: headerOffset,
    headerHeight: headerHeight,
    scrollbarXRef: scrollbarXRef,
    affixHeaderWrapperRef: affixHeaderWrapperRef
  });
  var _usePosition = (0, _utils.usePosition)({
      data: dataProp,
      height: height,
      tableWidth: tableWidth,
      tableRef: tableRef,
      prefix: prefix,
      translateDOMPositionXY: translateDOMPositionXY,
      wheelWrapperRef: wheelWrapperRef,
      headerWrapperRef: headerWrapperRef,
      affixHeaderWrapperRef: affixHeaderWrapperRef,
      tableHeaderRef: tableHeaderRef,
      scrollX: scrollX,
      scrollY: scrollY,
      contentWidth: contentWidth,
      shouldFixedColumn: shouldFixedColumn
    }),
    forceUpdatePosition = _usePosition.forceUpdatePosition,
    deferUpdatePosition = _usePosition.deferUpdatePosition;
  var _useScrollListener = (0, _utils.useScrollListener)({
      rtl: rtl,
      data: dataProp,
      height: height,
      virtualized: virtualized,
      getTableHeight: getTableHeight,
      contentHeight: contentHeight,
      headerHeight: headerHeight,
      autoHeight: autoHeight,
      tableBodyRef: tableBodyRef,
      scrollbarXRef: scrollbarXRef,
      scrollbarYRef: scrollbarYRef,
      disabledScroll: disabledScroll,
      loading: loading,
      tableRef: tableRef,
      contentWidth: contentWidth,
      tableWidth: tableWidth,
      scrollY: scrollY,
      minScrollY: minScrollY,
      minScrollX: minScrollX,
      scrollX: scrollX,
      setScrollX: setScrollX,
      setScrollY: setScrollY,
      forceUpdatePosition: forceUpdatePosition,
      deferUpdatePosition: deferUpdatePosition,
      onScroll: onScroll,
      onTouchStart: onTouchStart,
      onTouchMove: onTouchMove,
      onTouchEnd: onTouchEnd
    }),
    isScrolling = _useScrollListener.isScrolling,
    onScrollHorizontal = _useScrollListener.onScrollHorizontal,
    onScrollVertical = _useScrollListener.onScrollVertical,
    onScrollBody = _useScrollListener.onScrollBody,
    onScrollTop = _useScrollListener.onScrollTop,
    onScrollLeft = _useScrollListener.onScrollLeft,
    onScrollTo = _useScrollListener.onScrollTo;
  var _useCellDescriptor = (0, _utils.useCellDescriptor)({
      children: children,
      rtl: rtl,
      mouseAreaRef: mouseAreaRef,
      tableRef: tableRef,
      minScrollX: minScrollX,
      scrollX: scrollX,
      tableWidth: tableWidth,
      headerHeight: headerHeight,
      showHeader: showHeader,
      sortType: sortTypeProp,
      defaultSortType: defaultSortType,
      sortColumn: sortColumn,
      prefix: prefix,
      onSortColumn: onSortColumn,
      // Force table update after column width change, so scrollbar re-renders.
      onHeaderCellResize: forceUpdate,
      rowHeight: rowHeight
    }),
    headerCells = _useCellDescriptor.headerCells,
    bodyCells = _useCellDescriptor.bodyCells,
    allColumnsWidth = _useCellDescriptor.allColumnsWidth,
    hasCustomTreeCol = _useCellDescriptor.hasCustomTreeCol;
  var colCounts = (0, _react.useRef)((headerCells === null || headerCells === void 0 ? void 0 : headerCells.length) || 0);
  (0, _utils.useUpdateEffect)(function () {
    setData(dataProp);
  }, [dataProp, expandedRowKeys, rowKey, isTree]);
  (0, _utils.useUpdateEffect)(function () {
    if ((headerCells === null || headerCells === void 0 ? void 0 : headerCells.length) !== colCounts.current) {
      onScrollLeft(0);
      colCounts.current = (headerCells === null || headerCells === void 0 ? void 0 : headerCells.length) || 0;
    }
  }, [children]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      get root() {
        return tableRef.current;
      },
      get body() {
        return wheelWrapperRef.current;
      },
      scrollTop: onScrollTop,
      scrollLeft: onScrollLeft
    };
  });
  var rowWidth = allColumnsWidth > tableWidth.current ? allColumnsWidth : tableWidth.current;

  // Whether to show vertical scroll bar
  var hasVerticalScrollbar = !autoHeight && contentHeight.current > getTableHeight() - headerHeight;

  // Whether to show the horizontal scroll bar
  var hasHorizontalScrollbar = contentWidth.current > tableWidth.current;
  var classes = mergeCls(className, withClassPrefix({
    bordered: bordered,
    hover: hover && !shouldRowSpanColumn,
    loading: loading,
    treetable: isTree,
    'word-wrap': wordWrap,
    'cell-bordered': cellBordered
  }));
  var styles = (0, _extends2["default"])({
    width: widthProp || 'auto',
    height: getTableHeight()
  }, style);
  var renderRowExpanded = (0, _react.useCallback)(function (rowData) {
    var styles = {
      height: rowExpandedHeight
    };
    if (typeof renderRowExpandedProp === 'function') {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: prefix('row-expanded'),
        style: styles
      }, renderRowExpandedProp(rowData));
    }
    return null;
  }, [prefix, renderRowExpandedProp, rowExpandedHeight]);
  var renderRow = function renderRow(props, cells, shouldRenderExpandedRow, rowData) {
    var depth = props.depth,
      rowIndex = props.rowIndex,
      restRowProps = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded2);
    if (typeof rowClassName === 'function') {
      restRowProps.className = rowClassName(rowData, rowIndex);
    } else {
      restRowProps.className = rowClassName;
    }
    var rowStyles = (0, _extends2["default"])({}, props === null || props === void 0 ? void 0 : props.style);
    var rowRight = 0;
    if (rtl && contentWidth.current > tableWidth.current) {
      rowRight = tableWidth.current - contentWidth.current;
      rowStyles.right = rowRight;
    }
    var rowNode = null;

    // IF there are fixed columns, add a fixed group
    if (shouldFixedColumn && contentWidth.current > tableWidth.current) {
      var fixedLeftCells = [];
      var fixedRightCells = [];
      var scrollCells = [];
      var fixedLeftCellGroupWidth = 0;
      var fixedRightCellGroupWidth = 0;
      for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        var _cell$props = cell.props,
          fixed = _cell$props.fixed,
          width = _cell$props.width;
        var isFixedStart = fixed === 'left' || fixed === true;
        var isFixedEnd = fixed === 'right';
        if (rtl) {
          isFixedStart = fixed === 'right';
          isFixedEnd = fixed === 'left' || fixed === true;
        }
        if (isFixedStart) {
          fixedLeftCells.push(cell);
          fixedLeftCellGroupWidth += width;
        } else if (isFixedEnd) {
          fixedRightCells.push(cell);
          fixedRightCellGroupWidth += width;
        } else {
          scrollCells.push(cell);
        }
      }
      if (hasVerticalScrollbar && fixedRightCellGroupWidth) {
        fixedRightCellGroupWidth += _constants.SCROLLBAR_WIDTH;
      }
      rowNode = /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, fixedLeftCellGroupWidth ? /*#__PURE__*/_react["default"].createElement(_CellGroup["default"], {
        fixed: "left",
        height: props.isHeaderRow ? props.headerHeight : props.height,
        width: fixedLeftCellGroupWidth,
        style: rtl ? {
          right: tableWidth.current - fixedLeftCellGroupWidth - rowRight
        } : undefined
      }, (0, _utils.mergeCells)((0, _utils.resetLeftForCells)(fixedLeftCells))) : null, /*#__PURE__*/_react["default"].createElement(_CellGroup["default"], null, (0, _utils.mergeCells)(scrollCells)), fixedRightCellGroupWidth ? /*#__PURE__*/_react["default"].createElement(_CellGroup["default"], {
        fixed: "right",
        style: rtl ? {
          right: 0 - rowRight
        } : {
          left: tableWidth.current - fixedRightCellGroupWidth
        },
        height: props.isHeaderRow ? props.headerHeight : props.height,
        width: fixedRightCellGroupWidth
      }, (0, _utils.mergeCells)((0, _utils.resetLeftForCells)(fixedRightCells, hasVerticalScrollbar ? _constants.SCROLLBAR_WIDTH : 0))) : null, shouldRenderExpandedRow && renderRowExpanded(rowData));
    } else {
      rowNode = /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_CellGroup["default"], null, (0, _utils.mergeCells)(cells)), shouldRenderExpandedRow && renderRowExpanded(rowData));
    }
    return /*#__PURE__*/_react["default"].createElement(_Row["default"], (0, _extends2["default"])({}, restRowProps, {
      "data-depth": depth,
      style: rowStyles
    }), renderRowProp ? renderRowProp(rowNode, rowData) : rowNode);
  };
  var renderTableHeader = function renderTableHeader(headerCells, rowWidth) {
    var top = typeof affixHeader === 'number' ? affixHeader : 0;
    var rowProps = {
      // 'aria-rowindex': 1,
      rowRef: tableHeaderRef,
      width: rowWidth,
      height: getRowHeight(),
      headerHeight: headerHeight,
      isHeaderRow: true,
      top: 0,
      rowIndex: -1
    };
    var fixedStyle = {
      position: 'fixed',
      overflow: 'hidden',
      height: headerHeight,
      width: tableWidth.current,
      top: top
    };

    // Affix header
    var header = /*#__PURE__*/_react["default"].createElement("div", {
      className: prefix('affix-header'),
      style: fixedStyle,
      ref: affixHeaderWrapperRef
    }, renderRow(rowProps, headerCells));
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (affixHeader === 0 || affixHeader) && header, /*#__PURE__*/_react["default"].createElement("div", {
      role: "rowgroup",
      className: prefix('header-row-wrapper'),
      ref: headerWrapperRef
    }, renderRow(rowProps, headerCells)));
  };
  var shouldRenderExpandedRow = (0, _react.useCallback)(function (rowData) {
    if ((0, _isFunction["default"])(renderRowExpandedProp) && !isTree && rowKey && expandedRowKeys.some(function (key) {
      return key === rowData[rowKey];
    })) {
      return true;
    }
    return false;
  }, [expandedRowKeys, isTree, renderRowExpandedProp, rowKey]);
  var bindRowClick = (0, _react.useCallback)(function (rowData) {
    return function (event) {
      onRowClick === null || onRowClick === void 0 ? void 0 : onRowClick(rowData, event);
    };
  }, [onRowClick]);
  var bindRowContextMenu = (0, _react.useCallback)(function (rowData) {
    return function (event) {
      onRowContextMenu === null || onRowContextMenu === void 0 ? void 0 : onRowContextMenu(rowData, event);
    };
  }, [onRowContextMenu]);
  var handleTreeToggle = (0, _react.useCallback)(function (treeRowKey, _rowIndex, rowData) {
    var open = false;
    var nextExpandedRowKeys = [];
    for (var i = 0; i < expandedRowKeys.length; i++) {
      var key = expandedRowKeys[i];
      if (key === treeRowKey) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    }
    if (!open) {
      nextExpandedRowKeys.push(treeRowKey);
    }
    setExpandedRowKeys(nextExpandedRowKeys);
    onExpandChange === null || onExpandChange === void 0 ? void 0 : onExpandChange(!open, rowData);
  }, [expandedRowKeys, onExpandChange, setExpandedRowKeys]);

  /**
   * Records the status of merged rows.
   * { cellKey: [count,index]}
   */
  var rowSpanState = (0, _react.useRef)({});
  var renderRowData = function renderRowData(bodyCells, rowData, props, shouldRenderExpandedRow) {
    var hasChildren = isTree && rowData.children && Array.isArray(rowData.children);
    var nextRowKey = rowKey && typeof rowData[rowKey] !== 'undefined' ? rowData[rowKey] : props.key;
    var cellHeight = props.cellHeight,
      restRowProps = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded3);
    var rowProps = (0, _extends2["default"])({}, restRowProps, {
      key: nextRowKey,
      // 'aria-rowindex': (props.key as number) + 2,
      rowRef: bindTableRowsRef(props.key, rowData),
      onClick: bindRowClick(rowData),
      onContextMenu: bindRowContextMenu(rowData)
    });
    var expanded = expandedRowKeys.some(function (key) {
      return rowKey && key === rowData[rowKey];
    });
    var cells = [];
    for (var i = 0; i < bodyCells.length; i++) {
      var _cell$props2, _cell$props2$rowSpan, _cell$props3, _rowSpanState$current, _cell$props4, _rowSpanState$current2;
      var cell = bodyCells[i];
      var rowSpan = (_cell$props2 = cell.props) === null || _cell$props2 === void 0 ? void 0 : (_cell$props2$rowSpan = (_cell$props3 = _cell$props2).rowSpan) === null || _cell$props2$rowSpan === void 0 ? void 0 : _cell$props2$rowSpan.call(_cell$props3, rowData);
      var dataCellHeight = rowSpan ? rowSpan * (cellHeight || _constants.ROW_HEIGHT) : cellHeight;
      var _cellKey = cell.props.dataKey || i;

      // Record the cell state of the merged row
      if (((_rowSpanState$current = rowSpanState.current[_cellKey]) === null || _rowSpanState$current === void 0 ? void 0 : _rowSpanState$current[1]) > 0) {
        rowSpanState.current[_cellKey][1] -= 1;

        // Restart counting when merged to the last cell.
        if (rowSpanState.current[_cellKey][1] === 0) {
          rowSpanState.current[_cellKey][0] = 0;
        }
      }
      if (rowSpan) {
        // The state of the initial merged cell
        rowSpanState.current[_cellKey] = [rowSpan, rowSpan];
        rowProps.rowSpan = rowSpan;
        rowProps.style = {
          overflow: 'inherit'
        };
      }

      // Cells marked as deleted when checking for merged cell.
      var removedCell = (_cell$props4 = cell.props) !== null && _cell$props4 !== void 0 && _cell$props4.rowSpan && !rowSpan && ((_rowSpanState$current2 = rowSpanState.current[_cellKey]) === null || _rowSpanState$current2 === void 0 ? void 0 : _rowSpanState$current2[0]) !== 0 ? true : false;
      cells.push( /*#__PURE__*/_react["default"].cloneElement(cell, {
        hasChildren: hasChildren,
        rowData: rowData,
        rowIndex: props.rowIndex,
        wordWrap: wordWrap,
        height: dataCellHeight,
        depth: props.depth,
        renderTreeToggle: renderTreeToggle,
        onTreeToggle: handleTreeToggle,
        rowKey: nextRowKey,
        expanded: expanded,
        rowSpan: rowSpan,
        removed: removedCell
      }));
    }
    return renderRow(rowProps, cells, shouldRenderExpandedRow, rowData);
  };
  var renderScrollbar = function renderScrollbar() {
    var height = getTableHeight();
    if (disabledScroll) {
      return null;
    }
    var scrollbars = [];
    if (hasHorizontalScrollbar) {
      scrollbars.push( /*#__PURE__*/_react["default"].createElement(_Scrollbar["default"], {
        key: "scrollbar"
        // tableId={id}
        ,
        style: {
          width: tableWidth.current
        },
        length: tableWidth.current,
        onScroll: onScrollHorizontal,
        scrollLength: contentWidth.current,
        ref: scrollbarXRef
      }));
    }
    if (hasVerticalScrollbar) {
      scrollbars.push( /*#__PURE__*/_react["default"].createElement(_Scrollbar["default"], {
        vertical: true,
        key: "vertical-scrollbar"
        // tableId={id}
        ,
        length: height - headerHeight,
        onScroll: onScrollVertical,
        scrollLength: contentHeight.current,
        ref: scrollbarYRef
      }));
    }
    return scrollbars;
  };
  var renderTableBody = function renderTableBody(bodyCells, rowWidth) {
    var _visibleRows$current;
    var height = getTableHeight();
    var bodyHeight = height - headerHeight;
    var bodyStyles = {
      top: headerHeight,
      height: bodyHeight
    };
    var contentHeight = 0;
    var topHideHeight = 0;
    var bottomHideHeight = 0;
    visibleRows.current = [];
    if (data) {
      var top = 0; // Row position
      var minTop = Math.abs(scrollY.current);
      var maxTop = minTop + height + rowExpandedHeight;
      var isCustomRowHeight = typeof rowHeight === 'function';
      var isUncertainHeight = !!renderRowExpandedProp || isCustomRowHeight || wordWrap;

      // If virtualized is enabled and the row height in the Table is variable,
      // you need to loop through the data to get the height of each row.
      if (isUncertainHeight && virtualized || !virtualized) {
        // Avoid white screens on the top and bottom of the table when touching and scrolling on the mobile terminal.
        // So supplement the display data row.
        if ((0, _utils.isSupportTouchEvent)()) {
          var coveredHeight = height * 3;
          minTop = Math.max(minTop - coveredHeight, 0);
          maxTop = maxTop + coveredHeight;
        }
        for (var index = 0; index < data.length; index++) {
          var rowData = data[index];
          var maxHeight = tableRowsMaxHeight[index];
          var expandedRow = shouldRenderExpandedRow(rowData);
          var nextRowHeight = 0;
          var cellHeight = 0;
          if (typeof rowHeight === 'function') {
            nextRowHeight = rowHeight(rowData);
            cellHeight = nextRowHeight;
          } else {
            nextRowHeight = maxHeight ? Math.max(maxHeight + _constants.CELL_PADDING_HEIGHT, rowHeight) : rowHeight;
            cellHeight = nextRowHeight;
            if (expandedRow) {
              // If the row is expanded, the height of the expanded row is added.
              nextRowHeight += rowExpandedHeight;
            }
          }
          contentHeight += nextRowHeight;
          var rowProps = {
            key: index,
            top: top,
            rowIndex: index,
            width: rowWidth,
            depth: rowData[_constants.TREE_DEPTH],
            height: nextRowHeight,
            cellHeight: cellHeight
          };
          top += nextRowHeight;
          if (virtualized && !wordWrap) {
            if (top + nextRowHeight < minTop) {
              topHideHeight += nextRowHeight;
              continue;
            } else if (top > maxTop) {
              bottomHideHeight += nextRowHeight;
              continue;
            }
          }
          visibleRows.current.push(renderRowData(bodyCells, rowData, rowProps, expandedRow));
        }
      } else {
        /** virtualized */

        // If the row height of the Table is fixed, it is directly calculated by the row height and the number of rows,
        // thereby reducing the performance cost of traversing all data.
        var _nextRowHeight = getRowHeight();
        var startIndex = Math.max(Math.floor(minTop / _nextRowHeight), 0);
        var endIndex = Math.min(startIndex + Math.ceil(bodyHeight / _nextRowHeight) + 5, data.length);

        // Avoid white screens on the top and bottom of the table when touching and scrolling on the mobile terminal.
        // So supplement the display data row.
        if ((0, _utils.isSupportTouchEvent)()) {
          var coveredCount = Math.floor(height / _nextRowHeight * 3);
          startIndex = Math.max(startIndex - coveredCount, 0);
          endIndex = Math.min(endIndex + coveredCount, data.length);
        }
        contentHeight = data.length * _nextRowHeight;
        topHideHeight = startIndex * _nextRowHeight;
        bottomHideHeight = (data.length - endIndex) * _nextRowHeight;
        for (var _index = startIndex; _index < endIndex; _index++) {
          var _rowData = data[_index];
          var _rowProps = {
            key: _index,
            rowIndex: _index,
            depth: _rowData[_constants.TREE_DEPTH],
            top: _index * _nextRowHeight,
            width: rowWidth,
            height: _nextRowHeight,
            cellHeight: _nextRowHeight
          };
          visibleRows.current.push(renderRowData(bodyCells, _rowData, _rowProps, false));
        }
      }
    }
    var wheelStyles = {
      position: 'absolute',
      height: contentHeight,
      minHeight: height,
      pointerEvents: isScrolling ? 'none' : undefined
    };
    var topRowStyles = {
      height: topHideHeight
    };
    var bottomRowStyles = {
      height: bottomHideHeight
    };
    return /*#__PURE__*/_react["default"].createElement("div", {
      ref: tableBodyRef,
      role: "rowgroup",
      className: prefix('body-row-wrapper'),
      style: bodyStyles,
      onScroll: onScrollBody
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: wheelStyles,
      className: prefix('body-wheel-area'),
      ref: wheelWrapperRef
    }, topHideHeight ? /*#__PURE__*/_react["default"].createElement(_Row["default"], {
      style: topRowStyles,
      className: "virtualized"
    }) : null, visibleRows.current, bottomHideHeight ? /*#__PURE__*/_react["default"].createElement(_Row["default"], {
      style: bottomRowStyles,
      className: "virtualized"
    }) : null), /*#__PURE__*/_react["default"].createElement(_EmptyMessage["default"], {
      locale: locale,
      renderEmpty: renderEmpty,
      addPrefix: prefix,
      loading: !!((_visibleRows$current = visibleRows.current) !== null && _visibleRows$current !== void 0 && _visibleRows$current.length) || loading
    }), renderScrollbar(), /*#__PURE__*/_react["default"].createElement(_Loader["default"], {
      locale: locale,
      loadAnimation: loadAnimation,
      loading: loading,
      addPrefix: prefix,
      renderLoading: renderLoading
    }));
  };
  var contextValue = _react["default"].useMemo(function () {
    return {
      classPrefix: classPrefix,
      translateDOMPositionXY: translateDOMPositionXY.current,
      rtl: rtl,
      isTree: isTree,
      hasCustomTreeCol: hasCustomTreeCol
    };
  }, [classPrefix, hasCustomTreeCol, isTree, rtl]);
  return /*#__PURE__*/_react["default"].createElement(_TableContext["default"].Provider, {
    value: contextValue
  }, /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
    role: isTree ? 'treegrid' : 'grid'
    // The aria-rowcount is specified on the element with the table.
    // Its value is an integer equal to the total number of rows available, including header rows.
    ,
    "aria-rowcount": data.length + 1,
    "aria-colcount": colCounts.current,
    "aria-busy": loading
  }, rest, {
    className: classes,
    style: styles,
    ref: tableRef
  }), showHeader && renderTableHeader(headerCells, rowWidth), children && renderTableBody(bodyCells, rowWidth), showHeader && /*#__PURE__*/_react["default"].createElement(_MouseArea["default"], {
    ref: mouseAreaRef,
    addPrefix: prefix,
    headerHeight: headerHeight,
    height: getTableHeight()
  })));
});
var _default = Table;
exports["default"] = _default;