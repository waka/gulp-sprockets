/**
 * @fileoverview manifest stream.
 */

import manifest from '../builders/manifest';
import stream from 'event-stream';

export default function () {
  const file = manifest.create();
  return stream.readArray([file]);
}
