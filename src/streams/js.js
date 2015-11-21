/**
 * @fileoverview JavaScript stream.
 */

import assign    from 'object-assign';
import stream    from 'event-stream';
import builder   from '../builders/js';
import directive from '../directives/js';
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
    if (!vFile.isNull()) {
      vFile = transformation(
          [builder, directive], vFile, options);
    }
    this.emit('data', vFile);
  });
}
