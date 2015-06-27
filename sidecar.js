// This code executes within the sidecar window.

var ipc = require('ipc');
var container = document.getElementById('container');

ipc.on('display', function(message) {
  var cellNode = document.createElement('sidecar-result');
  cellNode.setPayload(message);
  container.appendChild(cellNode);

  cellNode.scrollIntoView();
});

ipc.on('trace', function (message) {
  var errNode = document.createElement('sidecar-err');
  errNode.setPayload(message);
  container.appendChild(errNode);

  errNode.scrollIntoView();
});
