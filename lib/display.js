module.exports = RichDisplay;

/**
 * @class RichDisplay
 * @classdesc Assists in choosing the most rich display of the data
 * @param {Object} data The data field of an IOPub message's content (msg.content.data), keys are mimetypes
 *
 * MIME types supported (in display precedence):
 *   application/javascript
 *   text/html
 *   text/markdown
 *   text/latex
 *   image/svg+xml
 *   image/png
 *   image/jpeg
 *   application/json
 *   text/plain
 */
function RichDisplay () {
}

RichDisplay.prototype.handleMessage = function (message, callbacks) {
  this.msg = message;
  this.content = message.content;
  this.data = message.content.data;

  switch(message.header.msg_type) {
    case "execute_result":
    case "display_data":
      this.renderData(callbacks);
      break;
    case "stream":
      this.renderStream(callbacks);
      break;
    case "status":
      this.updateStatus(callbacks);
      break;
    case "error":
      this.renderError(callbacks);
      break;
    case "execute_input":
      // We don't do anything with execute_input for the moment
      break;
    case "comm_open":
    case "comm_msg":
      this.renderUnimplemented(callbacks);
      break;
    default:
      console.log("Noticed a msg_type we don't recognize");
      console.log(message);
  }
};

RichDisplay.prototype.renderData = function(callbacks) {
    // JavaScript is our most rich display type
    if ("application/javascript" in this.data) {
      var code = this.data["application/javascript"];
      callbacks.execute(code);
      return;
    }

    var html = null;

    if("text/html" in this.data){
      html = this.data["text/html"];
    } else if ("text/markdown" in this.data) {
      html = marked(this.data['text/markdown']);
    } else if ("text/latex" in this.data) {
      html = katex.renderToString(this.data["text/latex"]);
    } else if ("image/svg+xml" in this.data) {
      html = "<img src='data:image/svg+xml;base64," + this.data["image/svg+xml"] + "'/>";
    } else if ("image/png" in this.data) {
      html = "<img src='data:image/png;base64," + this.data["image/png"] + "'/>";
    } else if ("image/jpeg" in this.data) {
      html = "<img src='data:image/jpeg;base64," + this.data["image/jpeg"] + "'/>";
    } else if ("application/json" in this.data) {
      html = "<pre>" + JSON.stringify(this.data["application/json"]) + "</pre>";
    } else if ("text/plain" in this.data) {
      html = this.data["text/plain"];
    } else {
      console.log(this.data);
    }

    callbacks.result(html);
};

RichDisplay.prototype.renderStream = function(callbacks) {
  callbacks.result(`<pre class='stream-${this.content.name}'>${this.content.text}</pre>`);
};

RichDisplay.prototype.updateStatus = function(webContents) {
  // TODO: Do something with the status (spinner anyone?)
  console.log(`Kernel ${this.content.execution_state}`);
};

RichDisplay.prototype.renderError = function(callbacks) {
  var convert = new Convert({newline: true});
  var tracebackHTML = convert.toHtml(this.content.traceback);

  callbacks.trace(`<p style='font-family: monospace;'>${tracebackHTML}</p>`);
};

RichDisplay.prototype.renderUnimplemented = function(callbacks) {
  callbacks.result(`<h1><span style='font-family: monospace'>${this.msg.header.msg_type}</span> not implemented</h1><p style='font-family: monospace;'>${JSON.stringify(this.content)}</p>`);
};
