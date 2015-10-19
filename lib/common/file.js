'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _vinylFile = require('vinyl-file');

var _vinylFile2 = _interopRequireDefault(_vinylFile);

var _hash = require('./hash');

var _hash2 = _interopRequireDefault(_hash);

var File = (function () {
  /**
   * @param {Vynil} vFile The vynil object.
   */

  function File(vFile) {
    _classCallCheck(this, File);

    this._file = vFile;
    this._digest = null;
  }

  _createClass(File, [{
    key: 'vinylFile',
    get: function get() {
      return this._file;
    }

    /**
     * @return {String} .
     */
  }, {
    key: 'logicalPath',
    get: function get() {
      return _path2['default'].basename(this._file.path);
    }

    /**
     * @return {String} .
     */
  }, {
    key: 'path',
    get: function get() {
      return this.basename.replace(this.extname, '') + '-' + this.digest + this.outputExtname;
    }

    /**
     * @return {String} .
     */
  }, {
    key: 'realPath',
    get: function get() {
      return _path2['default'].join(_path2['default'].dirname(this._file.path), this.path);
    }

    /**
     * @return {String} .
     */
  }, {
    key: 'outputRealPath',
    get: function get() {
      return this.realPath.replace(this.extname, this.outputExtname);
    }

    /**
     * @return {String} .
     */
  }, {
    key: 'basename',
    get: function get() {
      return _path2['default'].basename(this._file.path);
    }

    /**
     * @return {String} .
     */
  }, {
    key: 'extname',
    get: function get() {
      return _path2['default'].extname(this._file.path);
    }

    /**
     * @return {String} .
     */
  }, {
    key: 'outputExtname',
    get: function get() {
      switch (this.extname) {
        case '.scss':
          return '.css';
        default:
          return this.extname;
      }
    }

    /**
     * @return {Number} .
     */
  }, {
    key: 'size',
    get: function get() {
      return this._file.stat.size;
    }

    /**
     * @return {Date} .
     */
  }, {
    key: 'mtime',
    get: function get() {
      return this._file.stat.mtime;
    }

    /**
     * @return {String} .
     */
  }, {
    key: 'digest',
    get: function get() {
      if (this._digest === null) {
        this._digest = _hash2['default'].create(this._file.contents.toString());
      }
      return this._digest;
    }
  }], [{
    key: 'createVinyl',
    value: function createVinyl(filePath) {
      return _vinylFile2['default'].readSync(filePath);
    }
  }]);

  return File;
})();

exports['default'] = File;
module.exports = exports['default'];