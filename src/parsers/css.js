/**
 * @fileoverview CSS parser.
 */

import postcss from 'postcss';

// export for test
export default class Css {
  /**
   * @param {String} code .
   * @return {Css} Instance.
   */
  static parse(code) {
    return new Css(code);
  }

  /**
   * @param {String} code .
   * @constructor
   */
  constructor(code) {
    this._ast = postcss.parse(code);
  }

  /**
   * @return {String} Generated CSS string.
   */
  code() {
    this._ast.removeChild(this.comment);
    return this._ast.toString();
  }

  /**
   * @return {Node} PostCSS AST Node.
   */
  get comment() {
    let res = [];
    this._ast.walkComments(function(comment) {
      res.push(comment);
    });
    return res[0];
  }
}
