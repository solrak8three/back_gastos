function filterByRangeDates(filteredRecords, startDate, endDate) {
  const _startDate = new Date(startDate)
  const _endDate = new Date(endDate)
  return filteredRecords.filter(record => {
    const recordDate = new Date(record.date);
    return recordDate >= _startDate && recordDate <= _endDate;
  })
}

module.exports = {
  filterByRangeDates
};