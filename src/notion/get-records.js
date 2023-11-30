const fs = require('fs');
const { Client, APIErrorCode } = require("@notionhq/client");
const { mapperRespone } = require('../utils/mapper-response');
const {
  NOTION_TOKEN,
  NOTION_DB_ID,
  DATA_PATH
} = require('../../config/env');

function getClient() {
  return new Client({
    auth: NOTION_TOKEN,
  });
}

async function getDatabase() {
  const notion = getClient()
  return await notion.databases.query({
    database_id: NOTION_DB_ID,
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
      await writeData(DATA_PATH, mappedResponse);
      return readData(DATA_PATH);
    }
    return mappedResponse;
  } catch (error) {
    if (error.code === APIErrorCode.ObjectNotFound) { }
    if (error.code === APIErrorCode.Unauthorized) {
      console.log('EL TOKEN DE AUTORIZACIÓN ES INVÁLIDO');
    } else {
      console.error(error)
    }
  }
}


module.exports = {
  getRecords
}