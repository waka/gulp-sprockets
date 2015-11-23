/**
 * @fileoverview Sass(Scss) builder.
 */

import compiler from 'node-sass';
import path from 'path';
import File from '../common/file';
import assets from '../assets';
import manifest from '../manifest';
import { Transformer } from '../transformer';

/**
 * Return file path from manifest.
 *
 * @param {String} url .
 * @return {String} Manifest path.
 */
function assetHashPath(url) {
  const parsedUrl = path.parse(url.getValue());
  const asset = manifest.getAssetValue(parsedUrl.base);
  return compiler.types.String('url("' + asset + '")');
}

/**
 * Return file path.
 *
 * @param {String} url .
 * @return {String} Raw asset path.
 */
function assetPath(url) {
  const parsedUrl = path.parse(url.getValue());
  return compiler.types.String('url("' + parsedUrl.base + '")');
}

// export for test
export class Scss extends Transformer {
  /**
   * @param {Vinyl} vFile The vinyl object.
   * @param {Object} options .
   * @return {Vinyl} Transformed vinyl object.
   */
  transform(vFile, options) {
    const func = options.precompile ? assetHashPath : assetPath;
    const compiled = compiler.renderSync({
      file: vFile.path,
      outputStyle: 'expanded',
      functions: {
        "asset-path($url)": func,
        "image-url($url)": func
      },
      includePaths: assets.stylesheetPaths.concat([path.dirname(vFile.path)])
    });
    vFile.contents = new Buffer(compiled.css.toString());
    return vFile;
  }
}

// singleton
export default new Scss();
