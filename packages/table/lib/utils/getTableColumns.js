"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var ReactIs = _interopRequireWildcard(require("react-is"));
var _flatten = _interopRequireDefault(require("lodash-es/flatten"));
var _ColumnGroup = _interopRequireDefault(require("../ColumnGroup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Get the columns ReactElement array.
 * - Handling the case where there is an array of <Column> in children.
 * - Filter empty items in children.
 */
function getTableColumns(children) {
  var childrenArray = Array.isArray(children) ? children : [children];
  var flattenColumns = (0, _flatten["default"])(childrenArray).map(function (column) {
    // If the column is a group, we need to get the columns from the children.
    if ((column === null || column === void 0 ? void 0 : column.type) === _ColumnGroup["default"]) {
      var _column$props = column === null || column === void 0 ? void 0 : column.props,
        header = _column$props.header,
        groupChildren = _column$props.children,
        align = _column$props.align,
        fixed = _column$props.fixed,
        verticalAlign = _column$props.verticalAlign,
        groupHeaderHeight = _column$props.groupHeaderHeight;
      var childColumns = getTableColumns(groupChildren);
      return childColumns.map(function (childColumn, index) {
        // Overwrite the props set by ColumnGroup to Column.
        var groupCellProps = (0, _extends2["default"])({}, childColumn === null || childColumn === void 0 ? void 0 : childColumn.props, {
          groupHeaderHeight: groupHeaderHeight,
          fixed: fixed,
          // Column extends the properties of Group （align，verticalAlign）
          align: (childColumn === null || childColumn === void 0 ? void 0 : childColumn.props.align) || align,
          verticalAlign: (childColumn === null || childColumn === void 0 ? void 0 : childColumn.props.verticalAlign) || verticalAlign
        });

        /**
         * Set attributes for the first column in the group:
         * @field groupCount: The number of grouping sub-items.
         * @field groupHeader: Group header title.
         * @field resizable: Set to not resizable.
         */

        if (index === 0) {
          groupCellProps.groupAlign = align;
          groupCellProps.groupVerticalAlign = verticalAlign;
          groupCellProps.groupCount = childColumns.length;
          groupCellProps.groupHeader = header;
          groupCellProps.resizable = false;
        }
        return /*#__PURE__*/_react["default"].cloneElement(childColumn, groupCellProps);
      });
    } else if (ReactIs.isFragment(column)) {
      var _column$props2;
      // If the column is a fragment, we need to get the columns from the children.
      return getTableColumns((_column$props2 = column.props) === null || _column$props2 === void 0 ? void 0 : _column$props2.children);
    } else if (Array.isArray(column)) {
      // If the column is an array, need check item in the array.
      return getTableColumns(column);
    }

    // If the column is not a group, we just return the column.
    return column;
  });

  // Flatten the array in Columns into a one-dimensional array, and calculate lastColumn and firstColumn.
  return (0, _flatten["default"])(flattenColumns).filter(Boolean);
}
var _default = getTableColumns;
exports["default"] = _default;