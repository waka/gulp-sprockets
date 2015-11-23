/**
 * @fileoverview CSS parser.
 */

import postcss from 'postcss-scss';

export default class Css {
  /**
   * @param {String} code .
   * @return {Void} .
   */
  parse(code) {
    this._ast = postcss.parse(code);
  }

  /**
   * @return {String} Generated CSS string.
   */
  code() {
    this._ast.walkComments((comment) => {
      try {
        this._ast.removeChild(comment);
      } catch (e) {
        // nothing to do.
      }
    });
    return this._ast.toString();
  }

  /**
   * @return {Array.<String>} Comment text.
   */
  get comments() {
    let res = [];
    this._ast.walkComments(function(comment) {
      res.push(comment.text);
    });
    return res;
  }
}
