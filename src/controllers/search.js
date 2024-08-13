// controllers/search.js
const { getCoordinates, getPlacesNearby } = require("../utils/googleMaps");
const { StatusCodes } = require("http-status-codes");

const searchEngine = async (req, res) => {
  const { address, radius = 500, type = "restaurant" } = req.query;

  try {
    // First, get the coordinates of the provided address
    const location = await getCoordinates(address);

    // Then, search for places nearby those coordinates
    const places = await getPlacesNearby(location, radius, type);

    res.status(StatusCodes.OK).json({ places });
  } catch (error) {
    console.error("Error searching for places:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to fetch nearby places" });
  }
};

module.exports = { searchEngine };
