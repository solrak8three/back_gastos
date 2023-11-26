require('dotenv').config()
const environment = process.env.NODE_ENV || 'dev';

const baseConfig = {
  port: 3000,
  support: 'deb8three@gmail.com',
};

let environmentConfig = {};

switch (environment) {
  case 'dev':
    environmentConfig = require('./dev');
    break;
  default:
    environmentConfig = require('./dev');
}

console.log({
  environment,
  ...baseConfig,
  ...environmentConfig
});

module.exports = {
  environment,
  ...baseConfig,
  ...environmentConfig
};