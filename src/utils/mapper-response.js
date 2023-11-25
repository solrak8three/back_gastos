function mapperRespone(data) {
  let result = [];
  for (let propertie of data.results) {
    result.push(getPropertie(propertie.properties));
  }
  return result;
}

function getPropertie(prop) {
  return {
    date: prop['Date'].date.start,
    text: prop['info'].rich_text[0].plain_text,
    price: prop['Price'].number,
    tag: prop['Tag'].select.name,
  }
}

module.exports = {
  mapperRespone,
}