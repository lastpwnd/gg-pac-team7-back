const User = require('../models/User')
const { StatusCodes } = require('http-status-codes') 

const registerUser = async (req, res) => {
    try {
         const user = await User.create({...req.body})
         return res.status(StatusCodes.OK).json({ msg:`New user was successfully registered`}) 
    } catch (error) {
        let errorMsg = "Failed to register user"
        if (error.code == 11000) {
             errorMsg = "This e-mail or nickname is already registered"
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: errorMsg})
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
            if (!user) {
                return res.status(StatusCodes.NOT_FOUND).json({ msg: "Wrong login or password" }) 
            }

        const comparePasswords = await user.checkPassword(password)
            if (!comparePasswords) {
                return res.status(StatusCodes.NOT_FOUND).json({ msg: "Wrong login or password" })
            }

        const token = user.createJWT()
        const { firstName, lastName, _id } = user._doc 
     
        res.status(StatusCodes.OK).json({ _id, firstName, lastName, token })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to authorize" })
    }
}

const checkUser = async (req, res) => {
    try {
         const user = await User.findById(req.user.userId)
      
         if (!user) {
              return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
         }

         const { _id, email } = user._doc 
         return res.json({ _id, email })

    } catch (error) {
         
    }
}

module.exports = {
    registerUser,
    loginUser,
    checkUser
}