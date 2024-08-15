// googleMaps.js
const { Client } = require("@googlemaps/google-maps-services-js");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({});

const getCoordinates = async (address) => {
  try {
    const response = await client.geocode({
      params: {
        address: address,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
      timeout: 1000, // milliseconds
    });
    return response.data.results[0].geometry.location;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
};

const getPlacesNearby = async (location, radius, type) => {
  try {
    const response = await client.placesNearby({
      params: {
        location: location,
        radius: radius,
        type: type,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
      timeout: 1000,
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
};

module.exports = {
  getCoordinates,
  getPlacesNearby,
};
