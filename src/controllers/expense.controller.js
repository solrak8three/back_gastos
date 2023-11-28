const { recordsFilteredUseCase, recordsFilteredOnlyFixedUseCase } = require("../use_cases/records.usecases");
const { calculatePrices } = require("../utils/calculate");

/**
 * Test para comprobar funcionalidad desde la web
 * @returns {void}
 */
async function test(req, res) {
  res.status(200).json({ msg: 'ok' });
}

/**
 * Maneja la solicitud para obtener registros.
 * @param {string} startDate - Fecha de inicio para filtrar registros.
 * @param {string} endDate - Fecha de fin para filtrar registros.
 * @param {Array<string>} tags - Lista de etiquetas para filtrar registros.
 * @returns {void}
 */
async function getRecords(req, res) {
  const { startDate, endDate, tags } = req.body;
  const notionRecords = await recordsFilteredUseCase(startDate, endDate, tags);
  const price = calculatePrices(notionRecords);
  const response = {
    records: notionRecords,
    total: price,
  }
  res.status(200).json(response);
}

/**
 * Maneja la solicitud para obtener registros sin contar gastos fijos.
 * @param {string} startDate - Fecha de inicio para filtrar registros.
 * @param {string} endDate - Fecha de fin para filtrar registros.
 * @returns {void}
 */
async function getRecordsWithoutFixes(req, res) {
  const { startDate, endDate } = req.body;
  const tagsFixes = ['gimnasio'];
  const notionRecords = await recordsFilteredOnlyFixedUseCase(startDate, endDate, tagsFixes);
  const price = calculatePrices(notionRecords);
  const response = {
    records: notionRecords,
    total: price,
  }
  res.status(200).json(response);
}

module.exports = {
  getRecords,
  getRecordsWithoutFixes,
  test,
  test2,
};