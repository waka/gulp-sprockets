/**
 * @fileoverview js stream.
 */

export default function () {
  return stream.through(function(file) {
    this.emit('data', file);
  });
}
