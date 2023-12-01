const { fixedPaymentsTags } = require("../../config/constants");
const { isValidDate } = require("./dates");

function mapperRespone(data) {
  let result = [];
  for (let field of data.results) {
    if (!checkProperties(field.properties)) continue;
    result.push(sanitizeProperties(field.properties));
  }
  return result;
}

function sanitizeProperties(prop) {
  return {
    date: sanitizeDate(prop['Date']),
    info: sanitizeInfo(prop['Info']),
    price: sanitizePrice(prop['Price']),
    tag: sanitizeTag(prop['Tag']),
    stateToPayment: sanitizeStateToPayment(prop['StateToPayment']),
    fixed: sanitizeFixed(prop['Tag']),
  }
}

function sanitizeDate(propDate) {
  if (!!propDate?.date?.start && isValidDate(propDate?.date?.start)) {
    return new Date(propDate?.date?.start).toISOString();
  }
  return new Date().toISOString();
}

function sanitizeInfo(propInfo) {
  if (!!propInfo?.rich_text[0]?.plain_text) {
    const info = propInfo?.rich_text[0]?.plain_text;
    return info.charAt(0).toUpperCase() + info.slice(1).toLowerCase();
  }
  return 'Sin información';
}

function sanitizePrice(propPrice) {
  if (!!propPrice.number && !Number.isNaN(Number(propPrice.number))) {
    const price = propPrice.number;
    return parseFloat(price.toFixed(2));
  }
  return parseFloat(Number(0).toFixed(2));
}

function sanitizeTag(propTag) {
  return (!!propTag.select.name)
    ? propTag.select.name
    : 'otros';
}

function sanitizeStateToPayment(propStateToPayment) {
  return (!!propStateToPayment?.status?.name &&
    propStateToPayment?.status?.name === 'PAID');
}


function sanitizeFixed(tag) {
  if (!!tag?.select?.name) {
    const tagName = tag?.select?.name;
    return fixedPaymentsTags.includes(tagName);
  }
  return false;
}

function checkProperties(properties) {
  return propDate(properties) &&
    propInfo(properties) &&
    propPrice(properties) &&
    propTag(properties);
}

function propDate(properties) {
  return !!properties['Date'].date;
}

function propInfo(properties) {
  return !!properties['Info'].rich_text[0].plain_text;
}

function propPrice(properties) {
  return !!properties['Price'].number;
}

function propTag(properties) {
  return !!properties['Tag'].select.name;
}

module.exports = {
  mapperRespone,
}