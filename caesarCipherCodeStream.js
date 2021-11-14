const isEnglishLetter = require('./isEnglishLetter');
const stream = require('stream');

class caesarCipherCodeStream extends stream.Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    const str = chunk.toString().trim();
    const cipher = str
      .split('')
      .map((x) => this.#caesarCipherCode(x))
      .join('');

    this.push(cipher);
    callback();
  }

  #caesarCipherCode(char) {
    if (isEnglishLetter(char)) {
      const charCode = char.charCodeAt(0);

      let newCharCode = charCode + 1;
      if (newCharCode === 91) newCharCode = 65; // Z -> A
      if (newCharCode === 123) newCharCode = 97; // z -> a

      return String.fromCharCode(newCharCode);
    }

    return char;
  }
}

module.exports = caesarCipherCodeStream;
