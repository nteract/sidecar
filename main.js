var app = require('app');  // Electron app
var BrowserWindow = require('browser-window');  // Creating Browser Windows

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
}

function updateKernel(connFile, stat) {
  if (stat.nlink !== 0){
    launchSideCar(connFile);
  } else {
    console.log("Connection " + connFile + " closed!");
  }

}

var kw = new RuntimeWatch(updateKernel, jp.paths.runtime[0]);

// This method will be called when Electron has done every
// initialization and is ready for creating browser windows.
app.on('ready', function() {
});
