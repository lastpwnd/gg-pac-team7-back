const { StatusCodes } = require("http-status-codes")
const Bookmark = require("../models/Bookmark")

async function getAllBookmarks(req, res) {
  try {
    const userId = req.user.userId // Ensure user ID is set in req.user
    const bookmarks = await Bookmark.find({ user: userId }).populate("event") // Populate event details if needed
    res.status(StatusCodes.OK).json(bookmarks)
  } catch (error) {
    console.error("Error fetching bookmarks:", error.message)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to fetch bookmarks" })
  }
}

const getBookmark = async (req, res) => {
  try {

    const { id } = req.params
    const userId = req.user.userId
    const bookmark = await Bookmark.findOne({ _id: id, user: userId }).populate(
      "event"
    ) // Populate event details if needed

    if (!bookmark) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Bookmark not found" })
    }

    res.status(StatusCodes.OK).json(bookmark)
  } catch (error) {
    console.error("Error fetching bookmark:", error.message)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to fetch bookmark" })
  }
}

const createBookmark = async (req, res) => {
  try {
    const userId = req.user.userId
    console.log(userId)
    const newBookmark = new Bookmark({ ...req.body, user: userId })
    const savedBookmark = await newBookmark.save()
    res.status(StatusCodes.CREATED).json(savedBookmark)
  } catch (error) {
    console.error("Error creating bookmark:", error.message)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to create bookmark" })
  }
}

const deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.userId
    const deletedBookmark = await Bookmark.findOneAndDelete({
      _id: id,
      user: userId,
    })

    if (!deletedBookmark) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Bookmark not found" })
    }

    res.status(StatusCodes.OK).json({ msg: "Bookmark deleted successfully" })
  } catch (error) {
    console.error("Error deleting bookmark:", error.message)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to delete bookmark" })
  }
}

module.exports = {
  getAllBookmarks,
  getBookmark,
  createBookmark,
  deleteBookmark,
}

