function filtereByRangeDates(records, startDate, endDate) {
  const _startDate = new Date(startDate)
  const _endDate = new Date(endDate)
  return records.filter(record => {
    const recordDate = new Date(record.date);
    return recordDate >= _startDate && recordDate <= _endDate;
  })
}

module.exports = {
  filtereByRangeDates
};