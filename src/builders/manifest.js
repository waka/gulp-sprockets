/**
 * @fileoverview manifest.json builder
 */

import Vinyl from 'vinyl';

export class Manifest {
  constructor() {
    this.map = {};
  }

  create() {
    return new Vinyl({
      path: 'manifest.json',
      contents: new Buffer(JSON.stringify({}))
    });
  }

  add(originalName, actualName) {
    this.map[originalName] = actualName;
  }

  getActualName(originalName) {
    return this.map[originalName];
  }

  load() {
  }

  save() {
  }
}

// singleton
export default new Manifest();
