"use strict";

module.exports = {
  IOPubSession: IOPubSession
};

var jmp = require("jmp");
var zmq = require("zmq");
var katex = require("katex");
var marked = require("marked");
var Convert = require('ansi-to-html');

function formConnectionString(config, channel) {
  var portDelimiter = ":";
  if (config.transport !== "tcp") {
    portDelimiter = "-";
  }

  return config.transport + "://" + config.ip + portDelimiter + config[channel + "_port"];
}

/**
 * This callback handles jmp.Messages
 * @callback messageCallback
 * @param {jmp.Message} message
 */

/**
 * @class IOPubSession
 * @classdesc Keeps a session with an IOPub channel
 * @param {Object} connectionJSON Connection information provided by Jupyter
 */
function IOPubSession(connectionJSON) {
  	/**
     * Connection information provided by Jupyter
     * @member {Object}
     */
    this.connectionJSON = connectionJSON;

    var
      hmac = this.connectionJSON.signature_scheme.slice("hmac-".length),
      key = this.connectionJSON.key;

    /**
     * Jupyter IOPub channel
     * @member {module:jmp~Socket}
     */
    this.iopubSocket = new jmp.Socket("sub", hmac, key);

    /**
     * URL for zmq socket
     * @member {string}
     */
    this.iopubURL = formConnectionString(this.connectionJSON, "iopub");

    this.iopubSocket.connect(this.iopubURL);
    this.iopubSocket.subscribe('');

    this.heartbeatSocket = new zmq.Socket("req");
    this.heartbeatURL = formConnectionString(this.connectionJSON, "hb");
    this.heartbeatSocket.connect(this.heartbeatURL);
}

/**
 * Test the kernel's heartbeat to verify that it is (still) alive.
 * @param {healthCallback} cb - Callback to invoke with the health of the kernel.
 */
IOPubSession.prototype.checkHealth = function (cb) {
  const payload = "simple bytestrings, not full JSON messages described above";
  let giveUp = null;

  this.heartbeatSocket.once("message", function (reply) {
    if (reply.toString() === payload) {
      if (giveUp) { clearTimeout(giveUp); }
      cb(true);
    } else {
      console.error(`Error: unexpected payload <${reply}>`);
    }
  });

  this.heartbeatSocket.send(payload);

  giveUp = setTimeout(function () { cb(false); }, 2000);
};

/**
 * Register a callback to be fired when each Jupyter kernel IO message is received.
 * @param {messageCallback} cb - Callback that handles messages
 */
IOPubSession.prototype.on = function (cb) {
  this.iopubSocket.on("message", cb);
};

/**
 * This callback reports whether or not a kernel is alive.
 * @callback healthCallback
 * @param {bool} True if the kernel has responded, false if it has not.
 */
