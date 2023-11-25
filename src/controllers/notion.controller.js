const { getPriceAllUseCase, getPriceByRangeDateUseCase } = require("../use_cases/prices.usecases");
const { getAllUseCase, getByRangeDateUseCase } = require("../use_cases/records.usecases");


async function getRecords() {
  return getAllUseCase();
}

async function getRecordsFilteredByDateRage(startDate, endDate) {
  return getByRangeDateUseCase(startDate, endDate);
}

async function getRecordsFilteredByDateRageCalculate(startDate, endDate) {
  return getPriceByRangeDateUseCase(startDate, endDate);
}

async function getRecordsCalculate() {
  return getPriceAllUseCase();
}

module.exports = {
  getRecords,
  getRecordsFilteredByDateRage,
  getRecordsCalculate,
  getRecordsFilteredByDateRageCalculate
};