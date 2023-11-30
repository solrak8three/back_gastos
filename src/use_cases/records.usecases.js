const {
  getRecords,
  saveRecords,
  readJson
} = require("../notion/get-records");
const { filterByTags } = require("../utils/filter-by-tags");
const { filterByDates } = require("../utils/dates");

async function recordsFilteredUseCase(startDate, endDate, tags, removeFixed, onlyFixed) {
  let records = await getRecords();
  records = [...filterByTags(records, tags, removeFixed, onlyFixed)];
  return filterByDates(records, startDate, endDate);
}

async function recordsFilteredFromJsonUseCase(startDate, endDate, tags, removeFixed, onlyFixed) {
  let records = await readJson();
  records = [...filterByTags(records, tags, removeFixed, onlyFixed)];
  return filterByDates(records, startDate, endDate);
}

async function saveRecordsToJsonUseCase() {
  return await saveRecords();
}

module.exports = {
  recordsFilteredUseCase,
  saveRecordsToJsonUseCase,
  recordsFilteredFromJsonUseCase
}