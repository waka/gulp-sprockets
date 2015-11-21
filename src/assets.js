/**
 * @fileoverview Assets configurations.
 */

import _    from "lodash";
import fs   from 'fs';
import path from 'path';

export class Assets {
  constructor() {
    this._assetPaths = [];
    this._javascriptPaths = [];
    this._stylesheetPaths = [];
    this._imagePaths = [];
  }

  /**
   * @param {Array.<String>} assetPaths .
   */
  init(assetPaths) {
    this._assetPaths = assetPaths.map(function(p) {
      return path.resolve(p);
    });

    this._javascriptPaths = this._assetPaths.map(function(p) {
      return path.join(p, 'javascripts');
    });

    this._stylesheetPaths = this._assetPaths.map(function(p) {
      return path.join(p, 'stylesheets');
    });

    this._imagePaths = this._assetPaths.map(function(p) {
      return path.join(p, 'stylesheets');
    });
  }

  /**
   * @return {Array.<String>} .
   */
  get assetPaths() {
    return this._assetPaths;
  }

  /**
   * @return {Array.<String>} .
   */
  get javascriptPaths() {
    return this._javascriptPaths;
  }

  /**
   * @return {Array.<String>} .
   */
  get stylesheetPaths() {
    return this._stylesheetPaths;
  }

  /**
   * @return {Array.<String>} .
   */
  get imagePaths() {
    return this._imagePaths;
  }

  /**
   * @param {String} filePath .
   * @param {boolean} isFullPath .
   * @return {String} Asset path.
   */
  findJavaScript(filePath, isFullPath = false) {
    const extnames = ['.js', '.coffee'];
    return this._find(
        filePath,
        isFullPath ? null : this._javascriptPaths,
        extnames);
  }

  /**
   * @param {String} filePath .
   * @param {boolean} isFullPath .
   * @return {String} Asset path.
   */
  findStyleSheet(filePath, isFullPath = false) {
    const extnames = ['.css', '.scss', '.sass'];
    return this._find(
        filePath,
        isFullPath ? null : this._stylesheetPaths,
        extnames);
  }

  /**
   * @param {String} filePath .
   * @param {boolean} isFullPath .
   * @return {String} Asset path.
   */
  findImage(filePath, isFullPath = false) {
    const extnames = ['.jpg', 'jpeg', '.png'];
    return this._find(
        filePath,
        isFullPath ? null : this._imagePaths,
        extnames);
  }

  /**
   * @private
   */
  _find(filePath, assetPaths, extnames) {
    if (!filePath) {
      throw Error(filePath + ' is not defined');
    }

    let res = null;

    if (assetPaths) {
      res = _.unique(_.flatten(assetPaths.map((p) => {
        return extnames.map((extname) => {
          return this._autoExtname(path.join(p, filePath), extname);
        });
      })))
      .find(function(p) {
        return fs.existsSync(p);
      });
    } else {
      res = filePath;
    }

    if (!res) {
      throw Error(filePath + ' is not found');
    }
    return res;
  }

  /**
   * @private
   */
  _autoExtname(filePath, extname) {
    if (path.extname(filePath) === '') {
      return filePath + extname;
    } else {
      return filePath;
    }
  }
}

// singleton
export default new Assets();
