"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _react = require("react");
var _canUseDOM = _interopRequireDefault(require("dom-lib/canUseDOM"));
var useIsomorphicLayoutEffect = _canUseDOM["default"] ? _react.useLayoutEffect : _react.useEffect;
var _default = useIsomorphicLayoutEffect;
exports["default"] = _default;