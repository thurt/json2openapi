const fs = require("fs");
const YAML = require("yamljs");
const inputsD = fs.readdirSync("./tests/inputs");
const outputsD = fs.readdirSync("./tests/outputs");
const path = require("path");

const inputs = inputsD.map((fn) => {
  const name = path.parse(fn).name;
  if (!outputsD.includes(name + ".yaml")) {
    throw new Error(
      "input file " +
        fn +
        " must have a corresponding output file " +
        name +
        ".yaml"
    );
  }
  return [name, JSON.parse(fs.readFileSync("./tests/inputs/" + fn).toString())];
});
const outputs = outputsD.map((fn) => {
  const name = path.parse(fn).name;
  if (!inputsD.includes(name + ".json")) {
    throw new Error(
      "output file " +
        fn +
        " must have a corresponding input file " +
        name +
        ".json"
    );
  }
  return [
    name,
    YAML.parse(fs.readFileSync("./tests/outputs/" + fn).toString()),
  ];
});

module.exports = inputs.map((input) => ({
  name: input[0],
  input: input[1],
  output: outputs.find((output) => output[0] === input[0])[1],
}));
