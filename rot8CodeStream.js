const isEnglishLetter = require('./isEnglishLetter');
const stream = require('stream');

class Rot8CodeStream extends stream.Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    const str = chunk.toString().trim();
    const cipher = str
      .split('')
      .map((x) => this.#rot8CipherCode(x))
      .join('');

    this.push(cipher);
    callback();
  }

  #rot8CipherCode(char) {
    if (isEnglishLetter(char)) {
      const charCode = char.charCodeAt(0);
      let newCharCode = charCode + 8;
      if (90 < newCharCode && newCharCode < 99) {
        newCharCode = 64 + (newCharCode - 90);
      } else if (122 < newCharCode && newCharCode < 131) {
        newCharCode = 96 + (newCharCode - 122);
      }
      return String.fromCharCode(newCharCode);
    }

    return char;
  }
}

module.exports = Rot8CodeStream;
