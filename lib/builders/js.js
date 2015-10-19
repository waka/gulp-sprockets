/**
 * @fileoverview JavaScript builder.
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

var _coffeeScript = require('coffee-script');

var _coffeeScript2 = _interopRequireDefault(_coffeeScript);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _transformer = require('../transformer');

// export for test

var Js = (function (_Transformer) {
  _inherits(Js, _Transformer);

  function Js() {
    _classCallCheck(this, Js);

    _get(Object.getPrototypeOf(Js.prototype), 'constructor', this).apply(this, arguments);
  }

  // singleton

  _createClass(Js, [{
    key: 'transform',

    /**
     * @param {Vinyl} vFile The vinyl object.
     * @param {Object} options .
     * @return {Vinyl} Transformed vinyl object.
     */
    value: function transform(vFile) {
      if (_path2['default'].extname(vFile.path) == '.coffee') {
        var compiled = _coffeeScript2['default'].nodes(_coffeeScript2['default'].tokens(vFile.contents.toString())).compile({ bare: true });
        vFile.contents = new Buffer(compiled);
      }
      return vFile;
    }
  }]);

  return Js;
})(_transformer.Transformer);

exports.Js = Js;
exports['default'] = new Js();