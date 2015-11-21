import path     from 'path';
import assert   from 'power-assert';
import { Assets } from '../src/assets';

describe('Assets', () => {
  describe('#init', () => {
    const assets = new Assets();

    before(() => {
      assets.init(['app/assets', 'front']);
    });

    describe('#javascriptPaths', () => {
      it('should return 2 paths', () => {
        assert.equal(assets.javascriptPaths.length, 2);
      });
    });

    describe('#stylesheetPaths', () => {
      it('should return 2 paths', () => {
        assert.equal(assets.stylesheetPaths.length, 2);
      });
    });

    describe('#imagePaths', () => {
      it('should return 2 paths', () => {
        assert.equal(assets.imagePaths.length, 2);
      });
    });
  });

  describe('#findJavaScript', () => {
    const assets = new Assets();

    before(() => {
      assets.init(['./test-assets']);
    });

    describe('existence javascript file', () => {
      it('should return path', () => {
        assert(
            assets.findJavaScript('application.js'),
            path.resolve('./test-assets/javascripts/application.js')
            );
      });
    });

    describe('existence coffeescript file', () => {
      it('should return path', () => {
        assert(
            assets.findJavaScript('common.coffee'),
            path.resolve('./test-assets/javascripts/common.coffee')
            );
      });
    });

    describe('no existence file', () => {
      it('should raise error', () => {
        assert.throws(
            () => {
              assets.findJavaScript('no_existence_path.js');
            },
            Error
            );
      });
    });

    describe('no extname', () => {
      it('should return auto adding', () => {
        assert(
            assets.findJavaScript('application'),
            path.resolve('./test-assets/javascripts/application.js')
            );
      });
    });
  });

  describe('#findStyleSheet', () => {
    const assets = new Assets();

    before(() => {
      assets.init(['./test-assets']);
    });

    describe('existence css file', () => {
      it('should return path', () => {
        assert(
            assets.findStyleSheet('application.css'),
            path.resolve('./test-assets/stylesheets/application.css')
            );
      });
    });

    describe('existence scss file', () => {
      it('should return path', () => {
        assert(
            assets.findStyleSheet('common.scss'),
            path.resolve('./test-assets/stylesheets/common.scss')
            );
      });
    });

    describe('no existence file', () => {
      it('should raise error', () => {
        assert.throws(
            () => {
              assets.findStyleSheet('no_existence_path.css');
            },
            Error
            );
      });
    });

    describe('no extname', () => {
      it('should return auto adding', () => {
        assert(
            assets.findJavaScript('application'),
            path.resolve('./test-assets/stylesheets/application.css')
            );
      });
    });
  });
});
