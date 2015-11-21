import assert    from 'power-assert';
import sprockets from '../src/sprockets';

describe('sprockets', () => {
  it('should provide 4 tasks', () => {
    assert.notEqual(sprockets.css, null);
    assert.notEqual(sprockets.js, null);
    assert.notEqual(sprockets.precompile, null);
    assert.notEqual(sprockets.scss, null);
  });
});
