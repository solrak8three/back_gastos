function calculatePrices(records) {
  const result = records.reduce((total, record) => {
    return total + record.price;
  }, 0);
  return Number(result.toFixed(2));
}

module.exports = {
  calculatePrices,
}