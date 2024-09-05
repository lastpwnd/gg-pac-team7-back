const { body } = require('express-validator')

const profileValidationRules = [
    body('firstName', "Minimum length is 3, maximum - 20").trim().isLength({min: 3, max: 20}).optional({nullable: true}),
    body('lastName', "Minimum length is 3, maximum - 20").trim().isLength({min: 3, max: 20}).optional({nullable: true}),
    body('userName', "Minimum length is 3, maximum - 20").trim().isLength({min: 3, max: 20}).optional({nullable: true, checkFalsy: true}),
    body('avatarUrl', "Valid URL is required").trim().optional({nullable: true, checkFalsy: true})
]

module.exports = {
    profileValidationRules
}