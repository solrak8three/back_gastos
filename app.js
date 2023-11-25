require('dotenv').config()

const { getPriceByRangeDateUseCase } = require('./src/use_cases/getPriceByRangeDates');
const { test } = require('./tests/test');

async function app() {
    const startDate = new Date('2023-11-25');
    const endDate = new Date('2023-11-30');
    const pricesByRageDates = await getPriceByRangeDateUseCase(startDate, endDate);
    console.log(pricesByRageDates);
}


app();