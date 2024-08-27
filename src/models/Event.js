const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        minLength: 10,
        maxLength: 100,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date
    },
    address: {
        type: String,
        default: '',
    },
    coordinates: {
        type: [Number],
        required: true,
        default: undefined,
    },
    category: {
        type: String,
        enum: ['food', 'animal', 'environment', 'health', 'social'],
        default:'social',
        required: true
    },  
    description: {
        type: String,
        required: true
    },
    restrictions: {
        type: String,
        default: 'none'
    },
    hostName: {
        type: String,
        required: true
    },
    eventUrl: {
        type: String,
        required: true
    },
    eventImages: {
        type: [String]
    }

},
{
    timestamps: true,  
})

module.exports = mongoose.model('Event', EventSchema) 