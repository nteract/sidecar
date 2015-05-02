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
    
    /** Jupyter IOPub channel
     * @member {module:jmp~Socket}
     */
     this.iopubSocket = new jmp.Socket(
          "sub",
           this.connectionJSON.signature_scheme.slice("hmac-".length),
           this.connectionJSON.key
     ); 
     this.iopubURL = formConnectionString(this.connectionJSON, "iopub");

     console.log('Connecting to ' + this.iopubURL);

     this.iopubSocket.connect(this.iopubURL);
     this.iopubSocket.subscribe('');
     
     this.iopubSocket.on("message", onIOPubMessage.bind(this));
     
     function onIOPubMessage(msg) {
       console.dir(msg);
     }
    
}