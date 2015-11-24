/**
 * @fileoverview Assets configurations.
 */

import _      from "lodash";
import assign from 'object-assign';
import fs     from 'fs';
import path   from 'path';

function defaultAssetPaths() {
  return {
    app: null,
    javascripts: [],
    stylesheets: [],
    images: []
  };
}

export class Assets {
  constructor() {
    this._assetPath = null;
    this._javascriptPaths = [];
    this._stylesheetPaths = [];
    this._imagePaths = [];
  }

  /**
   * @param {Object} assetPaths .
   */
  init(assetPaths) {
    assetPaths = assign(defaultAssetPaths(), assetPaths);

    this._assetPath = path.resolve(assetPaths.app);

    this._javascriptPaths = _.flatten([
      path.join(this._assetPath, 'javascripts'),
      assetPaths.javascripts.map(function(p) {
        return path.resolve(p);
      })
    ]);

    this._stylesheetPaths = _.flatten([
      path.join(this._assetPath, 'stylesheets'),
      assetPaths.stylesheets.map(function(p) {
        return path.resolve(p);
      })
    ]);

    this._imagePaths = _.flatten([
      path.join(this._assetPath, 'images'),
      assetPaths.images.map(function(p) {
        return path.resolve(p);
      })
    ]);
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
    const extnames = ['.js', '.js.coffee', '.coffee'];
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
    const extnames = ['.css', '.css.scss', '.scss', '.sass'];
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
      throw Error('file path is not defined');
    }

    let res = null;

    if (assetPaths && assetPaths.length) {
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
      throw Error(filePath + ' is not found in ' + (assetPaths || []).join(','));
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
