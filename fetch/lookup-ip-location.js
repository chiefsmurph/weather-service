const cacheThis = require('../util/cache-this');
const request = require('request-promise');
const { ipstack } = require('../config');

const lookupIpLocation = cacheThis(
  ip => request({ uri: `http://api.ipstack.com/${ip}?access_key=${ipstack}`, json: true }),
  Number.POSITIVE_INFINITY
);

module.exports = lookupIpLocation;