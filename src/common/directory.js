import fs from 'fs';
import path from 'path';

const directory = {
  /**
   * @param {String} root Directory path.
   * @param {boolean} recursively .
   * @return {Array.<String>} List of file path in directory.
   */
  list: (root, recursively) => {
    let paths = [];

    fs.readdirSync(root).forEach(function(file) {
      const fullPath = path.join(root, file);
      const stat = fs.statSync(fullPath);
      if (stat.isFile()) {
        paths.push(fullPath);
      } else if (recursively && stat.isDirectory()) {
        paths.push.apply(
            paths, directory.list(fullPath, recursively));
      }
    });

    // remove duplicated paths
    return paths.filter(function(item, i, self) {
      return self.indexOf(item) === i;
    });
  }
}

export default directory;
