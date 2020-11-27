const getWeather = require('./fetch/get-weather');
const lookupIpLocation = require('./fetch/lookup-ip-location');

const getTimeFormatted = offset => {
    const date = new Date();
    const localTime = date.getTime();
    const localOffset = date.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const offsetTime = utc + (offset * 1000);
    const convertedDateTime = new Date(offsetTime); 
    return convertedDateTime.toLocaleString();
};

module.exports = async ip => {
    let location, weather, time, error;
    try {
        console.log(`getting data for ${ip}`);
        const locationResponse = await lookupIpLocation(ip);
        console.log({ locationResponse });
        const { city, region_name, country_code, zip } = locationResponse;
        if (country_code !== 'US') throw new Error('only supports USA people');
        location = `${city}, ${region_name}`;
        const weatherResponse = await getWeather(zip, city, region_name);
        console.log({ weatherResponse });
        const { weather: [{ main }], main: { temp }, timezone } = weatherResponse;
        weather = `${main} and ${temp} degrees fareinheit`;
        console.log(`${ip} 's weather in ${temp} is ${weather}`);
        time = getTimeFormatted(timezone);
    } catch (e) {
        error = e.toString();
     } finally {
        return {
            ip,
            location,
            weather,
            time,
            ...error && { error }
        };
    }
};