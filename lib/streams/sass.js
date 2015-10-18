/**
 * @fileoverview sass stream.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _eventStream = require('event-stream');

var _eventStream2 = _interopRequireDefault(_eventStream);

var _buildersSass = require('../builders/sass');

var _buildersSass2 = _interopRequireDefault(_buildersSass);

exports['default'] = function () {
  return _eventStream2['default'].through(function (file) {
    var res = _buildersSass2['default'].transform(file);
    file.path = res.path;
    file.contents = new Buffer(res.contents);
    this.emit('data', file);
  });
};

module.exports = exports['default'];