'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _streamsJs = require('./streams/js');

var _streamsJs2 = _interopRequireDefault(_streamsJs);

var _streamsSass = require('./streams/sass');

var _streamsSass2 = _interopRequireDefault(_streamsSass);

var _streamsImage = require('./streams/image');

var _streamsImage2 = _interopRequireDefault(_streamsImage);

var _streamsManifest = require('./streams/manifest');

var _streamsManifest2 = _interopRequireDefault(_streamsManifest);

exports['default'] = { js: _streamsJs2['default'], sass: _streamsSass2['default'], image: _streamsImage2['default'], manifest: _streamsManifest2['default'] };
module.exports = exports['default'];