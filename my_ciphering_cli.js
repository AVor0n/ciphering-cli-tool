'use strict';
const fs = require("fs");
const { pipeline } = require("stream");
const { promisify } = require("util");
const process = require("process");
const parseConfig = require("./parseConfig")
const getValue = require("./parseArgsCLI")
const pipelineAsync = promisify(pipeline);

const config = getValue("-c") || getValue("--config");
const input = getValue("-i") || getValue("--input");
const output = getValue("-o") || getValue("--output");

const inStream = input ? fs.createReadStream(input, "utf8") : process.stdin;
const transStream = parseConfig(config);
const outStream = output ? fs.createWriteStream(output) : process.stdout;

(async function run() {
  try {
    await pipelineAsync(inStream, ...transStream, outStream);
  } catch (err) {
    console.error("pipeline failed with error:", err);
  }
})();
