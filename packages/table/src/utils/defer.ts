import defer from 'lodash-es/defer';

/**
 * Defer callbacks to wait for DOM rendering to complete.
 */
export default (callback: () => void) => {
  defer(callback, 'deferred');
};
