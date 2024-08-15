const fetch = require("node-fetch");

// Replace with your actual API key
const API_KEY = "AIzaSyBAKsiNIb-hxch9K6QiqoYJoZjo_ztllDI";

// Function to get coordinates from an address
async function getCoordinates(address) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${API_KEY}`
    );
    const data = await response.json();

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      return location;
    } else {
      throw new Error("Geocoding API error: " + data.status);
    }
  } catch (error) {
    console.error(error);
  }
}

// Function to get an address from coordinates
async function getAddress(lat, lng) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
    );
    const data = await response.json();

    if (data.status === "OK") {
      const address = data.results[0].formatted_address;
      return address;
    } else {
      throw new Error("Geocoding API error: " + data.status);
    }
  } catch (error) {
    console.error(error);
  }
}

// Function to get place information using an address
async function getPlaceInfo(address) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${API_KEY}`
    );
    const data = await response.json();

    if (data.status === "OK") {
      const placeInfo = data.results[0];
      return placeInfo;
    } else {
      throw new Error("Geocoding API error: " + data.status);
    }
  } catch (error) {
    console.error(error);
  }
}

// Function to get places nearby a location (using Places API)
async function getNearbyPlaces(lat, lng, radius = 1500, type = "restaurant") {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${API_KEY}`
    );
    const data = await response.json();

    if (data.status === "OK") {
      const places = data.results;
      return places;
    } else {
      throw new Error("Places API error: " + data.status);
    }
  } catch (error) {
    console.error(error);
  }
}

// Export functions for use in other modules
module.exports = {
  getCoordinates,
  getAddress,
  getPlaceInfo,
  getNearbyPlaces,
};
