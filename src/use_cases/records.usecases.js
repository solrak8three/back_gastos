const { getRecords } = require("../notion/get-records");
const { filterByTags, filterByTagsOnlyFixed } = require("../utils/filter-by-tags");
const { filterByDates } = require("../utils/dates");

async function recordsFilteredUseCase(startDate, endDate, tags, removeFixed, onlyFixed) {
  let records = await getRecords();
  records = [...filterByTags(records, tags, removeFixed, onlyFixed)];
  return filterByDates(records, startDate, endDate);
}

module.exports = {
  recordsFilteredUseCase,
}