const mongoose = require('mongoose')
require('mongoose-type-url')

const HostSchema = new mongoose.Schema({
    hostName: {
        type:String,
        required:true,
        minLength: 4,
        maxLength: 50
    },
    hostURL: [{
        type: mongoose.Schema.Types.Url,
    }],   
    hostEmail: {
        type:String,
        maxLength: 50,
        unique:true,
        required:true,
    },
    hostDescription: {
        type:String,
        required:true,
        minLength: 25,
    },
    
},
{
    timestamps:true,
})

module.exports = mongoose.model('Host', HostSchema) 

