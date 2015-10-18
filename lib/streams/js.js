/**
 * @fileoverview js stream.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  return stream.through(function (file) {
    this.emit('data', file);
  });
};

module.exports = exports['default'];