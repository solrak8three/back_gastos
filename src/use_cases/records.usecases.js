const { filterByRangeDates } = require("../utils/dates");
const { getRecords } = require("../notion/get-records");

async function recordsFilteredUseCase(startDate, endDate, tags) {
  const records = await getRecords();
  if (!startDate || !endDate) return records;
  return filterByRangeDates(records, startDate, endDate);
}

module.exports = {
  recordsFilteredUseCase,
}