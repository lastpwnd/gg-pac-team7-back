const User = require('../models/User')
const Bookmarks = require('../models/Bookmark')
const { StatusCodes } = require('http-status-codes') 

const getUserProfile = async (req, res) => { // Returns profile data of logged-in user
    try {
        const user = await User.findOne({ _id: req.user.userId}).select('firstName lastName avatarUrl -_id')
        const bookmarks = await Bookmarks.find({user: req.user.userId}).select('event -_id').populate('event')
        const loggedInMsg = { msg: "This is account you logged in right now!" }
        res.status(StatusCodes.OK).json({...user._doc, ...loggedInMsg, bookmarks})        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to load your profile data" })  
    }
}

const getOtherUserProfile = async (req, res) => { // Returns designated user's profile data, using path parameter
    try {
        const otherUser = await User.findOne({lastName: req.params.nickname})
        const bookmarks = await Bookmarks.find({user: otherUser._id}).select('event -_id').populate('event')
        // if param refers to logged-in user, redirects and calls getUserProfile controller
        if (req.user.userId == otherUser._id) {
            return res.status(StatusCodes.MOVED_TEMPORARILY).redirect('/api/v1/profile') 
        }
        else
        {   
            const user = { firstName: otherUser.firstName, lastName: otherUser.lastName, avatarUrl: otherUser.avatarUrl }             
            res.status(StatusCodes.OK).json({...user, bookmarks}) 
        }   
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to load user's data" })
    }
}


const editUserProfile = async (req, res) => { // sends data for profiles editing form
    try {
        const user = await User.findOne({ _id: req.user.userId}).select('-password')
        res.status(StatusCodes.OK).json(user)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to load data" })
    }
}

const updateUserProfile = async (req, res) => { // updates profile data in DB
    try {
        const user = await User.findOneAndUpdate({ _id: req.user.userId}, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            avatarUrl: req.body.avatarUrl
        }).select('-password')

        res.status(StatusCodes.OK).json({ msg: "Profile is successfully updated!" })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed updating profile" })
    }
}

module.exports = {
    getUserProfile,
    getOtherUserProfile,
    updateUserProfile,
    editUserProfile
}