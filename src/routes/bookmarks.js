const express = require('express')
const router = express.Router()
const { authValidation } = require('../middleware/auth')
const { getAllBookmarks, getBookmarkById, createBookmark, deleteBookmarkById } = require('../controllers/bookmarks')

router
    .get('/', authValidation, getAllBookmarks)
    .get('/:id', authValidation,  getBookmarkById)
    .post('/', authValidation,  createBookmark)
    .delete('/:id', authValidation, deleteBookmarkById)

module.exports = router