"use strict";

var watch = require('watch');
var path = require('path');

function isKernelJSON(filepath) {
  var name = path.basename(filepath);
  return name.startsWith('kernel') && name.endsWith('.json');
}

/**
 * @class RuntimeWatch
 * @classdesc Watches a Jupyter kernel runtime directory for changes, calling cb on change
 */
function RuntimeWatch(cb, directory, opts) {
  this.cb = cb;
  this.directory = directory;
  this.opts = opts || {filter: isKernelJSON, ignoreNotPermitted: true};

  watch.watchTree(this.directory, this.opts, this.runtimeDirUpdate.bind(this));
}

/**
 * Receive a runtime directory update.
 * @param {RuntimeWatch~kernelUpdateCallback} cb - Callback that handles runtimes changes (new, gone, etc.)
 */
RuntimeWatch.prototype.runtimeDirUpdate = function(f, curr, prev){
  if (typeof(f) === 'string' && isKernelJSON(f)) {
    this.cb([{ path: f, stat: curr }]);
    // if curr.nlink == 0, removed
    // if prev == null, new
    // otherwise changed

  } else if (typeof(f) === 'object') {
    // This is kernel's directory.

    let kernelFiles = [];
    for (let kernelJSON of Object.keys(f) ) {
      if (isKernelJSON(kernelJSON)) {
        kernelFiles.push({ path: kernelJSON, stat: f[kernelJSON] });
      }
    }
    this.cb(kernelFiles);
  } else { // wat
    console.err(f);
  }
};

/**
 * This callback is displayed as part of the RuntimeWatch class.
 * @callback RuntimeWatch~kernelUpdateCallback
 * @param {Object[]} files - Most recent data about your Jupyter kernel files
 * @param {string} files[].path - Path to the kernel connection
 * @param {fs.Stats} files[].stat - Latest stats about this kernel.
 */

module.exports = RuntimeWatch;
