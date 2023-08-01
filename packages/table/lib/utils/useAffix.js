"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _react = require("react");
var _getHeight = _interopRequireDefault(require("dom-lib/getHeight"));
var _addStyle = _interopRequireDefault(require("dom-lib/addStyle"));
var _removeStyle = _interopRequireDefault(require("dom-lib/removeStyle"));
var _on = _interopRequireDefault(require("dom-lib/on"));
var _toggleClass = _interopRequireDefault(require("./toggleClass"));
var _isNumberOrTrue = _interopRequireDefault(require("./isNumberOrTrue"));
var _useUpdateEffect = _interopRequireDefault(require("./useUpdateEffect"));
var useAffix = function useAffix(props) {
  var getTableHeight = props.getTableHeight,
    contentHeight = props.contentHeight,
    affixHorizontalScrollbar = props.affixHorizontalScrollbar,
    affixHeader = props.affixHeader,
    tableOffset = props.tableOffset,
    headerOffset = props.headerOffset,
    headerHeight = props.headerHeight,
    scrollbarXRef = props.scrollbarXRef,
    affixHeaderWrapperRef = props.affixHeaderWrapperRef;
  var scrollListener = (0, _react.useRef)();
  var handleAffixHorizontalScrollbar = (0, _react.useCallback)(function () {
    var _tableOffset$current, _scrollbarXRef$curren;
    var scrollY = window.scrollY || window.pageYOffset;
    var windowHeight = (0, _getHeight["default"])(window);
    var height = getTableHeight();
    var bottom = typeof affixHorizontalScrollbar === 'number' ? affixHorizontalScrollbar : 0;
    var offsetTop = ((_tableOffset$current = tableOffset.current) === null || _tableOffset$current === void 0 ? void 0 : _tableOffset$current.top) || 0;
    var fixedScrollbar = scrollY + windowHeight < height + (offsetTop + bottom) && scrollY + windowHeight - headerHeight > offsetTop + bottom;
    if (scrollbarXRef !== null && scrollbarXRef !== void 0 && (_scrollbarXRef$curren = scrollbarXRef.current) !== null && _scrollbarXRef$curren !== void 0 && _scrollbarXRef$curren.root) {
      (0, _toggleClass["default"])(scrollbarXRef.current.root, 'fixed', fixedScrollbar);
      if (fixedScrollbar) {
        (0, _addStyle["default"])(scrollbarXRef.current.root, 'bottom', bottom + "px");
      } else {
        (0, _removeStyle["default"])(scrollbarXRef.current.root, 'bottom');
      }
    }
  }, [affixHorizontalScrollbar, headerHeight, scrollbarXRef, getTableHeight, tableOffset]);
  var handleAffixTableHeader = (0, _react.useCallback)(function () {
    var _headerOffset$current;
    var top = typeof affixHeader === 'number' ? affixHeader : 0;
    var scrollY = window.scrollY || window.pageYOffset;
    var offsetTop = ((_headerOffset$current = headerOffset.current) === null || _headerOffset$current === void 0 ? void 0 : _headerOffset$current.top) || 0;
    var fixedHeader = scrollY - (offsetTop - top) >= 0 && scrollY < offsetTop - top + contentHeight.current;
    if (affixHeaderWrapperRef.current) {
      (0, _toggleClass["default"])(affixHeaderWrapperRef.current, 'fixed', fixedHeader);
    }
  }, [affixHeader, affixHeaderWrapperRef, contentHeight, headerOffset]);
  var handleWindowScroll = (0, _react.useCallback)(function () {
    if ((0, _isNumberOrTrue["default"])(affixHeader)) {
      handleAffixTableHeader();
    }
    if ((0, _isNumberOrTrue["default"])(affixHorizontalScrollbar)) {
      handleAffixHorizontalScrollbar();
    }
  }, [affixHeader, affixHorizontalScrollbar, handleAffixTableHeader, handleAffixHorizontalScrollbar]);

  /**
   * Update the position of the fixed element after the height of the table changes.
   * fix: https://github.com/rsuite/rsuite/issues/1716
   */
  (0, _useUpdateEffect["default"])(handleWindowScroll, [getTableHeight]);
  (0, _react.useEffect)(function () {
    if ((0, _isNumberOrTrue["default"])(affixHeader) || (0, _isNumberOrTrue["default"])(affixHorizontalScrollbar)) {
      scrollListener.current = (0, _on["default"])(window, 'scroll', handleWindowScroll);
    }
    return function () {
      var _scrollListener$curre;
      (_scrollListener$curre = scrollListener.current) === null || _scrollListener$curre === void 0 ? void 0 : _scrollListener$curre.off();
    };
  }, [affixHeader, affixHorizontalScrollbar, handleWindowScroll]);
};
var _default = useAffix;
exports["default"] = _default;