'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _streamsCss = require('./streams/css');

var _streamsCss2 = _interopRequireDefault(_streamsCss);

var _streamsJs = require('./streams/js');

var _streamsJs2 = _interopRequireDefault(_streamsJs);

var _streamsPrecompile = require('./streams/precompile');

var _streamsPrecompile2 = _interopRequireDefault(_streamsPrecompile);

var _streamsScss = require('./streams/scss');

var _streamsScss2 = _interopRequireDefault(_streamsScss);

var _assets = require('./assets');

var _assets2 = _interopRequireDefault(_assets);

var _manifest = require('./manifest');

var _manifest2 = _interopRequireDefault(_manifest);

var sprockets = { css: _streamsCss2['default'], js: _streamsJs2['default'], precompile: _streamsPrecompile2['default'], scss: _streamsScss2['default'] };

/**
 * @param {Array.<String>} assetPaths .
 * @param {String} manifestPath .
 */
sprockets.declare = function (assetPaths, manifestPath) {
  _assets2['default'].init(assetPaths);
  _manifest2['default'].init(manifestPath);
};

exports['default'] = sprockets;
module.exports = exports['default'];