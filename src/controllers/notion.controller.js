const { recordsFilteredUseCase } = require("../use_cases/records.usecases");
const { calculatePrices } = require("../utils/calculate");


async function getRecords(req, res) {
  const { startDate, endDate, tags } = req.body;
  const notionRecords = await recordsFilteredUseCase(startDate, endDate, tags);
  const price = calculatePrices(notionRecords);
  const response = {
    records: notionRecords,
    total: price,
  }
  res.status(200).json(response);
}


module.exports = {
  getRecords,
};