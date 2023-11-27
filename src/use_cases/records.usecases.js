const { filterByRangeDates } = require("../utils/dates");
const { getRecords } = require("../notion/get-records");
const { filterByTags, filterByTagsOnlyFixed } = require("../utils/filter-by-tags");

async function recordsFilteredUseCase(startDate, endDate, tags) {
  let records = await getRecords();
  if (startDate && endDate) {
    records = [...filterByRangeDates(records, startDate, endDate)];
  }
  return [...filterByTags(records, tags)];
}

async function recordsFilteredOnlyFixedUseCase(startDate, endDate, tags) {
  let records = await getRecords();
  if (startDate && endDate) {
    records = [...filterByRangeDates(records, startDate, endDate)];
  }
  return [...filterByTagsOnlyFixed(records, tags)];
}

module.exports = {
  recordsFilteredUseCase,
  recordsFilteredOnlyFixedUseCase,
}