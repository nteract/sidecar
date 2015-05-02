module.exports = {
  IOPubSession: IOPubSession
};

var jmp = require("jmp");

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
 * @param {messageCallback} messageCallback Callback that handles messages
 */
function IOPubSession(connectionJSON, cb) {
  	/**
     * Connection information provided by Jupyter
     * @member {Object}
     */
    this.connectionJSON = connectionJSON;
    
    /**
     * Handles messages from the IOPub channel
     * @member {messageCallback}
     */
    this.messageCallback = cb;
    
    /**
     * Jupyter IOPub channel
     * @member {module:jmp~Socket}
     */
    this.iopubSocket = new jmp.Socket(
         "sub",
          this.connectionJSON.signature_scheme.slice("hmac-".length),
          this.connectionJSON.key
    ); 
     
    /**
     * URL for zmq socket
     * @member {string}
     */
    this.iopubURL = formConnectionString(this.connectionJSON, "iopub");

    console.log('Connecting to ' + this.iopubURL);

    this.iopubSocket.connect(this.iopubURL);
    this.iopubSocket.subscribe('');
     
    this.iopubSocket.on("message", cb);
}