/**
 * @fileoverview image stream.
 */

import stream from 'event-stream';

export default function () {
  return stream.through(function(file) {
    this.emit('data', file);
  });
}
