"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var Loader = /*#__PURE__*/_react["default"].forwardRef(function (props, ref) {
  var loadAnimation = props.loadAnimation,
    loading = props.loading,
    locale = props.locale,
    addPrefix = props.addPrefix,
    renderLoading = props.renderLoading;
  var loadingElement = /*#__PURE__*/_react["default"].createElement("div", {
    ref: ref,
    className: addPrefix('loader-wrapper')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: addPrefix('loader')
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: addPrefix('loader-icon')
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: addPrefix('loader-text')
  }, locale === null || locale === void 0 ? void 0 : locale.loading)));

  // Custom render a loader
  if (typeof renderLoading === 'function') {
    return loading ? renderLoading(loadingElement) : null;
  }

  // If loadAnimation is true , it returns the DOM element,
  // and controls whether the loader is displayed through CSS to achieve animation effect.
  return loading || loadAnimation ? loadingElement : null;
});
Loader.displayName = 'Table.Loader';
var _default = Loader;
exports["default"] = _default;