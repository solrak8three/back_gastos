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
  const formatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Europe/Madrid', // Zona horaria de España
  };
  const customFormat = new Intl.DateTimeFormat('es-ES', formatOptions);
  return customFormat.format(date);
}

module.exports = {
  filterByDates,
  isValidDate,
  sortingByDatesDesc,
  sortingByDatesAsc,
  dateTimeFormat,
};