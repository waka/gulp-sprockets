import assert from 'power-assert';
import File   from '../../src/common/file';
import css    from '../../src/streams/css';

describe('CSS Stream', () => {
  it('should pass file when it is null', (done) => {
    const stream = css();
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
