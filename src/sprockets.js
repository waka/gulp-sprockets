import 'babel-polyfill';
import css        from './streams/css';
import js         from './streams/js';
import precompile from './streams/precompile';
import scss       from './streams/scss';
import assets     from './assets';
import manifest   from './manifest';

let sprockets = { css, js, precompile, scss };

/**
 * @param {Object} assetPaths .
 * @param {String} manifestPath .
 */
sprockets.declare = function(assetPaths, manifestPath) {
  assets.init(assetPaths);
  manifest.init(manifestPath);
};

export default sprockets;
