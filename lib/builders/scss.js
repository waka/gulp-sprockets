/**
 * @fileoverview Sass(Scss) builder.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _nodeSass = require('node-sass');

var _nodeSass2 = _interopRequireDefault(_nodeSass);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commonFile = require('../common/file');

var _commonFile2 = _interopRequireDefault(_commonFile);

var _manifest = require('../manifest');

var _manifest2 = _interopRequireDefault(_manifest);

var _transformer = require('../transformer');

/**
 * Return file path from manifest.
 *
 * @param {String} url .
 * @return {String} Manifest path.
 */
function assetHashPath(url) {
  var parsedUrl = _path2['default'].parse(url.getValue());
  var asset = _manifest2['default'].getAssetValue(parsedUrl.base);
  return _nodeSass2['default'].types.String('url("' + asset + '")');
}

/**
 * Return file path.
 *
 * @param {String} url .
 * @return {String} Raw asset path.
 */
function assetPath(url) {
  var parsedUrl = _path2['default'].parse(url.getValue());
  return _nodeSass2['default'].types.String('url("' + parsedUrl.base + '")');
}

// export for test

var Scss = (function (_Transformer) {
  _inherits(Scss, _Transformer);

  function Scss() {
    _classCallCheck(this, Scss);

    _get(Object.getPrototypeOf(Scss.prototype), 'constructor', this).apply(this, arguments);
  }

  // singleton

  _createClass(Scss, [{
    key: 'transform',

    /**
     * @param {Vinyl} vFile The vinyl object.
     * @param {Object} options .
     * @return {Vinyl} Transformed vinyl object.
     */
    value: function transform(vFile, options) {
      var func = options.precompile ? assetHashPath : assetPath;
      var compiled = _nodeSass2['default'].renderSync({
        file: vFile.path,
        outputStyle: 'expanded',
        functions: {
          "asset-path($url)": func,
          "image-url($url)": func
        }
      });
      vFile.contents = new Buffer(compiled.css.toString());
      return vFile;
    }
  }]);

  return Scss;
})(_transformer.Transformer);

exports.Scss = Scss;
exports['default'] = new Scss();