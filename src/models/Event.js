const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    eventTitle: {
        type: String,
        unique:true,
        required:true,
        minLength: 10,
        maxLength: 100
    },
    eventStartDate: {
        type: Date,
        required:true,
    },
    eventEndDate: {
        type: Date,
        required:true,
    },
    eventLocation: {
        type: {
            type: String,
            required:true,
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            required:true,
            default: undefined,
        }
    },
    eventType: {
        type: String,
        enum: ['value1', 'value2', 'value3', 'value4', 'value5'],
        default: 'value1'
    },  
    eventDescription: {
        type: String,
        required:true,
        minLength: 25,
    },
    eventRestrictions: {
        type: String,
        default: 'none'
    },
    eventHost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Host',
        required:true,
    }

},
{
    timestamps:true,
})

module.exports = mongoose.model('Event', EventSchema) 