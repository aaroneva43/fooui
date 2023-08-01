"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _useIsomorphicLayoutEffect = _interopRequireDefault(require("./useIsomorphicLayoutEffect"));
var useMount = function useMount(effect) {
  (0, _useIsomorphicLayoutEffect["default"])(effect, []);
};
var _default = useMount;
exports["default"] = _default;