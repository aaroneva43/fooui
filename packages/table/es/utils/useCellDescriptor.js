import _extends from "@babel/runtime/helpers/esm/extends";
import React, { useState, useCallback, useRef } from 'react';
import addStyle from 'dom-lib/addStyle';
import addClass from 'dom-lib/addClass';
import removeClass from 'dom-lib/removeClass';
import omit from 'lodash-es/omit';
import merge from 'lodash-es/merge';
import { SCROLLBAR_WIDTH, SORT_TYPE } from '../constants';
import useControlled from './useControlled';
import getTableColumns from './getTableColumns';
import getTotalByColumns from './getTotalByColumns';
import getColumnProps from './getColumnProps';
import useUpdateEffect from './useUpdateEffect';
import flushSync from './flushSync';
import useMount from './useMount';
/**
 * Attach rendering-related attributes to all cells of the form and cache them.
 * @param props
 * @returns
 */
var useCellDescriptor = function useCellDescriptor(props) {
  var children = props.children,
    rtl = props.rtl,
    mouseAreaRef = props.mouseAreaRef,
    tableRef = props.tableRef,
    minScrollX = props.minScrollX,
    scrollX = props.scrollX,
    tableWidth = props.tableWidth,
    headerHeight = props.headerHeight,
    showHeader = props.showHeader,
    sortTypeProp = props.sortType,
    defaultSortType = props.defaultSortType,
    sortColumn = props.sortColumn,
    rowHeight = props.rowHeight,
    onSortColumn = props.onSortColumn,
    onHeaderCellResize = props.onHeaderCellResize,
    prefix = props.prefix;
  var _useControlled = useControlled(sortTypeProp, defaultSortType),
    sortType = _useControlled[0],
    setSortType = _useControlled[1];
  var _useState = useState(),
    cacheData = _useState[0],
    setCacheData = _useState[1];
  var clearCache = useCallback(function () {
    setCacheData(null);
  }, []);
  var setColumnResizing = useCallback(function (resizing) {
    if (!tableRef.current) {
      return;
    }
    if (resizing) {
      addClass(tableRef.current, prefix('column-resizing'));
    } else {
      removeClass(tableRef.current, prefix('column-resizing'));
    }
  }, [prefix, tableRef]);
  var columnWidths = useRef({});
  useMount(function () {
    // As the cells are cached before the table width is updated, it is necessary to clear the cache again. fix: #430
    clearCache();
  });
  useUpdateEffect(function () {
    clearCache();
  }, [children, sortColumn, sortType, tableWidth.current, scrollX.current, minScrollX.current]);
  useUpdateEffect(function () {
    columnWidths.current = {};
  }, [children]);
  var handleColumnResizeEnd = useCallback(function (columnWidth, _cursorDelta, dataKey, index) {
    columnWidths.current[dataKey + "_" + index + "_width"] = columnWidth;
    setColumnResizing(false);
    if (mouseAreaRef.current) {
      addStyle(mouseAreaRef.current, {
        display: 'none'
      });
    }

    // fix: https://github.com/rsuite/rsuite-table/issues/398
    flushSync(function () {
      return clearCache();
    });
    onHeaderCellResize === null || onHeaderCellResize === void 0 ? void 0 : onHeaderCellResize(columnWidth, dataKey);
  }, [clearCache, mouseAreaRef, onHeaderCellResize, setColumnResizing]);
  var handleColumnResizeMove = useCallback(function (width, left, fixed) {
    var mouseAreaLeft = width + left;
    var x = mouseAreaLeft;
    var dir = 'left';
    if (rtl) {
      mouseAreaLeft += minScrollX.current + SCROLLBAR_WIDTH;
      dir = 'right';
    }
    if (!fixed) {
      x = mouseAreaLeft + (rtl ? -scrollX.current : scrollX.current);
    }
    if (mouseAreaRef.current) {
      var _addStyle;
      addStyle(mouseAreaRef.current, (_addStyle = {
        display: 'block'
      }, _addStyle[dir] = x + "px", _addStyle));
    }
  }, [minScrollX, mouseAreaRef, rtl, scrollX]);
  var handleColumnResizeStart = useCallback(function (width, left, fixed) {
    setColumnResizing(true);
    handleColumnResizeMove(width, left, fixed);
  }, [handleColumnResizeMove, setColumnResizing]);
  var handleSortColumn = useCallback(function (dataKey) {
    var nextSortType = sortType;
    if (sortColumn === dataKey) {
      nextSortType = sortType === SORT_TYPE.ASC ? SORT_TYPE.DESC : SORT_TYPE.ASC;
      setSortType(nextSortType);
    }
    onSortColumn === null || onSortColumn === void 0 ? void 0 : onSortColumn(dataKey, nextSortType);
  }, [onSortColumn, setSortType, sortColumn, sortType]);
  if (cacheData) {
    return cacheData;
  }
  var hasCustomTreeCol = false;
  var left = 0; // Cell left margin
  var headerCells = []; // Table header cell
  var bodyCells = []; // Table body cell

  if (!children) {
    var _cacheCell = {
      columns: [],
      headerCells: headerCells,
      bodyCells: bodyCells,
      hasCustomTreeCol: hasCustomTreeCol,
      allColumnsWidth: left
    };
    setCacheData(_cacheCell);
    return _cacheCell;
  }
  var columns = getTableColumns(children);
  var count = columns.length;
  var _getTotalByColumns = getTotalByColumns(columns),
    totalFlexGrow = _getTotalByColumns.totalFlexGrow,
    totalWidth = _getTotalByColumns.totalWidth;
  React.Children.forEach(columns, function (column, index) {
    if ( /*#__PURE__*/React.isValidElement(column)) {
      var _columnWidths$current;
      var columnChildren = column.props.children;
      var columnProps = getColumnProps(column);
      var _width = columnProps.width,
        resizable = columnProps.resizable,
        flexGrow = columnProps.flexGrow,
        minWidth = columnProps.minWidth,
        onResize = columnProps.onResize,
        treeCol = columnProps.treeCol;
      if (treeCol) {
        hasCustomTreeCol = true;
      }
      if (columnChildren.length !== 2) {
        throw new Error("Component <HeaderCell> and <Cell> is required, column index: " + index + " ");
      }
      var headerCell = columnChildren[0];
      var cell = columnChildren[1];
      var currentWidth = (_columnWidths$current = columnWidths.current) === null || _columnWidths$current === void 0 ? void 0 : _columnWidths$current[cell.props.dataKey + "_" + index + "_width"];
      var cellWidth = currentWidth || _width || 0;
      if (tableWidth.current && flexGrow && totalFlexGrow) {
        var grewWidth = Math.max((tableWidth.current - totalWidth) / totalFlexGrow * flexGrow, minWidth || 60);
        /**
         * resizable = false, width will be recalc when table render.
         * resizable = true, only first render will use grewWidth.
         */
        cellWidth = resizable ? currentWidth || grewWidth : grewWidth;
      }
      var cellProps = _extends({}, omit(columnProps, ['children']), {
        'aria-colindex': index + 1,
        left: left,
        headerHeight: headerHeight,
        key: index,
        width: cellWidth,
        height: typeof rowHeight === 'function' ? rowHeight() : rowHeight,
        firstColumn: index === 0,
        lastColumn: index === count - 1
      });
      if (showHeader && headerHeight) {
        var headerCellProps = {
          // Resizable column
          // `index` is used to define the serial number when dragging the column width
          index: index,
          dataKey: cell.props.dataKey,
          isHeaderCell: true,
          minWidth: columnProps.minWidth,
          sortable: columnProps.sortable,
          onSortColumn: handleSortColumn,
          sortType: sortType,
          sortColumn: sortColumn,
          flexGrow: resizable ? undefined : flexGrow
        };
        if (resizable) {
          merge(headerCellProps, {
            onResize: onResize,
            onColumnResizeEnd: handleColumnResizeEnd,
            onColumnResizeStart: handleColumnResizeStart,
            onColumnResizeMove: handleColumnResizeMove
          });
        }
        headerCells.push( /*#__PURE__*/React.cloneElement(headerCell, _extends({}, cellProps, headerCellProps)));
      }
      bodyCells.push( /*#__PURE__*/React.cloneElement(cell, cellProps));
      left += cellWidth;
    }
  });
  var cacheCell = {
    columns: columns,
    headerCells: headerCells,
    bodyCells: bodyCells,
    allColumnsWidth: left,
    hasCustomTreeCol: hasCustomTreeCol
  };
  setCacheData(cacheCell);
  return cacheCell;
};
export default useCellDescriptor;