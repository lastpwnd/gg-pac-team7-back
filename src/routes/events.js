const express = require('express')
const router = express.Router()
const { authValidation } = require('../middleware/auth')
const { getAllEvents, getEvent, createEvent, deleteEvent, updateEvent } = require('../controllers/events')

router
    .get('/', getAllEvents)
    .get('/:id',  getEvent)
    .post('/', authValidation, createEvent)
    .put('/:id', authValidation, updateEvent)
    .delete('/:id', authValidation, deleteEvent)

module.exports = router