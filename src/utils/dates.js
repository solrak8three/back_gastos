function filtereByRangeDates(records, startDate, endDate) {
  return records.filter(record => {
    const recordDate = new Date(record.date);
    return recordDate >= startDate && recordDate <= endDate;
  })
}

module.exports = {
  filtereByRangeDates
};