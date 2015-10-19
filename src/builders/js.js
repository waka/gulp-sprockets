/**
 * @fileoverview JavaScript builder.
 */

import compiler from 'coffee-script';
import path     from 'path';
import { Transformer } from '../transformer';

// export for test
export class Js extends Transformer {
  /**
   * @param {Vinyl} vFile The vinyl object.
   * @param {Object} options .
   * @return {Vinyl} Transformed vinyl object.
   */
  transform(vFile) {
    if (path.extname(vFile.path) == '.coffee') {
      const compiled = compiler.nodes(
          compiler.tokens(vFile.contents.toString())
      ).compile({bare: true});
      vFile.contents = new Buffer(compiled);
    }
    return vFile;
  }
}

// singleton
export default new Js();
