/**
 * @fileoverview image stream.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _eventStream = require('event-stream');

var _eventStream2 = _interopRequireDefault(_eventStream);

exports['default'] = function () {
  return _eventStream2['default'].through(function (file) {
    this.emit('data', file);
  });
};

module.exports = exports['default'];