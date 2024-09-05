const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    userName: {
        type:String,
        unique:true
    },
    email: {
        type:String,
        unique:true,
        required:true,
    },
    password: {  
        type:String,
        required:true
    },
    avatarUrl:{
        type:String,
        default:"/avatars/default.png"
    }
},
{
    timestamps:true,
})

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({userId:this._id, name: this.name}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
}

UserSchema.methods.checkPassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema) 

