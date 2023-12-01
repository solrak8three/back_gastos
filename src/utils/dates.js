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

function sortingByDatesDesc(a, b) {
  return new Date(b.date) - new Date(a.date);
}

function sortingByDatesAsc(a, b) {
  return new Date(b.date) - new Date(a.date);
}

function dateTimeFormat(dateUtc) {
  const date = new Date(dateUtc);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months in JavaScript are zero-indexed
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

module.exports = {
  filterByDates,
  isValidDate,
  sortingByDatesDesc,
  sortingByDatesAsc,
  dateTimeFormat,
};