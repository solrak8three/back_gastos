function filterByTags(records, tags, removeFixed, onlyFixed) {
  if (onlyFixed) {
    return records.filter(record => record.fixed);
  }

  if (removeFixed) {
    return records.filter(record => !record.fixed);
  }

  if (tags.length === 0) return records;

  return records.filter(record => tags.includes(record.tag));
}

module.exports = {
  filterByTags,
}