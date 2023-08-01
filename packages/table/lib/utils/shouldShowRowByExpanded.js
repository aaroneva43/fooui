"use strict";

exports.__esModule = true;
exports["default"] = shouldShowRowByExpanded;
/**
 * Check whether a row(tree) node should be expanded.
 * @param expandedRowKeys An array of all expanded nodes.
 * @param parentKeys All parent nodes of the current node
 * @returns boolean
 */
function shouldShowRowByExpanded(expandedRowKeys, parentKeys) {
  if (expandedRowKeys === void 0) {
    expandedRowKeys = [];
  }
  if (parentKeys === void 0) {
    parentKeys = [];
  }
  for (var i = 0; i < ((_parentKeys = parentKeys) === null || _parentKeys === void 0 ? void 0 : _parentKeys.length); i++) {
    var _parentKeys, _expandedRowKeys;
    if (((_expandedRowKeys = expandedRowKeys) === null || _expandedRowKeys === void 0 ? void 0 : _expandedRowKeys.indexOf(parentKeys[i])) === -1) {
      return false;
    }
  }
  return true;
}