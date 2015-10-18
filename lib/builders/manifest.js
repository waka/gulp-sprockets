/**
 * @fileoverview manifest.json builder
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _vinyl = require('vinyl');

var _vinyl2 = _interopRequireDefault(_vinyl);

var Manifest = (function () {
  function Manifest() {
    _classCallCheck(this, Manifest);

    this.map = {};
  }

  // singleton

  _createClass(Manifest, [{
    key: 'create',
    value: function create() {
      return new _vinyl2['default']({
        path: 'manifest.json',
        contents: new Buffer(JSON.stringify({}))
      });
    }
  }, {
    key: 'add',
    value: function add(originalName, actualName) {
      this.map[originalName] = actualName;
    }
  }, {
    key: 'getActualName',
    value: function getActualName(originalName) {
      return this.map[originalName];
    }
  }, {
    key: 'load',
    value: function load() {}
  }, {
    key: 'save',
    value: function save() {}
  }]);

  return Manifest;
})();

exports.Manifest = Manifest;
exports['default'] = new Manifest();