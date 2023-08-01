"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _addStyle2 = _interopRequireDefault(require("dom-lib/addStyle"));
var _addClass = _interopRequireDefault(require("dom-lib/addClass"));
var _removeClass = _interopRequireDefault(require("dom-lib/removeClass"));
var _omit = _interopRequireDefault(require("lodash-es/omit"));
var _merge = _interopRequireDefault(require("lodash-es/merge"));
var _constants = require("../constants");
var _useControlled2 = _interopRequireDefault(require("./useControlled"));
var _getTableColumns = _interopRequireDefault(require("./getTableColumns"));
var _getTotalByColumns2 = _interopRequireDefault(require("./getTotalByColumns"));
var _getColumnProps = _interopRequireDefault(require("./getColumnProps"));
var _useUpdateEffect = _interopRequireDefault(require("./useUpdateEffect"));
var _flushSync = _interopRequireDefault(require("./flushSync"));
var _useMount = _interopRequireDefault(require("./useMount"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
  var _useControlled = (0, _useControlled2["default"])(sortTypeProp, defaultSortType),
    sortType = _useControlled[0],
    setSortType = _useControlled[1];
  var _useState = (0, _react.useState)(),
    cacheData = _useState[0],
    setCacheData = _useState[1];
  var clearCache = (0, _react.useCallback)(function () {
    setCacheData(null);
  }, []);
  var setColumnResizing = (0, _react.useCallback)(function (resizing) {
    if (!tableRef.current) {
      return;
    }
    if (resizing) {
      (0, _addClass["default"])(tableRef.current, prefix('column-resizing'));
    } else {
      (0, _removeClass["default"])(tableRef.current, prefix('column-resizing'));
    }
  }, [prefix, tableRef]);
  var columnWidths = (0, _react.useRef)({});
  (0, _useMount["default"])(function () {
    // As the cells are cached before the table width is updated, it is necessary to clear the cache again. fix: #430
    clearCache();
  });
  (0, _useUpdateEffect["default"])(function () {
    clearCache();
  }, [children, sortColumn, sortType, tableWidth.current, scrollX.current, minScrollX.current]);
  (0, _useUpdateEffect["default"])(function () {
    columnWidths.current = {};
  }, [children]);
  var handleColumnResizeEnd = (0, _react.useCallback)(function (columnWidth, _cursorDelta, dataKey, index) {
    columnWidths.current[dataKey + "_" + index + "_width"] = columnWidth;
    setColumnResizing(false);
    if (mouseAreaRef.current) {
      (0, _addStyle2["default"])(mouseAreaRef.current, {
        display: 'none'
      });
    }

    // fix: https://github.com/rsuite/rsuite-table/issues/398
    (0, _flushSync["default"])(function () {
      return clearCache();
    });
    onHeaderCellResize === null || onHeaderCellResize === void 0 ? void 0 : onHeaderCellResize(columnWidth, dataKey);
  }, [clearCache, mouseAreaRef, onHeaderCellResize, setColumnResizing]);
  var handleColumnResizeMove = (0, _react.useCallback)(function (width, left, fixed) {
    var mouseAreaLeft = width + left;
    var x = mouseAreaLeft;
    var dir = 'left';
    if (rtl) {
      mouseAreaLeft += minScrollX.current + _constants.SCROLLBAR_WIDTH;
      dir = 'right';
    }
    if (!fixed) {
      x = mouseAreaLeft + (rtl ? -scrollX.current : scrollX.current);
    }
    if (mouseAreaRef.current) {
      var _addStyle;
      (0, _addStyle2["default"])(mouseAreaRef.current, (_addStyle = {
        display: 'block'
      }, _addStyle[dir] = x + "px", _addStyle));
    }
  }, [minScrollX, mouseAreaRef, rtl, scrollX]);
  var handleColumnResizeStart = (0, _react.useCallback)(function (width, left, fixed) {
    setColumnResizing(true);
    handleColumnResizeMove(width, left, fixed);
  }, [handleColumnResizeMove, setColumnResizing]);
  var handleSortColumn = (0, _react.useCallback)(function (dataKey) {
    var nextSortType = sortType;
    if (sortColumn === dataKey) {
      nextSortType = sortType === _constants.SORT_TYPE.ASC ? _constants.SORT_TYPE.DESC : _constants.SORT_TYPE.ASC;
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
  var columns = (0, _getTableColumns["default"])(children);
  var count = columns.length;
  var _getTotalByColumns = (0, _getTotalByColumns2["default"])(columns),
    totalFlexGrow = _getTotalByColumns.totalFlexGrow,
    totalWidth = _getTotalByColumns.totalWidth;
  _react["default"].Children.forEach(columns, function (column, index) {
    if ( /*#__PURE__*/_react["default"].isValidElement(column)) {
      var _columnWidths$current;
      var columnChildren = column.props.children;
      var columnProps = (0, _getColumnProps["default"])(column);
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
      var cellProps = (0, _extends2["default"])({}, (0, _omit["default"])(columnProps, ['children']), {
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
          (0, _merge["default"])(headerCellProps, {
            onResize: onResize,
            onColumnResizeEnd: handleColumnResizeEnd,
            onColumnResizeStart: handleColumnResizeStart,
            onColumnResizeMove: handleColumnResizeMove
          });
        }
        headerCells.push( /*#__PURE__*/_react["default"].cloneElement(headerCell, (0, _extends2["default"])({}, cellProps, headerCellProps)));
      }
      bodyCells.push( /*#__PURE__*/_react["default"].cloneElement(cell, cellProps));
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
var _default = useCellDescriptor;
exports["default"] = _default;