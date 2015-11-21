import assert from 'power-assert';
import File   from '../../src/common/file';
import js     from '../../src/streams/js';

describe('JavaScript Stream', () => {
  it('should pass file when it is null', (done) => {
    const stream = js();
    const emptyFile = {
      'isNull': function () {
        return true;
      }
    };
    stream.on('data', (data) => {
      assert.equal(data, emptyFile);
      done();
    });
    stream.write(emptyFile);
  });
});
