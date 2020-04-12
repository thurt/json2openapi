const json2yaml = require("./json2yaml");
const converter = require("./converter");

let input = "";
process.stdin
  .on("data", function (d) {
    input += d;
  })
  .on("end", function () {
    const output = json2yaml(converter(JSON.parse(input)));
    console.log(output);
  });
