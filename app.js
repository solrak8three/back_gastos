require('dotenv').config()

const { getExpenseData } = require('./src/notion/get-expense');
const { test } = require('./tests/test');

async function app() {
    //test();
    const expenseData = await getExpenseData(true);
    console.log(expenseData);
}

app();