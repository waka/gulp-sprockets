/**
 * @fileoverview Sass(Scss) builder.
 */

import compiler from 'node-sass';
import path from 'path';
import hash from '../common/hash';
import manifest from './manifest';

function assetPath(url) {
  const parsedUrl = path.parse(url.getValue());

  const returnString = 'url("' + path.format(parsedUrl) + '")';
  return sass.types.String(returnString);
}

export class Sass {
  path(file) {
    const baseName = (new String(file.path))
      .replace(path.extname(file.path), '');
    const hashValue = hash.create(file.contents.toString());
    return baseName + '-' + hashValue + '.css';
  }

  compile(file) {
    const compiled = compiler.renderSync({
      file: file.path,
      outputStyle: 'expanded',
      functions: {
        "asset-path($url)": assetPath,
        "image-url($url)": assetPath
      }
    });
    return compiled.css.toString();
  }

  transform(file) {
    return {path: this.path(file), contents: this.compile(file)};
  }
}

export default new Sass();
