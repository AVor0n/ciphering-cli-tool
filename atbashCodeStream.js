const isEnglishLetter = require('./isEnglishLetter');
const stream = require('stream');

class atbashCodeStream extends stream.Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    const str = chunk.toString().trim();
    const cipher = str
      .split('')
      .map((x) => this.#atbashTransform(x))
      .join('');

    this.push(cipher);
    callback();
  }

  #atbashTransform(char) {
    if (isEnglishLetter(char)) {
      const charCode = char.charCodeAt(0);

      let newCharCode;
      if (charCode <= 90) {
        newCharCode = 65 + (90 - charCode); // Z -> A, A -> Z
      } else if (charCode <= 122) {
        newCharCode = 97 + (122 - charCode); // z -> a, a -> z
      }

      return String.fromCharCode(newCharCode);
    }

    return char;
  }
}
module.exports = atbashCodeStream;
