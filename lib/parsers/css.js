/**
 * @fileoverview CSS parser.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

// export for test

var Css = (function () {
  _createClass(Css, null, [{
    key: 'parse',

    /**
     * @param {String} code .
     * @return {Css} Instance.
     */
    value: function parse(code) {
      return new Css(code);
    }

    /**
     * @param {String} code .
     * @constructor
     */
  }]);

  function Css(code) {
    _classCallCheck(this, Css);

    this._ast = _postcss2['default'].parse(code);
  }

  /**
   * @return {String} Generated CSS string.
   */

  _createClass(Css, [{
    key: 'code',
    value: function code() {
      this._ast.removeChild(this.comment);
      return this._ast.toString();
    }

    /**
     * @return {Node} PostCSS AST Node.
     */
  }, {
    key: 'comment',
    get: function get() {
      var res = [];
      this._ast.walkComments(function (comment) {
        res.push(comment);
      });
      return res[0];
    }
  }]);

  return Css;
})();

exports['default'] = Css;
module.exports = exports['default'];