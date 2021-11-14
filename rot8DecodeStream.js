const isEnglishLetter = require('./isEnglishLetter');
const stream = require('stream');

class Rot8DecodeStream extends stream.Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    const str = chunk.toString().trim();
    const cipher = str
      .split('')
      .map((x) => this.#rot8CipherDecode(x))
      .join('');

    this.push(cipher);
    callback();
  }

  #rot8CipherDecode(char) {
    if (isEnglishLetter(char)) {
      const charCode = char.charCodeAt(0);
      let newCharCode = charCode - 8;

      if (56 < newCharCode && newCharCode < 65) {
        newCharCode = 91 - (65 - newCharCode);
      } else if (88 < newCharCode && newCharCode < 97) {
        newCharCode = 123 - (97 - newCharCode);
      }
      return String.fromCharCode(newCharCode);
    }

    return char;
  }
}

module.exports = Rot8DecodeStream;
