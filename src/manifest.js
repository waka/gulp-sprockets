/**
 * @fileoverview manifest.json handler.
 *
 * manifest.json
 * {
 *   assets: {
 *     "#{original file name}": "#{output file name}"
 *   },
 *   files: {
 *     "#{output file name}": {
 *       logical_path: "#{original file name}",
 *       mtime: "#{timestamp}",
 *       size: "#{file size}",
 *       digest: "#{file digest}"
 *     }
 *   }
 * }
 */

import fs from 'fs-extra';
import path from 'path';

// export for test
export class Manifest {
  constructor() {
    this.realPath = null;
    this.contents = null;
  }

  /**
   * @param {String} assetpath .
   * @return {Void} .
   */
  init(assetPath) {
    this.realPath = path.resolve(
        path.join(assetPath), 'manifest.json');

    try {
      this.contents = fs.readJsonSync(this.realPath);
    } catch(err) {
      this.contents = { assets: {}, files: {} };
    }
  }

  /**
   * @param {File} file .
   * @return {Void} .
   */
  save(file) {
    if (this.realPath === null) {
      throw Error('filePath is not defined.')
    }
    this.setValue(file);

    fs.outputJson(this.realPath, this.contents);
  }

  /**
   * @param {File} file .
   */
  setValue(file) {
    this.contents.assets[file.logicalPath] = file.path;
    this.contents.files[file.path] = {
      logical_path: file.logicalPath,
      mtime: file.mtime,
      size: file.size,
      digest: file.digest
    };
  }

  /**
   * @param {String} logicalPath .
   * @return {String} manifest path.
   */
  getAssetValue(logicalPath) {
    return this.contents.assets[logicalPath];
  }

  /**
   * @param {String} filePath .
   * @return {Object} file object.
   */
  getFileValue(filePath) {
    return this.contents.files[filePath];
  }
}

// singleton
export default new Manifest();
