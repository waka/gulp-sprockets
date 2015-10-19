/**
 * @fileoverview Assets configurations.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var Assets = (function () {
  function Assets() {
    _classCallCheck(this, Assets);

    this._assetPaths = [];
    this._javascriptPaths = [];
    this._stylesheetPaths = [];
    this._imagePaths = [];
  }

  // singleton

  /**
   * @param {Array.<String>} assetPaths .
   */

  _createClass(Assets, [{
    key: 'init',
    value: function init(assetPaths) {
      this._assetPaths = assetPaths.map(function (p) {
        return _path2['default'].resolve(p);
      });

      this._javascriptPaths = this._assetPaths.map(function (p) {
        return _path2['default'].join(p, 'javascripts');
      });

      this._stylesheetPaths = this._assetPaths.map(function (p) {
        return _path2['default'].join(p, 'stylesheets');
      });

      this._imagePaths = this._assetPaths.map(function (p) {
        return _path2['default'].join(p, 'stylesheets');
      });
    }

    /**
     * @return {Array.<String>} .
     */
  }, {
    key: 'findJavaScript',

    /**
     * @param {String} filePath .
     * @param {boolean} isFullPath .
     * @return {String} Asset path.
     */
    value: function findJavaScript(filePath) {
      var isFullPath = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var extnames = ['.js', '.coffee'];
      return this._find(filePath, isFullPath ? null : this._javascriptPaths, extnames);
    }

    /**
     * @param {String} filePath .
     * @param {boolean} isFullPath .
     * @return {String} Asset path.
     */
  }, {
    key: 'findStyleSheet',
    value: function findStyleSheet(filePath) {
      var isFullPath = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var extnames = ['.css', '.scss', '.sass'];
      return this._find(filePath, isFullPath ? null : this._stylesheetPaths, extnames);
    }

    /**
     * @param {String} filePath .
     * @param {boolean} isFullPath .
     * @return {String} Asset path.
     */
  }, {
    key: 'findImage',
    value: function findImage(filePath) {
      var isFullPath = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var extnames = ['.jpg', '.png', '.gif'];
      return this._find(filePath, isFullPath ? null : this._imagePaths, extnames);
    }

    /**
     * @private
     */
  }, {
    key: '_find',
    value: function _find(filePath, assetPaths, extnames) {
      var _this = this;

      if (!filePath) {
        throw Error(filePath + ' is not defined');
      }

      var res = null;

      if (assetPaths) {
        res = _lodash2['default'].unique(_lodash2['default'].flatten(assetPaths.map(function (p) {
          return extnames.map(function (extname) {
            return _this._autoExtname(_path2['default'].join(p, filePath), extname);
          });
        }))).find(function (p) {
          return _fs2['default'].existsSync(p);
        });
      } else {
        res = filePath;
      }

      if (!res) {
        throw Error(filePath + ' is not found');
      }
      return res;
    }

    /**
     * @private
     */
  }, {
    key: '_autoExtname',
    value: function _autoExtname(filePath, extname) {
      if (_path2['default'].extname(filePath) === '') {
        return filePath + extname;
      } else {
        return filePath;
      }
    }
  }, {
    key: 'assetPaths',
    get: function get() {
      return this._assetPaths;
    }

    /**
     * @return {Array.<String>} .
     */
  }, {
    key: 'javascriptPaths',
    get: function get() {
      return this._javascriptPaths;
    }

    /**
     * @return {Array.<String>} .
     */
  }, {
    key: 'stylesheetPaths',
    get: function get() {
      return this._stylesheetPaths;
    }

    /**
     * @return {Array.<String>} .
     */
  }, {
    key: 'imagesPaths',
    get: function get() {
      return this._imagePaths;
    }
  }]);

  return Assets;
})();

exports.Assets = Assets;
exports['default'] = new Assets();