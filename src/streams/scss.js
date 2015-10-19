/**
 * @fileoverview SCSS stream.
 */

import assign    from 'object-assign';
import stream    from 'event-stream';
import builder   from '../builders/scss';
import { transformation } from '../transformer';

function defaultOptions() {
  return { precompile: false };
}

/**
 * @params {Object} options .
 */
export default function (options) {
  options = assign(defaultOptions(), options);

  return stream.through(function(vFile) {
    vFile = builder.transform(vFile, options);
    this.emit('data', vFile);
  });
}
