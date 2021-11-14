'use strict';
const fs = require('fs');
const process = require('process');
const caesarCipherCodeStream = require('./caesarCipherCodeStream');
const caesarCipherDecodeStream = require('./caesarCipherDecodeStream');
const rot8CodeStream = require('./rot8CodeStream');
const rot8DecodeStream = require('./rot8DecodeStream');
const atbashCodeStream = require('./atbashCodeStream');

function getValue(flag) {
  const flagIndex = process.argv.indexOf(flag);
  return flagIndex !== -1 ? process.argv[flagIndex + 1] : null;
}

const config = getValue('-c') || getValue('--config');
const input = getValue('-i') || getValue('--input');
const output = getValue('-o') || getValue('--output');

function parseConfig(config) {
  const streams = [];
  const actions = config.split('-');
  for (let action of actions) {
    switch (action) {
      case 'C0':
        streams.push('(new caesarCipherDecodeStream())');
        break;
      case 'C1':
        streams.push('(new caesarCipherCodeStream())');
        break;
      case 'A':
      case 'A0':
      case 'A1':
        streams.push('(new atbashCodeStream())');
        break;
      case 'R0':
        streams.push('(new rot8DecodeStream())');
        break;
      case 'R1':
        streams.push('(new rot8CodeStream())');
        break;
      default:
        throw new Error('Неверный конфиг. Получено: ' + action);
    }
  }
  return streams.join('.pipe');
}

let task = input ? 'fs.createReadStream(input, "utf8")' : 'process.stdin';
task += '.pipe' + parseConfig(config) + '.pipe';
task += output ? '(fs.createWriteStream(output))' : '(process.stdout)';

eval(task);
