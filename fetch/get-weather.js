const request = require('request-promise');
const { openweather } = require('../config');
const cacheThis = require('../util/cache-this');

module.exports = cacheThis(
    (zip, city, state) => 
        request({ 
            uri: `https://api.openweathermap.org/data/2.5/weather?${zip ? `zip=${zip}` : `q=${city},${state}`}&units=imperial&appid=${openweather}`, 
            json: true 
        }),
    20
);