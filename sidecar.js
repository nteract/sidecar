// This code executes within the sidecar window.

var resultPrototype = Object.create(HTMLElement.prototype, {
  createdCallback: {
    value: function() {
      var t = document.querySelector('#tmpl-result');
      var clone = document.importNode(t.content, true);
      this.root = this.createShadowRoot();
      this.root.appendChild(clone);
    }
  }
});

resultPrototype.setPayload = function (content) {
  this.root.getElementById("output-container").innerHTML = content;
};

document.registerElement('sidecar-result', {prototype: resultPrototype});

var errPrototype = Object.create(HTMLElement.prototype, {
  createdCallback: {
    value: function() {
      var t = document.querySelector('#tmpl-err');
      var clone = document.importNode(t.content, true);
      this.root = this.createShadowRoot();
      this.root.appendChild(clone);
    }
  }
});

errPrototype.setPayload = function (trace) {
  this.root.getElementById("trace").innerHTML = trace;
};

document.registerElement('sidecar-err', {prototype: errPrototype});

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
