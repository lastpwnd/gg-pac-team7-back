const express = require('express')
const router = express.Router()
const { searchEngine } = require('../controllers/search')

router.get('/', searchEngine)

module.exports = router