const Event = require('../models/Event')
const { StatusCodes } = require('http-status-codes') 

const getAllEvents = async (req, res) => {
    let sortMethod = {}
        if(req.query.date){
            sortMethod = { 'startDate':Number(req.query.date) }
        }
        else if (req.query.title){
            sortMethod = { 'title':Number(req.query.title) }
        }
    let method = {}
        if(req.query.category){
            method = {'category':String(req.query.category) }
        } 
        try {    
            const events = await Event.find(method).sort(sortMethod)
            res.status(StatusCodes.OK).json(events)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed retrieving events" })
        }
}

const getEvent = async (req, res) => {
    try {
        const eventId = req.params.id
        await Event.findOne({ _id: eventId })
            .then(event => {
                if (!event) {
                    return res.status(StatusCodes.NOT_FOUND).json({ msg: "Event not found!" })
                }
                res.status(StatusCodes.OK).json(event)
            })
       
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed retrieving event" })
    }
}

const createEvent = async (req, res) => {
    try {
        const eventModel = new Event({
            //required
            title: req.body.title,
            startDate: req.body.startDate,
            category: req.body.category,
            coordinates: req.body.coordinates,
            description: req.body.description,
            hostName: req.body.hostName,
            eventUrl: req.body.eventUrl,
            //non-required
            endDate: req.body.endDate,
            address: req.body.address,
            restrictions: req.body.restrictions,
            eventImages: re.body.eventImages
            
        })
     
        const event = await Event.create(eventModel)
        res.status(StatusCodes.OK).json(event)
    } catch (error) {
        console.log(error);
        let errorMsg = "Failed to create event"
        if (error.code == 11000) {
             errorMsg = "This event is already registered"
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: errorMsg})
    }
}

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id
        await Event.findOneAndDelete({
            _id: eventId,
        }).then(done => {
            if (!done) {
                return res.status(StatusCodes.NOT_FOUND).json({ msg: "Failed deleting event" })
            }
            res.status(StatusCodes.OK).json({ eventId: eventId, msg: "Successfully deleted" })
        })
       
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed locating event" })
    }
}

const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id
        await Event.findOneAndUpdate({
            _id: eventId,
        }, {
            //required
            title: req.body.title,
            startDate: req.body.startDate,
            category: req.body.category,
            coordinates: req.body.coordinates,
            description: req.body.description,
            hostName: req.body.hostName,
            eventUrl: req.body.eventUrl,
            //non-required
            endDate: req.body.endDate,
            address: req.body.address,
            restrictions: req.body.restrictions,
            eventImages: re.body.eventImages
        })
        
        res.status(StatusCodes.OK).json({ msg: "Event is successfully updated!" })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed updating event" })
    }
}


module.exports = { 
    getAllEvents, 
    getEvent, 
    createEvent, 
    deleteEvent, 
    updateEvent
}