import assert       from 'power-assert';
import File         from '../src/common/file';
import { Manifest } from '../src/manifest';

describe('Manifest', () => {
  describe('#init', () => {
    const manifest = new Manifest();

    describe('manifest already exists', () => {
      before(() => {
        manifest.init('./test-assets');
      });

      it('read contents from file', () => {
        assert(manifest.contents.assets, {});
        assert(manifest.contents.files, {});
      });
    });

    describe('manifest not exists', () => {
      before(() => {
        manifest.init('./test');
      });

      it('create new contents', () => {
        assert(manifest.contents.assets, {});
        assert(manifest.contents.files, {});
      });
    });
  });

  describe('#save', () => {
    const manifest = new Manifest();
    const file = new File(
      File.createVinyl(
        './test-assets/javascripts/application.js')
    );

    describe('did not called init', () => {
      it('should raise error', () => {
        assert.throws(
          () => {
            manifest.save(file);
          },
          Error
        );
      });
    });
  });

  describe('#setValue', () => {
    const manifest = new Manifest();
    const file = new File(
      File.createVinyl(
        './test-assets/javascripts/application.js')
    );

    before(() => {
      manifest.init('./test-assets');
      manifest.setValue(file);
    });

    it('should set asset path', () => {
      assert(
        manifest.contents.assets[file.logicalPath],
        file.path
      );
    });

    it('should set file paths', () => {
      assert(
        manifest.contents.files[file.path].logical_path,
        file.logicalPath
      );
      assert(
        manifest.contents.files[file.path].mtime,
        file.mtime
      );
      assert(
        manifest.contents.files[file.path].size,
        file.size
      );
      assert(
        manifest.contents.files[file.path].digest,
        file.digest
      );
    });
  });
});
