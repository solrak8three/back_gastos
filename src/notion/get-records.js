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

async function writeData(jsonData) {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(jsonData));
  } catch (error) {
    console.log(error);
  }
}

function readJson() {
  try {
    let data = fs.readFileSync(DATA_PATH);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function getRecords() {
  try {
    const response = await getDatabase();
    const mappedResponse = mapperRespone(response);
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

async function saveRecords() {
  try {
    const response = await getDatabase();
    const mappedResponse = mapperRespone(response);
    await writeData(mappedResponse);
    return true;
  } catch (error) {
    if (error.code === APIErrorCode.ObjectNotFound) { }
    if (error.code === APIErrorCode.Unauthorized) {
      console.log('EL TOKEN DE AUTORIZACIÓN ES INVÁLIDO');
    } else {
      console.error(error)
    }
    return false;
  }
}

module.exports = {
  getRecords,
  saveRecords,
  readJson,
}