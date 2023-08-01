"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _react = require("react");
var _getHeight = _interopRequireDefault(require("dom-lib/getHeight"));
var _useUpdateLayoutEffect = _interopRequireDefault(require("./useUpdateLayoutEffect"));
var _useMount = _interopRequireDefault(require("./useMount"));
var _isEmpty = _interopRequireDefault(require("lodash-es/isEmpty"));
var _defer = _interopRequireDefault(require("./defer"));
/**
 * The row information of the table, get the DOM of all rows, and summarize the row height.
 * @param props
 * @returns
 */
var useTableRows = function useTableRows(props) {
  var prefix = props.prefix,
    wordWrap = props.wordWrap,
    data = props.data,
    expandedRowKeys = props.expandedRowKeys;
  var _useState = (0, _react.useState)([]),
    tableRowsMaxHeight = _useState[0],
    setTableRowsMaxHeight = _useState[1];
  var tableRows = (0, _react.useRef)({});
  var bindTableRowsRef = function bindTableRowsRef(index, rowData) {
    return function (ref) {
      if (ref) {
        tableRows.current[index] = [ref, rowData];
      }
    };
  };
  var calculateRowMaxHeight = (0, _react.useCallback)(function () {
    if (wordWrap) {
      var nextTableRowsMaxHeight = [];
      var curTableRows = Object.values(tableRows.current);
      for (var i = 0; i < curTableRows.length; i++) {
        var _curTableRows$i = curTableRows[i],
          row = _curTableRows$i[0];
        if (row) {
          var cells = row.querySelectorAll("." + prefix('cell-wrap')) || [];
          var cellArray = Array.from(cells);
          var maxHeight = 0;
          for (var j = 0; j < cellArray.length; j++) {
            var cell = cellArray[j];
            var h = (0, _getHeight["default"])(cell);
            maxHeight = Math.max(maxHeight, h);
          }
          nextTableRowsMaxHeight.push(maxHeight);
        }
      }

      // Can't perform a React state update on an unmounted component
      if (!(0, _isEmpty["default"])(tableRows.current)) {
        setTableRowsMaxHeight(nextTableRowsMaxHeight);
      }
    }
  }, [prefix, wordWrap]);
  (0, _useMount["default"])(function () {
    (0, _defer["default"])(calculateRowMaxHeight);
  });
  (0, _useUpdateLayoutEffect["default"])(function () {
    /**
     * After the data is updated, the height of the cell DOM needs to be re-acquired,
     * and what is often obtained is not the latest DOM that has been rendered.
     * So use `defer` to delay obtaining the height of the cell DOM.
     * TODO: To be improved
     */
    (0, _defer["default"])(calculateRowMaxHeight);
  }, [data, expandedRowKeys]);
  return {
    bindTableRowsRef: bindTableRowsRef,
    tableRowsMaxHeight: tableRowsMaxHeight,
    tableRows: tableRows
  };
};
var _default = useTableRows;
exports["default"] = _default;