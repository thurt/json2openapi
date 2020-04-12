const tape = require("tape");
const tests = require("./testsImporter");
const c = require("./converter");

tape("tests", (t) => {
  t.plan(tests.length);
  tests.forEach((test) => {
    t.deepEqual(c(test.input), test.output, test.name);
  });
});
