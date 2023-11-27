const fs = require('fs');
const { Client, APIErrorCode } = require("@notionhq/client");
const { mapperRespone } = require('../utils/mapper-response');
const { environment } = require('../../config');

const PATH_TEST = "data/test.json";
const PATH = "data/data.json";

function getClient() {
  return new Client({
    auth: environment.notionToken,
  });
}

async function getDatabase() {
  console.log(environment);
  const notion = getClient()
  return await notion.databases.query({
    database_id: environment.notionDId,
  })
}

async function writeData(path, jsonData) {
  try {
    fs.writeFileSync(path, JSON.stringify(jsonData));
  } catch (error) {
    console.log(error);
  }
}

function readData(path) {
  try {
    let data = fs.readFileSync(path);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function getRecords(save = false) {
  try {
    const response = await getDatabase();
    const mappedResponse = mapperRespone(response);
    if (save) {
      await writeData(PATH, mappedResponse);
      return readData(PATH);
    }
    return mappedResponse;
  } catch (error) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      //
      // For example: handle by asking the user to select a different database
      //
    } else {
      console.error(error)
    }
  }
}


module.exports = {
  getRecords
}