"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var EmptyMessage = /*#__PURE__*/_react["default"].forwardRef(function (props, ref) {
  var addPrefix = props.addPrefix,
    locale = props.locale,
    renderEmpty = props.renderEmpty,
    loading = props.loading;
  if (loading) {
    return null;
  }
  var emptyMessage = /*#__PURE__*/_react["default"].createElement("div", {
    ref: ref,
    className: addPrefix('body-info')
  }, locale === null || locale === void 0 ? void 0 : locale.emptyMessage);
  return renderEmpty ? renderEmpty(emptyMessage) : emptyMessage;
});
EmptyMessage.displayName = 'Table.EmptyMessage';
var _default = EmptyMessage;
exports["default"] = _default;