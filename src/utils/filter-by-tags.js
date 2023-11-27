const { isArray } = require("underscore")

function filterByTags(records, tags) {
  if (!tags || !isArray(tags)) return records;
  return records.filter(record => tags.includes(record.tag))
}

module.exports = {
  filterByTags,
}