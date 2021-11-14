const isEnglishLetter = require('./isEnglishLetter');
const stream = require('stream');

class caesarCipherDecodeStream extends stream.Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    const str = chunk.toString().trim();
    const cipher = str
      .split('')
      .map((x) => this.#caesarCipherDecode(x))
      .join('');

    this.push(cipher);
    callback();
  }

  #caesarCipherDecode(char) {
    if (isEnglishLetter(char)) {
      const charCode = char.charCodeAt(0);

      let newCharCode = charCode - 1;
      if (newCharCode === 64) newCharCode = 90; // A -> Z
      if (newCharCode === 96) newCharCode = 122; // a -> z

      return String.fromCharCode(newCharCode);
    }

    return char;
  }
}

module.exports = caesarCipherDecodeStream;
