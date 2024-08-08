const express = require('express')
const router = express.Router()
const { registerUser, loginUser, checkUser } = require('../controllers/auth')
const { registerValidation, loginValidation, authValidation } = require('../middleware/auth')
const { validateErrorHandler } = require('../middleware/validationErrorHandler')

router
.post('/register', registerValidation, validateErrorHandler, registerUser)
.post('/login', loginValidation, validateErrorHandler, loginUser)
.get('/me', authValidation, checkUser)

module.exports = router