const { getRecords } = require("../notion/get-records");
const { filterByTags, filterByTagsOnlyFixed } = require("../utils/filter-by-tags");
const { filterByDates } = require("../utils/dates");

async function recordsFilteredUseCase(startDate, endDate, tags) {
  let records = await getRecords();
  records = [...filterByTags(records, tags)];
  return filterByDates(records, startDate, endDate);
}

async function recordsFilteredOnlyFixedUseCase(startDate, endDate, tags) {
  let records = await getRecords();
  records = [...filterByTagsOnlyFixed(records, tags)];
  return filterByDates(records, startDate, endDate);
}

module.exports = {
  recordsFilteredUseCase,
  recordsFilteredOnlyFixedUseCase,
}