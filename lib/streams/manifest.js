/**
 * @fileoverview manifest stream.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _buildersManifest = require('../builders/manifest');

var _buildersManifest2 = _interopRequireDefault(_buildersManifest);

var _eventStream = require('event-stream');

var _eventStream2 = _interopRequireDefault(_eventStream);

exports['default'] = function () {
  var file = _buildersManifest2['default'].create();
  return _eventStream2['default'].readArray([file]);
};

module.exports = exports['default'];