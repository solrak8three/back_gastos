const fs = require('fs');
const { Client, APIErrorCode } = require("@notionhq/client");
const { mapperRespone } = require('./helpers/mapper-response');

const PATH_TEST = "data/test.json";

const PATH = "data/data.json";

function getClient() {
  return new Client({
    auth: process.env.NOTION_TOKEN,
  });
}

async function getDatabase() {
  const notion = getClient()
  return await notion.databases.query({
    database_id: process.env.DATABASE_ID,
  })
}

async function writeData(path) {
  try {
    const db = await getDatabase();
    fs.writeFileSync(path, JSON.stringify(db));
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

async function getExpenseData() {
  try {
    await writeData(PATH);
    const data = readData(PATH);
    return mapperRespone(data);
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