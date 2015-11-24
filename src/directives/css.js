/**
 * @fileoverview CSS directive handler.
 */

import path    from 'path';
import assets  from '../assets';
import builder from '../builders/scss';
import Parser  from '../parsers/css';
import Base    from './base';

export class Css extends Base {
  /**
   * @override
   */
  get builder() {
    return builder;
  }

  /**
   * @override
   */
  get parser() {
    if (!this._parser) {
      this._parser = new Parser();
    }
    return this._parser;
  }

  /**
   * @override
   */
  get assetPaths() {
    return assets.stylesheetPaths;
  }

  /**
   * @override
   */
  getAsset(path, isFullPath = false) {
    return assets.findStyleSheet(path, isFullPath);
  }

  /**
   * @override
   */
  transform(vFile, options) {
    if (path.extname(vFile.path) === '.scss' || path.extname(vFile.path) === '.sass') {
      return this.builder.transform(vFile, options);
    }

    try {
      this.parser.parse(vFile.contents.toString());
      const code = this.generateCode(this.getRequires(), options);
      vFile.contents = new Buffer(code);
    } catch (err) {
      console.log("Error: " + vFile.path);
      throw err;
    }
    return vFile;
  }

  /**
   * @override
   */
  newInstance() {
    return new Css();
  }
}

// singleton
export default new Css();
