"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _react = require("react");
var _addStyle = _interopRequireDefault(require("dom-lib/addStyle"));
var _constants = require("../constants");
var _toggleClass = _interopRequireDefault(require("./toggleClass"));
var _useUpdateEffect = _interopRequireDefault(require("./useUpdateEffect"));
var _isSupportTouchEvent = _interopRequireDefault(require("./isSupportTouchEvent"));
var _defer = _interopRequireDefault(require("./defer"));
/**
 * Update the position of the table according to the scrolling information of the table.
 * @param props
 * @returns
 */
var usePosition = function usePosition(props) {
  var data = props.data,
    height = props.height,
    tableWidth = props.tableWidth,
    tableRef = props.tableRef,
    prefix = props.prefix,
    translateDOMPositionXY = props.translateDOMPositionXY,
    wheelWrapperRef = props.wheelWrapperRef,
    headerWrapperRef = props.headerWrapperRef,
    affixHeaderWrapperRef = props.affixHeaderWrapperRef,
    tableHeaderRef = props.tableHeaderRef,
    scrollX = props.scrollX,
    scrollY = props.scrollY,
    contentWidth = props.contentWidth,
    shouldFixedColumn = props.shouldFixedColumn;
  var duration = (0, _react.useRef)(0);
  var bezier = (0, _react.useRef)('linear');
  var getScrollCellGroups = (0, _react.useCallback)(function () {
    var _tableRef$current;
    return ((_tableRef$current = tableRef.current) === null || _tableRef$current === void 0 ? void 0 : _tableRef$current.querySelectorAll("." + prefix('cell-group-scroll'))) || [];
  }, [prefix, tableRef]);
  var getFixedLeftCellGroups = (0, _react.useCallback)(function () {
    var _tableRef$current2;
    return (_tableRef$current2 = tableRef.current) === null || _tableRef$current2 === void 0 ? void 0 : _tableRef$current2.querySelectorAll("." + prefix('cell-group-fixed-left'));
  }, [prefix, tableRef]);
  var getFixedRightCellGroups = (0, _react.useCallback)(function () {
    var _tableRef$current3;
    return (_tableRef$current3 = tableRef.current) === null || _tableRef$current3 === void 0 ? void 0 : _tableRef$current3.querySelectorAll("." + prefix('cell-group-fixed-right'));
  }, [prefix, tableRef]);
  var updateWheelElementPosition = (0, _react.useCallback)(function (fixedCell) {
    if (wheelWrapperRef !== null && wheelWrapperRef !== void 0 && wheelWrapperRef.current) {
      // The animation when the mobile device touches and scrolls.
      var wheelStyle = (0, _isSupportTouchEvent["default"])() ? {
        'transition-duration': duration.current + "ms",
        'transition-timing-function': bezier.current
      } : {};
      translateDOMPositionXY.current(wheelStyle, fixedCell ? 0 : scrollX.current, scrollY.current);
      (0, _addStyle["default"])(wheelWrapperRef.current, wheelStyle);
    }
  }, [scrollX, scrollY, translateDOMPositionXY, wheelWrapperRef]);
  var updatePositionByFixedCell = (0, _react.useCallback)(function () {
    var wheelGroupStyle = {};
    var scrollGroups = getScrollCellGroups();
    var fixedLeftGroups = getFixedLeftCellGroups();
    var fixedRightGroups = getFixedRightCellGroups();
    translateDOMPositionXY.current(wheelGroupStyle, scrollX.current, 0);
    var scrollArrayGroups = Array.from(scrollGroups);
    for (var i = 0; i < scrollArrayGroups.length; i++) {
      var group = scrollArrayGroups[i];
      (0, _addStyle["default"])(group, wheelGroupStyle);
    }
    updateWheelElementPosition(true);
    var leftShadowClassName = prefix('cell-group-left-shadow');
    var rightShadowClassName = prefix('cell-group-right-shadow');
    var showLeftShadow = scrollX.current < 0;
    var showRightShadow = tableWidth.current - contentWidth.current - _constants.SCROLLBAR_WIDTH !== scrollX.current;
    (0, _toggleClass["default"])(fixedLeftGroups, leftShadowClassName, showLeftShadow);
    (0, _toggleClass["default"])(fixedRightGroups, rightShadowClassName, showRightShadow);
  }, [contentWidth, getFixedLeftCellGroups, getFixedRightCellGroups, getScrollCellGroups, updateWheelElementPosition, prefix, scrollX, tableWidth, translateDOMPositionXY]);

  /**
   * Update the position of the table according to the scrolling information of the table.
   * @param nextDuration CSS transition-duration
   * @param nextBezier CSS transition-timing-function
   */
  var updatePosition = (0, _react.useCallback)(function (nextDuration, nextBezier) {
    if (nextDuration) {
      duration.current = nextDuration;
    }
    if (nextBezier) {
      bezier.current = nextBezier;
    }

    // When there are fixed columns.
    if (shouldFixedColumn) {
      updatePositionByFixedCell();
    } else {
      var _affixHeaderElement$h;
      var headerStyle = {};
      translateDOMPositionXY.current(headerStyle, scrollX.current, 0);
      var headerElement = headerWrapperRef === null || headerWrapperRef === void 0 ? void 0 : headerWrapperRef.current;
      var affixHeaderElement = affixHeaderWrapperRef === null || affixHeaderWrapperRef === void 0 ? void 0 : affixHeaderWrapperRef.current;
      updateWheelElementPosition();
      headerElement && (0, _addStyle["default"])(headerElement, headerStyle);
      if (affixHeaderElement !== null && affixHeaderElement !== void 0 && (_affixHeaderElement$h = affixHeaderElement.hasChildNodes) !== null && _affixHeaderElement$h !== void 0 && _affixHeaderElement$h.call(affixHeaderElement)) {
        (0, _addStyle["default"])(affixHeaderElement === null || affixHeaderElement === void 0 ? void 0 : affixHeaderElement.firstChild, headerStyle);
      }
    }
    if (tableHeaderRef !== null && tableHeaderRef !== void 0 && tableHeaderRef.current) {
      (0, _toggleClass["default"])(tableHeaderRef.current, prefix('cell-group-shadow'), scrollY.current < 0);
    }
  }, [affixHeaderWrapperRef, updateWheelElementPosition, headerWrapperRef, prefix, scrollX, scrollY, shouldFixedColumn, tableHeaderRef, translateDOMPositionXY, updatePositionByFixedCell]);
  (0, _useUpdateEffect["default"])(function () {
    if (scrollY.current !== 0) {
      updatePosition();
    }
  }, [height, data]);
  return {
    forceUpdatePosition: updatePosition,
    deferUpdatePosition: function deferUpdatePosition(nextDuration, nextBezier) {
      (0, _defer["default"])(function () {
        updatePosition(nextDuration, nextBezier);
      });
    }
  };
};
var _default = usePosition;
exports["default"] = _default;