const IP_ADDRESS = process.env.IP_ADDRESS || '172.20.0.23';
const PORT_MONGO = process.env.PORT_MONGO || '27017';
const COLLECTION = process.env.COLLECTION || 'notiondb';

module.exports = {
  conection_mongo: `mongodb://${IP_ADDRESS}:${PORT_MONGO}/${COLLECTION}`
};