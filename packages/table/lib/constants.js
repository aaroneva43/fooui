"use strict";

exports.__esModule = true;
exports.TREE_DEPTH = exports.TRANSITION_DURATION = exports.SORT_TYPE = exports.SCROLLBAR_WIDTH = exports.SCROLLBAR_MIN_WIDTH = exports.ROW_HEIGHT = exports.ROW_HEADER_HEIGHT = exports.RESIZE_MIN_WIDTH = exports.PARENT_KEY = exports.LAYER_WIDTH = exports.EXPANDED_KEY = exports.CELL_PADDING_HEIGHT = exports.BEZIER = void 0;
var LAYER_WIDTH = 30;
exports.LAYER_WIDTH = LAYER_WIDTH;
var SCROLLBAR_MIN_WIDTH = 14;
exports.SCROLLBAR_MIN_WIDTH = SCROLLBAR_MIN_WIDTH;
var SCROLLBAR_WIDTH = 10;
exports.SCROLLBAR_WIDTH = SCROLLBAR_WIDTH;
var CELL_PADDING_HEIGHT = 26;
exports.CELL_PADDING_HEIGHT = CELL_PADDING_HEIGHT;
var RESIZE_MIN_WIDTH = 20;
exports.RESIZE_MIN_WIDTH = RESIZE_MIN_WIDTH;
var SORT_TYPE = {
  DESC: 'desc',
  ASC: 'asc'
};
exports.SORT_TYPE = SORT_TYPE;
var ROW_HEIGHT = 46;
exports.ROW_HEIGHT = ROW_HEIGHT;
var ROW_HEADER_HEIGHT = 40;

// transition-duration (ms)
exports.ROW_HEADER_HEIGHT = ROW_HEADER_HEIGHT;
var TRANSITION_DURATION = 1000;
// transition-timing-function (ease-out)
exports.TRANSITION_DURATION = TRANSITION_DURATION;
var BEZIER = 'cubic-bezier(0, 0, .58, 1)';

// An attribute value added to the data row to identify whether it is expanded, used in Tree.
exports.BEZIER = BEZIER;
var EXPANDED_KEY = Symbol('expanded');

// An attribute value added for the data row, identifying the key of the parent node, used in Tree.
exports.EXPANDED_KEY = EXPANDED_KEY;
var PARENT_KEY = Symbol('parent');

// The attribute value added for the data row, which identifies the depth of the node (the number of parent nodes),
// and is used in the Tree.
exports.PARENT_KEY = PARENT_KEY;
var TREE_DEPTH = Symbol('treeDepth');
exports.TREE_DEPTH = TREE_DEPTH;