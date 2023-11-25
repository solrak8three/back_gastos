const fs = require('fs');
const { Client, APIErrorCode } = require("@notionhq/client");
const { mapperRespone } = require('../utils/mapper-response');

const PATH_TEST = "data/test.json";
const PATH = "data/data.json";

function getClient() {
  return new Client({
    auth: process.env.NOTION_TOKEN,
  });
}

async function getExpensiveData() {
  const notion = getClient()
  return await notion.databases.query({
    database_id: process.env.TEST_GASTOS_DIARIOS_DB,//Para desarrollar lo pongo en TEST
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

async function getExpenseData(record = false) {
  try {
    const expensiveData = await getExpensiveData();
    const response = expensiveData;
    const mappedData = mapperRespone(response);
    if (record) {
      await writeData(PATH, mappedData);
      return readData(PATH);
    }
    return mappedData;
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
  getExpenseData
}