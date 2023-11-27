const { filterByRangeDates } = require("../utils/dates");
const { getRecords } = require("../notion/get-records");
const { filterByTags } = require("../utils/filter-by-tags");

async function recordsFilteredUseCase(startDate, endDate, tags) {
  const records = await getRecords();
  const recordsFiltered = filterByTags(records, tags);
  return recordsFiltered;
}
/*
if (!startDate || !endDate) return filteredRecords;
return filterByRangeDates(filteredRecords, startDate, endDate);
*/
module.exports = {
  recordsFilteredUseCase,
}