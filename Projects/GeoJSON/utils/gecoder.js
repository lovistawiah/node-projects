const NodeGeocoder = require('node-geocoder');

const options = {
    provider: process.env.GEOCODER_PROVIDER,

    // Optional depending on the providers
    httpAdapter: 'http',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;