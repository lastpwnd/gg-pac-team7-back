const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        unique:true,
        required:true,
        index:true,
        sparse:true,
        minLength: 10,
        maxLength: 100,
    },
    startDate: {
        type: Date,
        required:true,
    },
    endDate: {
        type: Date,
        required:true,
    },
    address: {
        type: String,
        default: '',
    },
    coordinates: {
        type: [Number],
        required:true,
        default: undefined,
    },
    type: {
        type: String,
        enum: ['food', 'animal', 'environment', 'health', 'social'],
        default: 'social'
    },  
    description: {
        type: String,
        required:true
    },
    restrictions: {
        type: String,
        default: 'none'
    },
    hostName: {
        type: String,
        required:true
    },
    hostUrl: {
        type: String,
        required:true
    }

},
{
    timestamps:true,  
})

module.exports = mongoose.model('Event', EventSchema) 