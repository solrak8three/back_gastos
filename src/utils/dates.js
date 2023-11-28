function filterByRangeDates(filteredRecords, startDate, endDate) {
  const _startDate = new Date(startDate)
  const _endDate = new Date(endDate)
  return filteredRecords.filter(record => {
    const recordDate = new Date(record.date);
    return recordDate >= _startDate && recordDate <= _endDate;
  })
}

function filterByStartDate(filteredRecords, startDate) {
  const _startDate = new Date(startDate)
  return filteredRecords.filter(record => {
    const recordDate = new Date(record.date);
    return recordDate >= _startDate;
  })
}

function filterByEndDate(filteredRecords, endDate) {
  const _endDate = new Date(endDate)
  return filteredRecords.filter(record => {
    const recordDate = new Date(record.date);
    return recordDate <= _endDate;
  })
}

function isValidDate(stringDate) {
  const date = new Date(stringDate);
  return !isNaN(date) && stringDate.trim() !== '';
}

function filterByDates(records, startDate, endDate) {
  if (isValidDate(startDate) && isValidDate(endDate)) {
    return [...filterByRangeDates(records, startDate, endDate)];
  }
  if (isValidDate(startDate) && !isValidDate(endDate)) {
    return [...filterByStartDate(records, startDate)];
  }
  if (!isValidDate(startDate) && isValidDate(endDate)) {
    return [...filterByEndDate(records, endDate)];
  }
  return records;
}

module.exports = {
  filterByDates,
};