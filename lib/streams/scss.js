/**
 * @fileoverview SCSS stream.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _eventStream = require('event-stream');

var _eventStream2 = _interopRequireDefault(_eventStream);

var _buildersScss = require('../builders/scss');

var _buildersScss2 = _interopRequireDefault(_buildersScss);

var _transformer = require('../transformer');

function defaultOptions() {
  return { precompile: false };
}

/**
 * @params {Object} options .
 */

exports['default'] = function (options) {
  options = (0, _objectAssign2['default'])(defaultOptions(), options);

  return _eventStream2['default'].through(function (vFile) {
    vFile = _buildersScss2['default'].transform(vFile, options);
    this.emit('data', vFile);
  });
};

module.exports = exports['default'];