"use strict";

exports.__esModule = true;
exports["default"] = isNumberOrTrue;
function isNumberOrTrue(value) {
  if (typeof value === 'undefined') {
    return false;
  }
  return !!value || value === 0;
}