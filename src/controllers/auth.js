const User = require('../models/User')
const { StatusCodes } = require('http-status-codes') 

const registerUser = async (req, res) => {
    try {
         await User.create({...req.body})
         return res.status(StatusCodes.CREATED).json({ msg: "New user was successfully registered" }) 
    } catch (error) {
        if (error.code == 11000) {
            const errorData = Object.entries(error.keyValue).flat()
            return res.status(StatusCodes.CONFLICT).json([{
                type: "field",
                value: `${errorData[1]}`,
                msg: `${errorData[0]} is already registered`,
                path: `${errorData[0]}`,
                location: "body"
              }]) 
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([{ msg: "Failed to register user"}])
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
            if (!user) {
                return res.status(StatusCodes.UNAUTHORIZED).json([{ 
                    type: "field",
                    value:`${req.body.email}`,
                    msg: "Wrong login",
                    path: "login",
                    location: "body" 
                }]) 
            }
        const comparePasswords = await user.checkPassword(password)
            if (!comparePasswords) {
                return res.status(StatusCodes.UNAUTHORIZED).json([{ 
                    type: "field",
                    value:`${req.body.password}`, // <- should keep or not?
                    msg: "Wrong password",
                    path: "password",
                    location: "body" 
                }]) 
            }
        const token = user.createJWT()
        const { userName, _id } = user._doc 
        const msg = "Successfully logged in"
        res.status(StatusCodes.OK).json({ msg, _id, userName, token })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([{ msg: "Failed to login" }])
    }
}

const checkUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)    
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json([{ 
                type: "key",
                value:`${req.user.userId}`,
                msg: "Wrong credentials",
                path: "userId",
                location: "user" 
            }])
        }
        const { _id, userName, email } = user._doc 
        res.status(StatusCodes.OK).json({ _id, msg: "Authorized", userName, email })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([{ msg: "Failed to authenticate" }])
    }
}

module.exports = {
    registerUser,
    loginUser,
    checkUser
}