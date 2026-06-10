const { OAuth2Client } = require('google-auth-library');
const config = require('./config');

const utils = {};

utils.getLocationFromAddress = async (address) => {
  const params = new URLSearchParams({
    address,
    key: process.env.GOOGLE_API_KEY,
  });
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`,
  );
  const { results, status } = await response.json();
  if (status === 'OK'
    && results.length > 0
    && results[0].geometry
  ) {
    return {
      latitude: results[0].geometry.location.lat,
      longitude: results[0].geometry.location.lng,
    };
  }
  throw new Error('Invalid address');
};

utils.verifyGoogleToken = async (idToken) => {
  const client = new OAuth2Client(config.googleClientId);
  const ticket = await client.verifyIdToken({
    idToken,
    audience: config.googleClientId,
  });
  return ticket.getPayload();
};

utils.verifyFacebookToken = async (accessToken) => {
  const params = new URLSearchParams({
    fields: 'id,email',
    access_token: accessToken,
  });
  const response = await fetch(
    `https://graph.facebook.com/me?${params.toString()}`,
  );
  return response.json();
};

module.exports = utils;
