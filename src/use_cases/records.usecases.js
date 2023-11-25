const { filtereByRangeDates } = require("../utils/dates");
const { getExpenseData } = require("../notion/get-expense");

async function getByRangeDateUseCase(startDate, endDate) {
  const records = await getExpenseData();
  return filtereByRangeDates(records, startDate, endDate);
}

async function getAllUseCase() {
  return await getExpenseData();
}

module.exports = {
  getByRangeDateUseCase,
  getAllUseCase
}