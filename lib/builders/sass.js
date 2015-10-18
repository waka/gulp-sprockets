/**
 * @fileoverview Sass(Scss) builder.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _nodeSass = require('node-sass');

var _nodeSass2 = _interopRequireDefault(_nodeSass);

var _path2 = require('path');

var _path3 = _interopRequireDefault(_path2);

var _commonHash = require('../common/hash');

var _commonHash2 = _interopRequireDefault(_commonHash);

var _manifest = require('./manifest');

var _manifest2 = _interopRequireDefault(_manifest);

function assetPath(url) {
  var parsedUrl = _path3['default'].parse(url.getValue());

  var returnString = 'url("' + _path3['default'].format(parsedUrl) + '")';
  return sass.types.String(returnString);
}

var Sass = (function () {
  function Sass() {
    _classCallCheck(this, Sass);
  }

  _createClass(Sass, [{
    key: 'path',
    value: function path(file) {
      var baseName = new String(file.path).replace(_path3['default'].extname(file.path), '');
      var hashValue = _commonHash2['default'].create(file.contents.toString());
      return baseName + '-' + hashValue + '.css';
    }
  }, {
    key: 'compile',
    value: function compile(file) {
      var compiled = _nodeSass2['default'].renderSync({
        file: file.path,
        outputStyle: 'expanded',
        functions: {
          "asset-path($url)": assetPath,
          "image-url($url)": assetPath
        }
      });
      return compiled.css.toString();
    }
  }, {
    key: 'transform',
    value: function transform(file) {
      return { path: this.path(file), contents: this.compile(file) };
    }
  }]);

  return Sass;
})();

exports.Sass = Sass;
exports['default'] = new Sass();