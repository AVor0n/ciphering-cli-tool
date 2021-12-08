const stream = require("stream");

class addMessageStream extends stream.Transform {
  constructor(preMessage, postMessage) {
    super();
    this.preMessage = preMessage;
    this.postMessage = postMessage;
  }

  _transform(chunk, encoding, callback) {
    const str = chunk.toString().trim();
    if (this.preMessage) this.push(this.preMessage);
    this.push(str);
    if (this.postMessage) this.push(this.postMessage);
    callback();
  }
}
module.exports = addMessageStream;
