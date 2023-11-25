const { filtereByRangeDates } = require("../utils/dates");
const { getExpenseData } = require("../notion/get-expense");
const { calculatePrices } = require("../utils/calculate");

async function getPriceByRangeDateUseCase(startDate, endDate) {
  const records = await getExpenseData();
  console.log('Todos', records);
  const recordsFiltered = filtereByRangeDates(records, startDate, endDate);
  console.log('Filtrados', recordsFiltered);
  const priceCalculate = calculatePrices(recordsFiltered)
  return priceCalculate;
}

module.exports = {
  getPriceByRangeDateUseCase
}