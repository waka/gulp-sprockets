/**
 * @fileoverview Precompile stream.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _eventStream = require('event-stream');

var _eventStream2 = _interopRequireDefault(_eventStream);

var _commonFile = require('../common/file');

var _commonFile2 = _interopRequireDefault(_commonFile);

var _manifest = require('../manifest');

var _manifest2 = _interopRequireDefault(_manifest);

exports['default'] = function () {
  return _eventStream2['default'].through(function (vFile) {
    var file = new _commonFile2['default'](vFile);

    _manifest2['default'].save(file);
    vFile.path = file.outputRealPath;

    this.emit('data', vFile);
  });
};

;
module.exports = exports['default'];