import React from 'react';
import isRTL from './utils/isRTL';
var TableContext = /*#__PURE__*/React.createContext({
  rtl: isRTL(),
  isTree: false,
  hasCustomTreeCol: false
});
export default TableContext;