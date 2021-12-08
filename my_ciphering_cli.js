"use strict";
require("./colorText");
const fs = require("fs");
const { pipeline } = require("stream");
const { promisify } = require("util");
const process = require("process");
const parseConfig = require("./parseConfig");
const getValue = require("./parseArgsCLI");
const addMessageStream = require("./addMessageStream");
const pipelineAsync = promisify(pipeline);

const config = getValue("-c") || getValue("--config");
const input = getValue("-i") || getValue("--input");
const output = getValue("-o") || getValue("--output");

const inStreams = input ? [fs.createReadStream(input, "utf8")] : [process.stdin];
const transStreams = parseConfig(config);
const outStreams = output ? [fs.createWriteStream(output)] : [process.stdout];

process.on("SIGINT", () => {
  process.stdout.write("\n\nВыход...".color("red"));
  process.exit(0);
});

(async function run() {
  try {
    if (!input) {
      //input: console,
      process.stdout.write("Для выхода нажмите 'Ctrl + C'\n".color("cyan"));
      process.stdout.write("\nВведите строку: ".color("blue"));

      if (output) {
        //output: file
        process.stdin.on("data", () => {
          process.stdout.write(
            `Результат записан в файл ${output}\n`.color("green") +
              "Введите следующую строку: ".color("blue")
          );
        });
      } else {
        //output: console
        outStreams.unshift(
          new addMessageStream("     Результат: ".color("blue"), "\nВведите строку: ".color("blue"))
        );
      }
    }

    if (input && !output) {
      //input: file, output: console
      process.stdout.write("Результат: ".color("blue"));
    }

    await pipelineAsync(...inStreams, ...transStreams, ...outStreams);

    process.stdout.write("Преобразование выполнено успешно".color("green"));
  } catch (err) {
    console.error("pipeline failed with error:", err);
  }
})();
