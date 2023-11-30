const { version } = require("../../config/env");
const { recordsFilteredUseCase } = require("../use_cases/records.usecases");
const { calculatePrices } = require("../utils/calculate");

/**
 * Test para comprobar funcionalidad desde la web
 * @returns {void}
 */
async function test(req, res) {
  res.status(200).json({ version });
}

/**
 * Maneja la solicitud para obtener registros.
 * @param {string} startDate - Fecha de inicio para filtrar registros.
 * @param {string} endDate - Fecha de fin para filtrar registros.
 * @param {Array<string>} tags - Lista de etiquetas para filtrar registros.
 * @param {boolean} removeFixed - Indica si se deben eliminar registros fijos.
 * @param {boolean} onlyFixed - Indica si solo se deben incluir registros fijos.
 * @returns {void}
 */
async function getRecords(req, res) {
  const {
    startDate,
    endDate,
    tags,
    removeFixed,
    onlyFixed
  } = req.validatedFields;

  const notionRecords = await recordsFilteredUseCase(startDate, endDate, tags, removeFixed, onlyFixed);
  const price = calculatePrices(notionRecords);
  const response = {
    records: notionRecords,
    total: price,
  }
  res.status(200).json(response);
}

module.exports = {
  getRecords,
  test,
};