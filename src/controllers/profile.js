const User = require('../models/User')
const Bookmarks = require('../models/Bookmark')
const { StatusCodes } = require('http-status-codes') 
const { avatarsList } = require('../../utils/avatarsList')

const getUserProfile = async (req, res) => { // Returns profile data of logged-in user
    try {
        const user = await User.findOne({ _id: req.user.userId}).select('firstName lastName userName avatarUrl')
        const bookmarks = await Bookmarks.find({user: req.user.userId}).select('event -_id').populate('event')
        res.status(StatusCodes.OK).json({...user._doc, bookmarks})        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([{ msg: "Failed to load your profile data" }])  
    }
}

const getOtherUserProfile = async (req, res) => { // Returns designated user's profile data, using path parameter
    try {
        const otherUser = await User.findOne({userName: req.params.username})
        const bookmarks = await Bookmarks.find({user: otherUser._id}).select('event -_id').populate('event')
        // if param refers to logged-in user, 302 status generated (treat as error)  
        if(!otherUser){
            return res.status(StatusCodes.BAD_REQUEST).json([{
                type: "params",
                value:`${req.body.userName}`,
                msg: 'Wrong credentials provided, has to be "@username"',
                path: "path", 
                location: 'req.params', 
            }])
        }
        else if (req.user.userId == otherUser._id) {
            return res.status(StatusCodes.MOVED_TEMPORARILY).json([{location: '/profile', msg: "Redirect required"}]) 
        }
        else
        {   
            const user = { firstName: otherUser.firstName, lastName: otherUser.lastName, userName:otherUser.userName, avatarUrl: otherUser.avatarUrl }             
            res.status(StatusCodes.OK).json({...user, bookmarks}) 
        }   
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([{ msg: "Failed to load user's data" }])
    }
}


const editUserProfile = async (req, res) => { // sends data for profiles editing form
    try {
        const user = await User.findOne({ _id: req.user.userId}).select('firstName lastName userName avatarUrl')
        res.status(StatusCodes.OK).json({...user._doc, avatarsList})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([{ msg: "Failed to load profile data" }])
    }
}

const updateUserProfile = async (req, res) => { // updates profile data in DB
    try {
        let user = await User.findOne({ _id: req.user.userId})    
        const passwordCheck = await user.checkPassword(req.body.password) // valid password must be provided
        if (passwordCheck){
            try {
                user = await User.updateOne({ _id: req.user.userId}, {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userName: req.body.userName,
                    avatarUrl: req.body.avatarUrl
                }).select('-password')     
                return res.status(StatusCodes.OK).json([{ msg: "Your profile was successfully updated!" }])
            } catch (error) {
                if (error.status == 500)
                {
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([{ msg: "Failed updating profile" }])
                }
                else if (error.code == 11000) {
                    return res.status(StatusCodes.CONFLICT).json([{         
                        type: "field",
                        value:`${req.body.userName}`, 
                        msg: "This username is already taken",
                        path: "userName",
                        location: "body"
                    }])
                }

            } 
        }   
        else {
            return res.status(StatusCodes.UNAUTHORIZED).json([{ 
                type: "field",
                value:`${req.body.password}`, // <- keep it?
                msg: "Incorrect password!",
                path: "password",
                location: "body" 
            }]) 
        }    
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([{ msg: "Failed updating profile" }])
    }
}

module.exports = {
    getUserProfile,
    getOtherUserProfile,
    updateUserProfile,
    editUserProfile
}