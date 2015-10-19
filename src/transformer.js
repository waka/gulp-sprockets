/**
 * @fileoverview Transform vinyl.
 */

import _ from 'lodash';

export class Transformer {
  /**
   * @param {Vinyl} Source vinyl object.
   * @param {Object} options .
   * @return {Vinyl} Transformed vinyl object.
   * @abstract
   */
  transform(vFile, options) {
    return vFile;
  }
}

/**
 * @params {Array.<Transformer>} transformers .
 * @params {Vinyl} vFile Source vinyl object.
 * @params {!Object} options .
 * @return {Vinyl} Transformed vinyl object.
 */
export function transformation(transformers, vFile, options) {
  return transformers.reduce(function(prev, current, index, arr) {
    return arr[index].transform(prev, options);
  }, vFile);
}
