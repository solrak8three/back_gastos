const { calculatePrices } = require("../utils/calculate");
const { getByRangeDateUseCase, getAllUseCase } = require("./records.usecases");

async function getPriceByRangeDateUseCase(startDate, endDate) {
  const records = await getByRangeDateUseCase(startDate, endDate);
  return calculatePrices(records);
}

async function getPriceAllUseCase() {
  const records = await getAllUseCase();
  return calculatePrices(records)
}

module.exports = {
  getPriceByRangeDateUseCase,
  getPriceAllUseCase
}