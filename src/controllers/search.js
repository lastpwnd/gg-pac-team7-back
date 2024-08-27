const { StatusCodes } = require("http-status-codes")
const {
  getCoordinates,
  getAddress,
  getPlaceInfo,
  getNearbyPlaces,
} = require("../../utils/googleMaps")

async function searchEngine(req, res) {
  const { address, lat, lng, radius, type, details } = req.query

  try {
    if (address && !details) {
      const coordinates = await getCoordinates(address)
      res.json({ coordinates })
    } else if (lat && lng) {
      const addressFromCoords = await getAddress(lat, lng)
      res.json({ address: addressFromCoords })
    } else if (address && details) {
      const placeInfo = await getPlaceInfo(address)
      res.json({ placeInfo })
    } else if (lat && lng) {
      const places = await getNearbyPlaces(
        lat,
        lng,
        radius || 1500,
        type || "restaurant"
      )
      res.status(StatusCodes.OK).json({ places })
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid query parameters" })
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}

module.exports = { searchEngine }
