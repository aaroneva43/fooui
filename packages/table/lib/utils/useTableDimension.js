"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _react = require("react");
var _getWidth = _interopRequireDefault(require("dom-lib/getWidth"));
var _getHeight = _interopRequireDefault(require("dom-lib/getHeight"));
var _getOffset = _interopRequireDefault(require("dom-lib/getOffset"));
var _constants = require("../constants");
var _resizeObserver = require("@juggle/resize-observer");
var _useMount = _interopRequireDefault(require("./useMount"));
var _useUpdateLayoutEffect = _interopRequireDefault(require("./useUpdateLayoutEffect"));
var _isNumberOrTrue = _interopRequireDefault(require("./isNumberOrTrue"));
var _debounce = _interopRequireDefault(require("lodash-es/debounce"));
/**
 * The dimension information of the table,
 * including the height, width, scrollable distance and the coordinates of the scroll handle, etc.
 * @param props
 * @returns
 */
var useTableDimension = function useTableDimension(props) {
  var data = props.data,
    rowHeight = props.rowHeight,
    tableRef = props.tableRef,
    headerWrapperRef = props.headerWrapperRef,
    prefix = props.prefix,
    widthProp = props.width,
    affixHeader = props.affixHeader,
    affixHorizontalScrollbar = props.affixHorizontalScrollbar,
    headerHeight = props.headerHeight,
    heightProp = props.height,
    autoHeight = props.autoHeight,
    minHeight = props.minHeight,
    fillHeight = props.fillHeight,
    children = props.children,
    expandedRowKeys = props.expandedRowKeys,
    showHeader = props.showHeader,
    bordered = props.bordered,
    onTableResizeChange = props.onTableResizeChange,
    onTableScroll = props.onTableScroll;
  var contentHeight = (0, _react.useRef)(0);
  var contentWidth = (0, _react.useRef)(0);
  var minScrollY = (0, _react.useRef)(0);
  var scrollY = (0, _react.useRef)(0);
  var scrollX = (0, _react.useRef)(0);
  var minScrollX = (0, _react.useRef)(0);
  var tableWidth = (0, _react.useRef)(widthProp || 0);
  var tableHeight = (0, _react.useRef)(heightProp || 0);
  var columnCount = (0, _react.useRef)(0);
  var resizeObserver = (0, _react.useRef)();
  var containerResizeObserver = (0, _react.useRef)();
  var headerOffset = (0, _react.useRef)(null);
  var tableOffset = (0, _react.useRef)(null);
  var getRowHeight = (0, _react.useCallback)(function (rowData) {
    return typeof rowHeight === 'function' ? rowHeight(rowData) : rowHeight;
  }, [rowHeight]);
  var calculateTableContextHeight = (0, _react.useCallback)(function () {
    var _table$querySelectorA;
    var prevContentHeight = contentHeight.current;
    var table = tableRef === null || tableRef === void 0 ? void 0 : tableRef.current;
    var rows = (table === null || table === void 0 ? void 0 : table.querySelectorAll("." + (prefix === null || prefix === void 0 ? void 0 : prefix('row')))) || [];
    var virtualized = (table === null || table === void 0 ? void 0 : (_table$querySelectorA = table.querySelectorAll('.virtualized')) === null || _table$querySelectorA === void 0 ? void 0 : _table$querySelectorA.length) > 0;
    var nextContentHeight = rows.length ? Array.from(rows).map(function (row, index) {
      return (0, _getHeight["default"])(row) || getRowHeight(data === null || data === void 0 ? void 0 : data[index]);
    }).reduce(function (x, y) {
      return x + y;
    }) : 0;

    // After setting the affixHeader property, the height of the two headers should be subtracted.
    contentHeight.current = Math.round(nextContentHeight - (affixHeader ? headerHeight * 2 : headerHeight));

    // Whether to show the horizontal scroll bar
    var hasHorizontalScrollbar = contentWidth.current > tableWidth.current;

    // The height of the table content area should be added to the height occupied by the horizontal scroll bar when autoHeight is set.
    if (autoHeight && hasHorizontalScrollbar) {
      contentHeight.current += _constants.SCROLLBAR_WIDTH;
    }
    var height = fillHeight ? tableHeight.current : heightProp;
    var tableBodyHeight = showHeader ? height - headerHeight : height;
    if (!autoHeight) {
      /**
       *  The purpose of subtracting SCROLLBAR_WIDTH is to keep the scroll bar from blocking the content part.
       *  But it will only be calculated when there is a horizontal scroll bar (contentWidth > tableWidth).
       */
      minScrollY.current = -(nextContentHeight - height) - (hasHorizontalScrollbar ? _constants.SCROLLBAR_WIDTH : 0);
    }

    // If the height of the content area is less than the height of the table, the vertical scroll bar is reset.
    if (nextContentHeight < height) {
      onTableScroll === null || onTableScroll === void 0 ? void 0 : onTableScroll({
        y: 0
      });
    }
    var currentScrollTop = Math.abs(scrollY.current);

    // When Table is set to virtualized, the logic will be entered every time the wheel event is
    // triggered to avoid resetting the scroll bar after scrolling to the bottom, so add the SCROLLBAR_WIDTH value.
    var maxScrollTop = nextContentHeight + _constants.SCROLLBAR_WIDTH - tableBodyHeight;

    // If the top value of the current scroll is greater than the scrollable range,
    // keep the vertical scroll bar at the bottom.
    if (maxScrollTop > 0 && currentScrollTop > maxScrollTop) {
      if (virtualized) {
        onTableScroll === null || onTableScroll === void 0 ? void 0 : onTableScroll({
          y: ((data === null || data === void 0 ? void 0 : data.length) || 0) * getRowHeight() - tableBodyHeight
        });
      } else {
        onTableScroll === null || onTableScroll === void 0 ? void 0 : onTableScroll({
          y: maxScrollTop
        });
      }
    }
    if (prevContentHeight !== contentHeight.current) {
      onTableResizeChange === null || onTableResizeChange === void 0 ? void 0 : onTableResizeChange(prevContentHeight, 'bodyHeightChanged');
    }
  }, [tableRef, prefix, affixHeader, headerHeight, autoHeight, fillHeight, heightProp, showHeader, getRowHeight, data, onTableScroll, onTableResizeChange]);
  var setOffsetByAffix = (0, _react.useCallback)(function () {
    var headerNode = headerWrapperRef === null || headerWrapperRef === void 0 ? void 0 : headerWrapperRef.current;
    if ((0, _isNumberOrTrue["default"])(affixHeader) && headerNode) {
      headerOffset.current = (0, _getOffset["default"])(headerNode);
    }
    if ((0, _isNumberOrTrue["default"])(affixHorizontalScrollbar) && tableRef !== null && tableRef !== void 0 && tableRef.current) {
      tableOffset.current = (0, _getOffset["default"])(tableRef === null || tableRef === void 0 ? void 0 : tableRef.current);
    }
  }, [affixHeader, affixHorizontalScrollbar, headerWrapperRef, tableRef]);
  var calculateTableContentWidth = (0, _react.useCallback)(function () {
    var prevWidth = contentWidth.current;
    var prevColumnCount = columnCount.current;
    var table = tableRef === null || tableRef === void 0 ? void 0 : tableRef.current;
    var row = table === null || table === void 0 ? void 0 : table.querySelector("." + prefix('row') + ":not(.virtualized)");
    var nextContentWidth = row ? (0, _getWidth["default"])(row) : 0;
    contentWidth.current = nextContentWidth - (autoHeight ? _constants.SCROLLBAR_WIDTH : 0);
    columnCount.current = (row === null || row === void 0 ? void 0 : row.querySelectorAll("." + prefix('cell')).length) || 0;

    // The value of SCROLLBAR_WIDTH is subtracted so that the scroll bar does not block the content part.
    // There is no vertical scroll bar after autoHeight.
    var minScrollWidth = -(nextContentWidth - tableWidth.current) - (autoHeight ? 0 : _constants.SCROLLBAR_WIDTH);
    if (minScrollX.current !== minScrollWidth) {
      minScrollX.current = minScrollWidth;
      if (scrollX.current < minScrollWidth) {
        // fix: 405#issuecomment-1464831646
        scrollX.current = minScrollWidth;
      }
    }

    /**
     * If the width of the content area and the number of columns change,
     * the horizontal scroll bar is reset.
     * fix: https://github.com/rsuite/rsuite/issues/2039
     */
    if (prevWidth > 0 && prevWidth !== contentWidth.current || prevColumnCount > 0 && prevColumnCount !== columnCount.current) {
      onTableResizeChange === null || onTableResizeChange === void 0 ? void 0 : onTableResizeChange(prevWidth, 'bodyWidthChanged');
    }
  }, [autoHeight, onTableResizeChange, prefix, tableRef]);
  var calculateTableWidth = (0, _react.useCallback)(function (nextWidth) {
    var prevWidth = tableWidth.current;
    if (tableRef !== null && tableRef !== void 0 && tableRef.current) {
      tableWidth.current = nextWidth || (0, _getWidth["default"])(tableRef === null || tableRef === void 0 ? void 0 : tableRef.current);
    }
    if (prevWidth && prevWidth !== tableWidth.current) {
      scrollX.current = 0;
      onTableResizeChange === null || onTableResizeChange === void 0 ? void 0 : onTableResizeChange(prevWidth, 'widthChanged');
    }
    setOffsetByAffix();
  }, [onTableResizeChange, setOffsetByAffix, tableRef]);
  var calculateTableHeight = (0, _react.useCallback)(function (nextHeight) {
    var prevHeight = tableHeight.current;
    if (nextHeight) {
      tableHeight.current = nextHeight;
    } else if (tableRef !== null && tableRef !== void 0 && tableRef.current) {
      tableHeight.current = (0, _getHeight["default"])(tableRef.current.parentNode);
    }
    if (prevHeight && prevHeight !== tableHeight.current) {
      onTableResizeChange === null || onTableResizeChange === void 0 ? void 0 : onTableResizeChange(prevHeight, 'heightChanged');
    }
  }, [onTableResizeChange, tableRef]);
  (0, _useMount["default"])(function () {
    var _tableRef$current;
    calculateTableContextHeight();
    calculateTableContentWidth();
    calculateTableWidth();
    calculateTableHeight();
    setOffsetByAffix();
    containerResizeObserver.current = new _resizeObserver.ResizeObserver(function (entries) {
      calculateTableHeight(entries[0].contentRect.height);
    });
    containerResizeObserver.current.observe(tableRef === null || tableRef === void 0 ? void 0 : (_tableRef$current = tableRef.current) === null || _tableRef$current === void 0 ? void 0 : _tableRef$current.parentNode);
    var changeTableWidthWhenResize = (0, _debounce["default"])(function (entries) {
      var width = entries[0].contentRect.width;
      // bordered table width is 1px larger than the container width. fix: #405 #404
      var widthWithBorder = width + 2;
      calculateTableWidth(bordered ? widthWithBorder : width);
    }, 20);
    resizeObserver.current = new _resizeObserver.ResizeObserver(changeTableWidthWhenResize);
    resizeObserver.current.observe(tableRef === null || tableRef === void 0 ? void 0 : tableRef.current);
    return function () {
      var _resizeObserver$curre, _containerResizeObser;
      (_resizeObserver$curre = resizeObserver.current) === null || _resizeObserver$curre === void 0 ? void 0 : _resizeObserver$curre.disconnect();
      (_containerResizeObser = containerResizeObserver.current) === null || _containerResizeObser === void 0 ? void 0 : _containerResizeObser.disconnect();
    };
  });
  (0, _useUpdateLayoutEffect["default"])(function () {
    calculateTableHeight();
    calculateTableContextHeight();
  }, [fillHeight]);
  (0, _useUpdateLayoutEffect["default"])(function () {
    calculateTableWidth();
    calculateTableContentWidth();
    calculateTableContextHeight();
  }, [data, heightProp, contentHeight.current, expandedRowKeys, children, calculateTableContextHeight, calculateTableContentWidth]);
  var setScrollY = (0, _react.useCallback)(function (value) {
    scrollY.current = value;
  }, []);
  var setScrollX = (0, _react.useCallback)(function (value) {
    scrollX.current = value;
  }, []);
  var getTableHeight = function getTableHeight() {
    if (fillHeight) {
      return tableHeight.current;
    }
    if ((data === null || data === void 0 ? void 0 : data.length) === 0 && autoHeight) {
      return heightProp;
    }
    return autoHeight ? Math.max(headerHeight + contentHeight.current, minHeight) : heightProp;
  };
  return {
    contentHeight: contentHeight,
    contentWidth: contentWidth,
    minScrollY: minScrollY,
    minScrollX: minScrollX,
    scrollY: scrollY,
    scrollX: scrollX,
    tableWidth: tableWidth,
    headerOffset: headerOffset,
    tableOffset: tableOffset,
    getTableHeight: getTableHeight,
    setScrollY: setScrollY,
    setScrollX: setScrollX
  };
};
var _default = useTableDimension;
exports["default"] = _default;