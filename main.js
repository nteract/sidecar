"use strict";

var app = require('app');  // Electron app
var BrowserWindow = require('browser-window');  // Creating Browser Windows

var globalShortcut = require('global-shortcut');

var jupyter = require("./lib/jupyter.js");
var RuntimeWatch = require("./lib/runtime-watch.js");

var jp = require('jupyter-paths');

// Report crashes to our server.
require('crash-reporter').start();

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // Fully close up, even on OS X
  app.quit();
});

function launchSideCar(connFile) {
  // Keep a global reference of the side car window object
  // If we don't, the window will be closed automatically when the javascript
  // object is GCed.
  var config = require(connFile);
  var sideCar = null;
  var session = null;

  // Create the browser window.
  sideCar = new BrowserWindow({
    width: 800,
    height: 800,
    //"node-integration": false, // Would have to use a web-view and work with events
    //frame: false
  });

  // and load the index.html of the app.
  sideCar.loadUrl('file://' + __dirname + '/index.html');

  sideCar.webContents.on('did-finish-load', function() {

    session = new jupyter.IOPubSession(config, function(msg){
      // Get display data if available
      if("content" in msg && "data" in msg.content) {
        var richDisplay = new jupyter.RichDisplay(msg.content.data);
        richDisplay.render(sideCar.webContents);
      }

    });
  });

  // Emitted when the window is closed.
  sideCar.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    sideCar = null;
  });

  return sideCar;
}

let liveSidecars = new Map();

function updateKernel(connFiles) {
  for (let i = 0; i < connFiles.length; i++) {
    let
      connPath = connFiles[i].path,
      connStat = connFiles[i].stat;

    if (connStat.nlink !== 0) {
      // This connection file is alive.
      // If doesn't already have a sidecar, launch one for it.
      if (! liveSidecars.has(connPath)) {
        console.log("Launching sidecar for connection " + connPath + ".");

        liveSidecars.set(connPath, launchSideCar(connPath));
      }
    } else {
      console.log("Connection " + connPath + " has been closed.");
      if (liveSidecars.has(connPath)) {
        console.log("Closing the corresponding sidecar.");
        liveSidecars.get(connPath).close();
        liveSidecars.delete(connPath);
      }
    }
  }
}

var kw = new RuntimeWatch(updateKernel, jp.paths.runtime[0]);

// This method will be called when Electron has done every
// initialization and is ready for creating browser windows.
app.on('ready', function() {
		globalShortcut.register('Alt+CmdOrCtrl+I', function () {
			var win = BrowserWindow.getFocusedWindow();

			if (win) {
				win.toggleDevTools();
			}
		});

		globalShortcut.register('CmdOrCtrl+R', function () {
			var win = BrowserWindow.getFocusedWindow();

			if (win) {
				win.reloadIgnoringCache();
			}
		});
});
