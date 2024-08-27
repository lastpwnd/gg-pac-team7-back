const express = require('express')
const router = express.Router()
const { authValidation } = require('../middleware/auth')
const { getAllBookmarks, getBookmark, createBookmark, deleteBookmark } = require('../controllers/bookmarks')

router
    .get('/', authValidation, getAllBookmarks)
    .get('/:id', authValidation,  getBookmark)
    .post('/', authValidation,  createBookmark)
    .delete('/:id', authValidation, deleteBookmark)

module.exports = router