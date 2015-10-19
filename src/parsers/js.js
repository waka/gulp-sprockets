/**
 * @fileoverview Js directive parser.
 */

import escodegen from 'escodegen';
import esprima from 'esprima';

// export for test
export default class Js {
  /**
   * @param {String} code .
   * @return {Js} Instance.
   */
  static parse(code) {
    return new Js(code);
  }

  /**
   * @param {String} code .
   * @constructor
   */
  constructor(code) {
    this._ast = esprima.parse(code, {comment: true});
  }

  /**
   * @return {String} Generated JavaScript string.
   */
  code() {
    return escodegen.generate(this._ast);
  }

  /**
   * @return {Object} Esprima AST Node.
   */
  get comments() {
    return this._ast.comments;
  }
}
