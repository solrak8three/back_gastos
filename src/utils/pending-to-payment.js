const { sortingByDatesAsc, sortingByDatesDesc } = require("./dates")

function pendingToPayment(records) {
  const sortingRecords = records.sort(sortingByDatesDesc);
  const recordsPendingToPayment = [];
  for (const record of sortingRecords) {
    if (record.stateToPayment) break;
    recordsPendingToPayment.push(record);
  }
  return filterRemoveFixedPayment(recordsPendingToPayment);
}

function filterRemoveFixedPayment(records) {
  if (records.length > 0) {
    records = [...records.sort(sortingByDatesAsc)];
    return records.filter(record => !record.fixed);
  };
  return [];
}

module.exports = {
  pendingToPayment,
}