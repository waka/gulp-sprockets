/**
 * @fileoverview manifest.json handler.
 *
 * manifest.json
 * {
 *   assets: {
 *     "#{original file name}": "#{output file name}"
 *   },
 *   files: {
 *     "#{output file name}": {
 *       logical_path: "#{original file name}",
 *       mtime: "#{timestamp}",
 *       size: "#{file size}",
 *       digest: "#{file digest}"
 *     }
 *   }
 * }
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

// export for test

var Manifest = (function () {
  function Manifest() {
    _classCallCheck(this, Manifest);

    this.realPath = null;
    this.contents = null;
  }

  // singleton

  /**
   * @param {String} assetpath .
   * @return {Void} .
   */

  _createClass(Manifest, [{
    key: 'init',
    value: function init(assetPath) {
      this.realPath = _path2['default'].resolve(_path2['default'].join(assetPath), 'manifest.json');

      try {
        this.contents = _fsExtra2['default'].readJsonSync(this.realPath);
      } catch (err) {
        this.contents = { assets: {}, files: {} };
      }
    }

    /**
     * @param {File} file .
     * @return {Void} .
     */
  }, {
    key: 'save',
    value: function save(file) {
      if (this.realPath === null) {
        throw Error('filePath is not defined.');
      }
      this.setValue(file);

      _fsExtra2['default'].outputJson(this.realPath, this.contents);
    }

    /**
     * @param {File} file .
     */
  }, {
    key: 'setValue',
    value: function setValue(file) {
      this.contents.assets[file.logicalPath] = file.path;
      this.contents.files[file.path] = {
        logical_path: file.logicalPath,
        mtime: file.mtime,
        size: file.size,
        digest: file.digest
      };
    }

    /**
     * @param {String} logicalPath .
     * @return {String} manifest path.
     */
  }, {
    key: 'getAssetValue',
    value: function getAssetValue(logicalPath) {
      return this.contents.assets[logicalPath];
    }

    /**
     * @param {String} filePath .
     * @return {Object} file object.
     */
  }, {
    key: 'getFileValue',
    value: function getFileValue(filePath) {
      return this.contents.files[filePath];
    }
  }]);

  return Manifest;
})();

exports.Manifest = Manifest;
exports['default'] = new Manifest();