"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _isFunction = _interopRequireDefault(require("lodash-es/isFunction"));
var _get = _interopRequireDefault(require("lodash-es/get"));
var _isNil = _interopRequireDefault(require("lodash-es/isNil"));
var _ColumnGroup = _interopRequireDefault(require("../ColumnGroup"));
var _HeaderCell = _interopRequireDefault(require("../HeaderCell"));
function cloneCell(Cell, props) {
  return /*#__PURE__*/_react["default"].cloneElement(Cell, props);
}
function mergeCells(cells) {
  var nextCells = [];
  for (var i = 0; i < cells.length; i += 1) {
    var _cells$i$props = cells[i].props,
      width = _cells$i$props.width,
      colSpan = _cells$i$props.colSpan,
      groupCount = _cells$i$props.groupCount,
      groupHeader = _cells$i$props.groupHeader,
      groupAlign = _cells$i$props.groupAlign,
      groupVerticalAlign = _cells$i$props.groupVerticalAlign,
      isHeaderCell = _cells$i$props.isHeaderCell,
      headerHeight = _cells$i$props.headerHeight,
      groupHeaderHeight = _cells$i$props.groupHeaderHeight;
    var groupChildren = [];

    // Add grouping to column headers.
    if (groupCount && isHeaderCell) {
      var nextWidth = width;
      var left = 0;
      for (var j = 0; j < groupCount; j += 1) {
        var nextCell = cells[i + j];
        var _nextCell$props = nextCell.props,
          nextCellWidth = _nextCell$props.width,
          sortable = _nextCell$props.sortable,
          children = _nextCell$props.children,
          dataKey = _nextCell$props.dataKey,
          onSortColumn = _nextCell$props.onSortColumn,
          sortColumn = _nextCell$props.sortColumn,
          sortType = _nextCell$props.sortType,
          align = _nextCell$props.align,
          verticalAlign = _nextCell$props.verticalAlign,
          renderSortIcon = _nextCell$props.renderSortIcon;
        if (j !== 0) {
          nextWidth += nextCellWidth;
          left += cells[i + j - 1].props.width;
          cells[i + j] = cloneCell(nextCell, {
            removed: true
          });
        }
        groupChildren.push( /*#__PURE__*/_react["default"].createElement(_HeaderCell["default"], {
          key: j,
          left: left,
          align: align,
          verticalAlign: verticalAlign,
          dataKey: dataKey,
          width: nextCellWidth,
          sortable: sortable,
          sortColumn: sortColumn,
          sortType: sortType,
          onSortColumn: onSortColumn,
          renderSortIcon: renderSortIcon
        }, children));
      }
      nextCells.push(cloneCell(cells[i], {
        width: nextWidth,
        children: /*#__PURE__*/_react["default"].createElement(_ColumnGroup["default"], {
          width: nextWidth,
          headerHeight: headerHeight,
          header: groupHeader,
          align: groupAlign,
          verticalAlign: groupVerticalAlign,
          groupHeaderHeight: groupHeaderHeight
        }, groupChildren)
      }));
      continue;
    } else if (colSpan) {
      // If there is a colSpan attribute, go to its next Cell.
      // Determine whether the value is null or undefined, then merge this cell.

      var _nextWidth = width;
      for (var _j = 0; _j < colSpan; _j += 1) {
        var _nextCell = cells[i + _j];
        if (_nextCell) {
          var _nextCell$props2 = _nextCell.props,
            rowData = _nextCell$props2.rowData,
            rowIndex = _nextCell$props2.rowIndex,
            _children = _nextCell$props2.children,
            colSpanWidth = _nextCell$props2.width,
            _isHeaderCell = _nextCell$props2.isHeaderCell,
            _dataKey = _nextCell$props2.dataKey;
          var cellText = (0, _isFunction["default"])(_children) ? _children(rowData, rowIndex) : (0, _get["default"])(rowData, _dataKey);
          if (rowData && (0, _isNil["default"])(cellText) || _isHeaderCell && (0, _isNil["default"])(_children)) {
            _nextWidth += colSpanWidth;
            cells[i + _j] = cloneCell(_nextCell, {
              removed: true
            });
          }
        }
      }
      nextCells.push(cloneCell(cells[i], {
        width: _nextWidth,
        'aria-colspan': _nextWidth > width ? colSpan : undefined
      }));
      continue;
    }
    nextCells.push(cells[i]);
  }
  return nextCells;
}
var _default = mergeCells;
exports["default"] = _default;