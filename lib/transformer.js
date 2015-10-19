/**
 * @fileoverview Transform vinyl.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.transformation = transformation;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var Transformer = (function () {
  function Transformer() {
    _classCallCheck(this, Transformer);
  }

  /**
   * @params {Array.<Transformer>} transformers .
   * @params {Vinyl} vFile Source vinyl object.
   * @params {!Object} options .
   * @return {Vinyl} Transformed vinyl object.
   */

  _createClass(Transformer, [{
    key: 'transform',

    /**
     * @param {Vinyl} Source vinyl object.
     * @param {Object} options .
     * @return {Vinyl} Transformed vinyl object.
     * @abstract
     */
    value: function transform(vFile, options) {
      return vFile;
    }
  }]);

  return Transformer;
})();

exports.Transformer = Transformer;

function transformation(transformers, vFile, options) {
  return transformers.reduce(function (prev, current, index, arr) {
    return arr[index].transform(prev, options);
  }, vFile);
}