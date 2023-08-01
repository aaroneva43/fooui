"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _DOMMouseMoveTracker = _interopRequireDefault(require("dom-lib/DOMMouseMoveTracker"));
var _addStyle = _interopRequireDefault(require("dom-lib/addStyle"));
var _getOffset = _interopRequireDefault(require("dom-lib/getOffset"));
var _constants = require("./constants");
var _utils = require("./utils");
var _TableContext = _interopRequireDefault(require("./TableContext"));
var _excluded = ["length", "scrollLength", "classPrefix", "vertical", "className", "tableId", "onMouseDown", "onScroll"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Scrollbar = /*#__PURE__*/_react["default"].forwardRef(function (props, ref) {
  var _barRef$current, _styles;
  var _props$length = props.length,
    length = _props$length === void 0 ? 1 : _props$length,
    _props$scrollLength = props.scrollLength,
    scrollLength = _props$scrollLength === void 0 ? 1 : _props$scrollLength,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'scrollbar' : _props$classPrefix,
    vertical = props.vertical,
    className = props.className,
    tableId = props.tableId,
    onMouseDown = props.onMouseDown,
    onScroll = props.onScroll,
    rest = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  var _React$useContext = _react["default"].useContext(_TableContext["default"]),
    translateDOMPositionXY = _React$useContext.translateDOMPositionXY;
  var _useState = (0, _react.useState)(false),
    handlePressed = _useState[0],
    setHandlePressed = _useState[1];
  var _useState2 = (0, _react.useState)({
      top: 0,
      left: 0
    }),
    barOffset = _useState2[0],
    setBarOffset = _useState2[1];
  var scrollOffset = (0, _react.useRef)(0);
  var scrollRange = (0, _react.useRef)(scrollLength);
  var barRef = (0, _react.useRef)(null);
  var handleRef = (0, _react.useRef)(null);
  var mouseMoveTracker = (0, _react.useRef)();
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix({
    vertical: vertical,
    horizontal: !vertical,
    pressed: handlePressed
  }),
  // keep the 'fixed' class name if it has already been given by useAffix hook
  ((_barRef$current = barRef.current) === null || _barRef$current === void 0 ? void 0 : _barRef$current.classList.contains('fixed')) && 'fixed');
  var width = length / scrollLength * 100;
  var styles = (_styles = {}, _styles[vertical ? 'height' : 'width'] = width + "%", _styles[vertical ? 'minHeight' : 'minWidth'] = _constants.SCROLLBAR_MIN_WIDTH, _styles);
  var valuenow = scrollOffset.current / length * 100 + width;
  (0, _utils.useMount)(function () {
    (0, _utils.defer)(function () {
      if (barRef.current) {
        setBarOffset((0, _getOffset["default"])(barRef.current));
      }
    });
    return function () {
      releaseMouseMoves();
    };
  });
  (0, _utils.useUpdateEffect)(function () {
    if (scrollOffset.current) {
      // Update the position of the scroll bar when the height of the table content area changes.
      scrollOffset.current = scrollRange.current / scrollLength * scrollOffset.current;
      updateScrollBarPosition(0);
    }
    scrollRange.current = scrollLength;
  }, [scrollLength]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      get root() {
        return barRef.current;
      },
      get handle() {
        return handleRef.current;
      },
      onWheelScroll: function onWheelScroll(delta, momentum) {
        var nextDelta = delta / (scrollLength / length);
        updateScrollBarPosition(nextDelta, undefined, momentum);
      },
      resetScrollBarPosition: function resetScrollBarPosition(forceDelta) {
        if (forceDelta === void 0) {
          forceDelta = 0;
        }
        scrollOffset.current = 0;
        updateScrollBarPosition(0, forceDelta);
      }
    };
  });
  var updateScrollBarPosition = (0, _react.useCallback)(function (delta, forceDelta, momentum) {
    var max = scrollLength && length ? length - Math.max(length / scrollLength * length, _constants.SCROLLBAR_MIN_WIDTH + 2) : 0;
    var styles = momentum ? {
      'transition-duration': _constants.TRANSITION_DURATION + "ms",
      'transition-timing-function': _constants.BEZIER
    } : {};
    var getSafeValue = function getSafeValue(value) {
      if (value === void 0) {
        value = 0;
      }
      return Math.min(Math.max(value, 0), max);
    };
    if (typeof forceDelta === 'undefined') {
      scrollOffset.current += delta;
      scrollOffset.current = getSafeValue(scrollOffset.current);
    } else {
      scrollOffset.current = getSafeValue(forceDelta);
    }
    if (vertical) {
      translateDOMPositionXY === null || translateDOMPositionXY === void 0 ? void 0 : translateDOMPositionXY(styles, 0, scrollOffset.current);
    } else {
      translateDOMPositionXY === null || translateDOMPositionXY === void 0 ? void 0 : translateDOMPositionXY(styles, scrollOffset.current, 0);
    }
    if (handleRef.current) {
      (0, _addStyle["default"])(handleRef.current, styles);
    }
  }, [length, scrollLength, translateDOMPositionXY, vertical]);
  var handleScroll = (0, _react.useCallback)(function (delta, event) {
    var scrollDelta = delta * (scrollLength / length);
    updateScrollBarPosition(delta);
    onScroll === null || onScroll === void 0 ? void 0 : onScroll(scrollDelta, event);
  }, [length, onScroll, scrollLength, updateScrollBarPosition]);
  var handleClick = (0, _react.useCallback)(function (event) {
    var _handleRef$current;
    if (handleRef.current && (_handleRef$current = handleRef.current) !== null && _handleRef$current !== void 0 && _handleRef$current.contains(event.target)) {
      return;
    }
    if (typeof (barOffset === null || barOffset === void 0 ? void 0 : barOffset.top) !== 'number' || typeof (barOffset === null || barOffset === void 0 ? void 0 : barOffset.left) !== 'number') {
      return;
    }
    var offset = vertical ? event.pageY - (barOffset === null || barOffset === void 0 ? void 0 : barOffset.top) : event.pageX - barOffset.left;
    var handleWidth = length / scrollLength * length;
    var delta = offset - handleWidth;
    var nextDelta = offset > scrollOffset.current ? delta - scrollOffset.current : offset - scrollOffset.current;
    handleScroll(nextDelta, event);
  }, [barOffset, handleScroll, length, scrollLength, vertical]);
  var releaseMouseMoves = (0, _react.useCallback)(function () {
    var _mouseMoveTracker$cur, _mouseMoveTracker$cur2;
    (_mouseMoveTracker$cur = mouseMoveTracker.current) === null || _mouseMoveTracker$cur === void 0 ? void 0 : (_mouseMoveTracker$cur2 = _mouseMoveTracker$cur.releaseMouseMoves) === null || _mouseMoveTracker$cur2 === void 0 ? void 0 : _mouseMoveTracker$cur2.call(_mouseMoveTracker$cur);
    mouseMoveTracker.current = null;
  }, []);
  var handleDragMove = (0, _react.useCallback)(function (deltaX, deltaY, event) {
    var _window, _window$event;
    if (!mouseMoveTracker.current || !mouseMoveTracker.current.isDragging()) {
      return;
    }
    if ((event === null || event === void 0 ? void 0 : event.buttons) === 0 || ((_window = window) === null || _window === void 0 ? void 0 : (_window$event = _window.event) === null || _window$event === void 0 ? void 0 : _window$event['buttons']) === 0) {
      releaseMouseMoves();
      return;
    }
    handleScroll(vertical ? deltaY : deltaX, event);
  }, [handleScroll, releaseMouseMoves, vertical]);
  var handleDragEnd = (0, _react.useCallback)(function () {
    releaseMouseMoves();
    setHandlePressed(false);
  }, [releaseMouseMoves]);
  var getMouseMoveTracker = (0, _react.useCallback)(function () {
    return mouseMoveTracker.current || new _DOMMouseMoveTracker["default"](handleDragMove, handleDragEnd, document.body);
  }, [handleDragEnd, handleDragMove]);
  var handleMouseDown = (0, _react.useCallback)(function (event) {
    var _mouseMoveTracker$cur3;
    mouseMoveTracker.current = getMouseMoveTracker();
    mouseMoveTracker === null || mouseMoveTracker === void 0 ? void 0 : (_mouseMoveTracker$cur3 = mouseMoveTracker.current) === null || _mouseMoveTracker$cur3 === void 0 ? void 0 : _mouseMoveTracker$cur3.captureMouseMoves(event);
    setHandlePressed(true);
    onMouseDown === null || onMouseDown === void 0 ? void 0 : onMouseDown(event);
  }, [getMouseMoveTracker, onMouseDown]);
  return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
    role: "scrollbar",
    "aria-controls": tableId,
    "aria-valuemax": 100,
    "aria-valuemin": 0,
    "aria-valuenow": valuenow,
    "aria-orientation": vertical ? 'vertical' : 'horizontal'
  }, rest, {
    ref: barRef,
    className: classes,
    onClick: handleClick
  }), /*#__PURE__*/_react["default"].createElement("div", {
    ref: handleRef,
    className: prefix('handle'),
    style: styles,
    onMouseDown: handleMouseDown,
    role: "button",
    tabIndex: -1
  }));
});
Scrollbar.displayName = 'Table.Scrollbar';
var _default = Scrollbar;
exports["default"] = _default;