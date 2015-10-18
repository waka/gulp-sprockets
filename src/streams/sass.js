/**
 * @fileoverview sass stream.
 */

import stream from 'event-stream';
import sass from '../builders/sass';

export default function () {
  return stream.through(function(file) {
    const res = sass.transform(file);
    file.path = res.path;
    file.contents = new Buffer(res.contents);
    this.emit('data', file);
  });
}
