const fs = require('fs');
const { mapperRespone } = require('../src/notion/helpers/mapper-response');

const PATH = "data/test.json";

function readFile(path) {
  let data = fs.readFileSync(path);
  return JSON.parse(data);
}

function test() {
  const data = readFile(PATH);
  const result = mapperRespone(data);
  console.log(result);
}

module.exports = {
  test,
}