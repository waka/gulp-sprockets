import path      from 'path';
import vinylFile from 'vinyl-file';
import hash      from './hash';

export default class File {
  /**
   * @param {Vynil} vFile The vynil object.
   */
  constructor(vFile) {
    this._file = vFile;
    this._digest = null;
  }

  get vinylFile() {
    return this._file;
  }

  /**
   * @return {String} .
   */
  get logicalPath() {
    return path.basename(this._file.path);
  }

  /**
   * @return {String} .
   */
  get path() {
    return this.basename.replace(this.extname, '') + '-' + this.digest + this.outputExtname;
  }

  /**
   * @return {String} .
   */
  get realPath() {
    return path.join(path.dirname(this._file.path), this.path);
  }

  /**
   * @return {String} .
   */
  get outputRealPath() {
    return this.realPath.replace(this.extname, this.outputExtname);
  }

  /**
   * @return {String} .
   */
  get basename() {
    return path.basename(this._file.path);
  }

  /**
   * @return {String} .
   */
  get extname() {
    return path.extname(this._file.path);
  }

  /**
   * @return {String} .
   */
  get outputExtname() {
    switch (this.extname) {
      case '.scss':
        return '.css';
      default:
        return this.extname;
    }
  }

  /**
   * @return {Number} .
   */
  get size() {
    return this._file.stat.size;
  }

  /**
   * @return {Date} .
   */
  get mtime() {
    return this._file.stat.mtime;
  }

  /**
   * @return {String} .
   */
  get digest() {
    if (this._digest === null) {
      this._digest = hash.create(this._file.contents.toString());
    }
    return this._digest;
  }

  static createVinyl(filePath) {
    return vinylFile.readSync(filePath);
  }
}
