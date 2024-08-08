const express = require('express')
const router = express.Router()
const { authValidation } = require('../middleware/auth')
const { getAllEvents, getEventById, createEvent, deleteEventById, updateEventById } = require('../controllers/events')

router
    .get('/', getAllEvents)
    .get('/:id',  getEventById)
    .post('/', authValidation, createEvent)
    .put('/:id', authValidation, updateEventById)
    .delete('/:id', authValidation, deleteEventById)

module.exports = router