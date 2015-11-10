/**
 * @fileoverview Directive handler base class.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commonDirectory = require('../common/directory');

var _commonDirectory2 = _interopRequireDefault(_commonDirectory);

var _commonFile = require('../common/file');

var _commonFile2 = _interopRequireDefault(_commonFile);

var _transformer = require('../transformer');

var Base = (function (_Transformer) {
  _inherits(Base, _Transformer);

  function Base() {
    _classCallCheck(this, Base);

    _get(Object.getPrototypeOf(Base.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Base, [{
    key: 'transform',

    /**
     * @override
     */
    value: function transform(vFile, options) {
      return vFile;
    }

    /**
     * @abstract
     * @return {Object} Builder instance.
     */
  }, {
    key: 'getAsset',

    /**
     * @abstract
     * @param {String} p File path.
     * @param {boolean} isFullpath .
     * @return {String} Asset path.
     */
    value: function getAsset(p) {
      var isFullPath = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      throw Error('must be implemented');
    }

    /**
     * @return {Array.<String>} Required paths.
     */
  }, {
    key: 'getRequires',
    value: function getRequires() {
      var _this = this;

      var requires = [];
      var stubs = [];

      this.parser.comments.forEach(function (comment) {
        _this.getDirectives(comment).forEach(function (obj) {
          switch (obj.directive) {
            case 'require':
              requires.push(_this.requireDirective(obj.path));
              break;
            case 'require_tree':
              requires.push.apply(requires, _this.requireTreeDirective(obj.path));
              break;
            case 'stub':
              stubs.push(_this.stubDirective(obj.path));
              break;
          }
        });
      });

      return requires.filter(function (req) {
        return 0 > stubs.indexOf(req);
      });
    }

    /**
     * @param {Array.<String>} Required paths.
     * @param {Object} options .
     * @return {String} Replaced code string.
     */
  }, {
    key: 'generateCode',
    value: function generateCode(requires, options) {
      var _this2 = this;

      var buf = requires.map(function (req) {
        var res = _this2.builder.transform(_commonFile2['default'].createVinyl(req), options);
        return res.contents.toString();
      });
      return buf.join('\n') + '\n' + this.parser.code();
    }

    /**
     * @param {String} p File path.
     * @return {String} Asset path.
     */
  }, {
    key: 'requireDirective',
    value: function requireDirective(p) {
      return this.getAsset(p);
    }

    /**
     * @param {String} p Directory path.
     * @return {Array.<String>} Asset paths.
     */
  }, {
    key: 'requireTreeDirective',
    value: function requireTreeDirective(p) {
      var _this3 = this;

      return _lodash2['default'].flatten(this.assetPaths.map(function (assetPath) {
        var dirPath = _path2['default'].join(assetPath, p);
        return _commonDirectory2['default'].list(dirPath, true).map(function (p2) {
          return _this3.getAsset(p2, true);
        });
      }));
    }

    /**
     * @param {String} p File path.
     * @return {String} Asset path.
     */
  }, {
    key: 'stubDirective',
    value: function stubDirective(p) {
      return this.getAsset(p);
    }

    /**
     * @param {String} comment .
     * @return {Object} Analyzed directive.
     */
  }, {
    key: 'getDirectives',
    value: function getDirectives(comment) {
      return comment.split('\n').map(function (line) {
        var text = line.replace(/^.*=/, '').trim();
        if (text.match(/^(include|require|require_tree|stub)\s(.+)/)) {
          return { directive: RegExp.$1, path: RegExp.$2 };
        } else {
          return { directive: null, path: null };
        }
      });
    }
  }, {
    key: 'builder',
    get: function get() {
      throw Error('must be implemented');
    }

    /**
     * @abstract
     * @return {Class} Parser class.
     */
  }, {
    key: 'parser',
    get: function get() {
      throw Error('must be implemented');
    }

    /**
     * @abstract
     * @return {Array.<String>} Asset paths.
     */
  }, {
    key: 'assetPaths',
    get: function get() {
      throw Error('must be implemented');
    }
  }]);

  return Base;
})(_transformer.Transformer);

exports['default'] = Base;
module.exports = exports['default'];