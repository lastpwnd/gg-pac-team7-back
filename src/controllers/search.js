const {
  getCoordinates,
  getAddress,
  getPlaceInfo,
  getNearbyPlaces,
} = require("../../utils/googleMaps");

async function searchEngine(req, res) {
  const { address, lat, lng, radius, type } = req.query;

  try {
    if (address) {
      const coordinates = await getCoordinates(address);
      res.json({ coordinates });
    } else if (lat && lng) {
      const addressFromCoords = await getAddress(lat, lng);
      res.json({ address: addressFromCoords });
    } else if (address) {
      const placeInfo = await getPlaceInfo(address);
      res.json({ placeInfo });
    } else if (lat && lng) {
      const places = await getNearbyPlaces(
        lat,
        lng,
        radius || 1500,
        type || "restaurant"
      );
      res.json({ places });
    } else {
      res.status(400).json({ error: "Invalid query parameters" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { searchEngine };
