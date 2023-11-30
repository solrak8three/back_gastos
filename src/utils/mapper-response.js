const { fixedPaymentsTags } = require("../../config/constants");

function mapperRespone(data) {
  let result = [];
  for (let field of data.results) {
    if (!checkProperties(field.properties)) continue;
    result.push(getProperty(field.properties));
  }
  return result;
}

function getProperty(prop) {
  return {
    date: prop['Date'].date.start,
    text: prop['info'].rich_text[0].plain_text,
    price: prop['Price'].number,
    tag: prop['Tag'].select.name,
    fixed: isFixed(prop['Tag'].select.name),
  }
}

function isFixed(tag) {
  return fixedPaymentsTags.includes(tag);
}

function checkProperties(properties) {
  return propDdate(properties) &&
    propInfo(properties) &&
    propPrice(properties) &&
    propTag(properties);
}

function propDdate(properties) {
  return !!properties['Date'].date;
}

function propInfo(properties) {
  return !!properties['info'].rich_text[0].plain_text;
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