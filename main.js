var app = require('app');  // Electron app
var BrowserWindow = require('browser-window');  // Creating Browser Windows

//var zmq = require('zmq');

//var Snupyter = require('lib/snupyter.js');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the side car window object
// If we don't, the window will be closed automatically when the javascript
// object is GCed.
var sideCar = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when Electron has done every
// initialization and is ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  sideCar = new BrowserWindow({width: 800, height: 800});

  // and load the index.html of the app.
  sideCar.loadUrl('file://' + __dirname + '/index.html');
  
  sideCar.webContents.on('did-finish-load', function() {
    sideCar.webContents.send('display', 'wooooooo');
  });
  
  // Emitted when the window is closed.
  sideCar.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    sideCar = null;
  });
});
