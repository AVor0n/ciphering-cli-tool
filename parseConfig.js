const caesarCipherCodeStream = require("./caesarCipherCodeStream");
const caesarCipherDecodeStream = require("./caesarCipherDecodeStream");
const rot8CodeStream = require("./rot8CodeStream");
const rot8DecodeStream = require("./rot8DecodeStream");
const atbashCodeStream = require("./atbashCodeStream");

function parseConfig(config) {
  const streams = [];
  const actions = config.split("-");
  for (let action of actions) {
    switch (action) {
      case "C0":
        streams.push(new caesarCipherDecodeStream());
        break;
      case "C1":
        streams.push(new caesarCipherCodeStream());
        break;
      case "A":
      case "A0":
      case "A1":
        streams.push(new atbashCodeStream());
        break;
      case "R0":
        streams.push(new rot8DecodeStream());
        break;
      case "R1":
        streams.push(new rot8CodeStream());
        break;
      default:
        throw new Error("Неверный конфиг. Получено: " + action);
    }
  }
  return streams;
}

module.exports = parseConfig;
