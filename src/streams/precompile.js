/**
 * @fileoverview Precompile stream.
 */

import stream   from 'event-stream';
import File     from '../common/file'; 
import manifest from '../manifest';

export default function() {
  return stream.through(function(vFile) {
    const file = new File(vFile);

    manifest.save(file);
    vFile.path = file.outputRealPath;

    this.emit('data', vFile);
  });
};
