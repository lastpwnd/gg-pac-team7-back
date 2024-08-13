const { StatusCodes } = require("http-status-codes");

const getAllBookmarks = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is stored in req.user
    const bookmarks = await Bookmark.find({ user: userId });
    res.status(StatusCodes.OK).json(bookmarks);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to fetch bookmarks" });
  }
};

const getBookmarkById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const bookmark = await Bookmark.findOne({ _id: id, user: userId });

    if (!bookmark) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Bookmark not found" });
    }

    res.status(StatusCodes.OK).json(bookmark);
  } catch (error) {
    console.error("Error fetching bookmark:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to fetch bookmark" });
  }
};

const createBookmark = async (req, res) => {
  try {
    const userId = req.user._id;
    const newBookmark = new Bookmark({ ...req.body, user: userId });
    const savedBookmark = await newBookmark.save();
    res.status(StatusCodes.CREATED).json(savedBookmark);
  } catch (error) {
    console.error("Error creating bookmark:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to create bookmark" });
  }
};

const deleteBookmarkById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const deletedBookmark = await Bookmark.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedBookmark) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Bookmark not found" });
    }

    res.status(StatusCodes.OK).json({ msg: "Bookmark deleted successfully" });
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to delete bookmark" });
  }
};

module.exports = {
  getAllBookmarks,
  getBookmarkById,
  createBookmark,
  deleteBookmarkById,
};
