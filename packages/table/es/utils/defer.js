import defer from 'lodash-es/defer';

/**
 * Defer callbacks to wait for DOM rendering to complete.
 */
export default (function (callback) {
  defer(callback, 'deferred');
});