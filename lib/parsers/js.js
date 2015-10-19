/**
 * @fileoverview Js directive parser.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _escodegen = require('escodegen');

var _escodegen2 = _interopRequireDefault(_escodegen);

var _esprima = require('esprima');

var _esprima2 = _interopRequireDefault(_esprima);

// export for test

var Js = (function () {
  _createClass(Js, null, [{
    key: 'parse',

    /**
     * @param {String} code .
     * @return {Js} Instance.
     */
    value: function parse(code) {
      return new Js(code);
    }

    /**
     * @param {String} code .
     * @constructor
     */
  }]);

  function Js(code) {
    _classCallCheck(this, Js);

    this._ast = _esprima2['default'].parse(code, { comment: true });
  }

  /**
   * @return {String} Generated JavaScript string.
   */

  _createClass(Js, [{
    key: 'code',
    value: function code() {
      return _escodegen2['default'].generate(this._ast);
    }

    /**
     * @return {Object} Esprima AST Node.
     */
  }, {
    key: 'comments',
    get: function get() {
      return this._ast.comments;
    }
  }]);

  return Js;
})();

exports['default'] = Js;
module.exports = exports['default'];