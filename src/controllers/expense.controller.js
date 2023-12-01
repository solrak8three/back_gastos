const { version } = require("../../config/env");
const {
  recordsFilteredUseCase,
  saveRecordsToJsonUseCase,
  recordsFilteredFromJsonUseCase,
  pendingPaymentUseCase
} = require("../use_cases/records.usecases");
const { calculatePrices } = require("../utils/calculate");

/**
 * Test para comprobar funcionalidad desde la web
 * @returns {void}
 */
async function test(req, res) {
  res.status(200).json({ version });
}

/**
 * Guarda los datos de la base de datos de notion en un json.
 * @returns {void}
 */
async function saveToJson(req, res) {
  const saved = await saveRecordsToJsonUseCase();
  res.status(200).json({ saved });
}

/**
 * Maneja la solicitud para obtener registros de notion.
 * @param {string} startDate - Fecha de inicio para filtrar registros.
 * @param {string} endDate - Fecha de fin para filtrar registros.
 * @param {Array<string>} tags - Lista de etiquetas para filtrar registros.
 * @param {boolean} removeFixed - Indica si se deben eliminar registros fijos.
 * @param {boolean} onlyFixed - Indica si solo se deben incluir registros fijos.
 * @returns {void}
 */
async function getRecordsFromNotion(req, res) {
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
    origin: 'notion',
    records: notionRecords,
    total: price,
  }
  res.status(200).json(response);
}

/**
 * Maneja la solicitud para obtener registros de un json.
 * @param {string} startDate - Fecha de inicio para filtrar registros.
 * @param {string} endDate - Fecha de fin para filtrar registros.
 * @param {Array<string>} tags - Lista de etiquetas para filtrar registros.
 * @param {boolean} removeFixed - Indica si se deben eliminar registros fijos.
 * @param {boolean} onlyFixed - Indica si solo se deben incluir registros fijos.
 * @returns {void}
 */
async function getRecordsFromJson(req, res) {
  const {
    startDate,
    endDate,
    tags,
    removeFixed,
    onlyFixed
  } = req.validatedFields;

  const notionRecords = await recordsFilteredFromJsonUseCase(startDate, endDate, tags, removeFixed, onlyFixed);
  const price = calculatePrices(notionRecords);
  const response = {
    origin: 'json',
    records: notionRecords,
    total: price,
  }
  res.status(200).json(response);
}

/**
 * Devuelve los registros que están pendientes de pago. Hay que hacer trasvase de dinero entre cuentas.
 * @returns {void}
 */
async function pendingToPayment(req, res) {
  await saveRecordsToJsonUseCase();
  const notionRecords = await pendingPaymentUseCase();
  const price = calculatePrices(notionRecords);
  const response = {
    records: notionRecords,
    total: price,
  }
  res.status(200).json(response);
}

module.exports = {
  getRecordsFromNotion,
  getRecordsFromJson,
  saveToJson,
  pendingToPayment,
  test,
};