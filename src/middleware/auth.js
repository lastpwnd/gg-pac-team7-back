const jwt = require('jsonwebtoken')
const { body } = require('express-validator')
const { StatusCodes } = require('http-status-codes') 

const registerValidation = [
    body('email', "Wrong address, valid example: yourname@mailservice.com").trim().notEmpty().isEmail().isLength({ max: 50 }),
    body('password', "Minimum length is 4, maximum - 30").isLength({min: 4, max: 30}),
    body('firstName', "Minimum length is 3, maximum - 20").trim().isLength({min: 3, max: 20}),
    body('lastName', "Minimum length is 3, maximum - 20").trim().isLength({min: 3, max: 20}),
    body('userName', "Minimum length is 3, maximum - 20").trim().isLength({min: 3, max: 20}).optional({nullable: true, checkFalsy: true}),
    body('avatarUrl', "Valid URL is required").trim().isURL().optional({nullable: true})
]

const loginValidation = [
    body('email', "Wrong address, valid example: yourname@mailservice.com").trim().notEmpty().isEmail(),
    body('password', "Minimum length is 4, maximum is 30").isLength({min: 4, max: 30})
]

const authValidation = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer"))
        {
            return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Authentication Error" })
        }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId }
        next()
   } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Authentication Error" })
   }
}

module.exports = {
    registerValidation,
    loginValidation,
    authValidation
}