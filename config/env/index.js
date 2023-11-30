require('dotenv').config()
const environment = process.env.NODE_ENV || 'dev';

const baseConfig = {
  port: 3000,
  NOTION_TOKEN: process.env.NOTION_TOKEN,
  version: '1.1.0',
};

let environmentConfig = {};

switch (environment) {
  case 'dev':
    environmentConfig = require('./dev');
    break;
  case 'prod':
    environmentConfig = require('./prod')
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