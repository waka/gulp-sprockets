/**
 * @fileoverview Js directive parser.
 */

import escodegen from 'escodegen';
import esprima from 'esprima';

export default class Js {
  /**
   * @return {Void} .
   */
  parse(code) {
    this._ast = esprima.parse(code, {comment: true});
  }

  /**
   * @return {String} Generated JavaScript string.
   */
  code() {
    return escodegen.generate(this._ast);
  }

  /**
   * @return {Array.<String>} Comment texts.
   */
  get comments() {
    return this._ast.comments.map(function(comment) {
      return comment.value;
    });
  }
}
