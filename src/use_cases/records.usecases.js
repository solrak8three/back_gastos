const { filterByRangeDates } = require("../utils/dates");
const { getRecords } = require("../notion/get-records");
const { filterByTags } = require("../utils/filter-by-tags");

async function recordsFilteredUseCase(startDate, endDate, tags) {
  let records = await getRecords();
  if (startDate && endDate) {
    records = [...filterByRangeDates(records, startDate, endDate)];
  }
  return [...filterByTags(records, tags)];
}

module.exports = {
  recordsFilteredUseCase,
}