const express = require('express')
const router = express.Router()
const { authValidation } = require('../middleware/auth')
const { profileValidationRules } = require('../middleware/profile')
const { validateErrorHandler } = require('../middleware/validationErrorHandler')
const { getUserProfile, getOtherUserProfile, editUserProfile, updateUserProfile } = require('../controllers/profile')

router
    .get('/', authValidation, getUserProfile)
    .get('/@:username', authValidation, getOtherUserProfile)
    .get('/edit/', authValidation, editUserProfile)
    .put('/edit/', authValidation, profileValidationRules, validateErrorHandler, updateUserProfile)
module.exports = router