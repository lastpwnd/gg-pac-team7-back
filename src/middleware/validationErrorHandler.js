const { validationResult } = require('express-validator')
const { StatusCodes } = require('http-status-codes') 

const validateErrorHandler = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json(errors.array())
    }
    next()
}

module.exports = { validateErrorHandler }