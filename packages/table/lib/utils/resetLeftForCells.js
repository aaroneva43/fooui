"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = resetLeftForCells;
var _react = _interopRequireDefault(require("react"));
/**
 * Resets the relative left distance of all cells in the array.
 * @param cells
 * @param extraWidth The additional width added to the last cell when there is a vertical scroll bar.
 */
function resetLeftForCells(cells, extraWidth) {
  var left = 0;
  var nextCells = [];
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    var nextCell = /*#__PURE__*/_react["default"].cloneElement(cell, {
      left: left,
      width: i === cells.length - 1 && extraWidth ? cell.props.width + extraWidth : cell.props.width
    });
    left += cell.props.width;
    nextCells.push(nextCell);
  }
  return nextCells;
}