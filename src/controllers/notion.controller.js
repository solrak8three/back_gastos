const { getPriceAllUseCase, getPriceByRangeDateUseCase } = require("../use_cases/prices.usecases");
const { getAllUseCase, getByRangeDateUseCase } = require("../use_cases/records.usecases");


async function getRecords(req, res) {
  const notionRecords = await getAllUseCase();
  res.status(200).json(notionRecords);
}

async function getRecordsFilteredByDateRage(req, res) {
  const { startDate, endDate } = req.body;
  const notionRecords = await getByRangeDateUseCase(startDate, endDate);
  res.status(200).json(notionRecords);
}

async function getRecordsFilteredByDateRageCalculate(req, res) {
  const { startDate, endDate } = req.body;
  const notionRecords = await getPriceByRangeDateUseCase(startDate, endDate);
  res.status(200).json(notionRecords);
}

async function getRecordsCalculate(req, res) {
  const notionRecords = await getPriceAllUseCase();
  res.status(200).json(notionRecords);
}

module.exports = {
  getRecords,
  getRecordsFilteredByDateRage,
  getRecordsCalculate,
  getRecordsFilteredByDateRageCalculate
};