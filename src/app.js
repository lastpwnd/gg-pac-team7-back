const express = require("express")
const app = express()
const cors = require("cors")
const favicon = require("express-favicon")
const logger = require("morgan")
const bodyParser = require("body-parser")
const swaggerUI = require('swagger-ui-express')
const swaggerDocs = require('../utils/swaggerDocs.json')
require("dotenv").config()

const authRouter = require("./routes/auth.js")
const profileRouter = require("./routes/profile.js")
const eventsRouter = require("./routes/events.js")
const searchRouter = require("./routes/search.js")
const bookmarksRouter = require("./routes/bookmarks.js")

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger("dev"))
app.use(express.static("public"))
app.use(favicon(__dirname + "/public/favicon.ico"))
app.use(bodyParser.json())


app.get("/api/v1", (req, res) => {
  return res.json({ data: "This is a full stack app!" })
});

app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/profile", profileRouter)
app.use("/api/v1/events", eventsRouter)
app.use("/api/v1/search", searchRouter)
app.use("/api/v1/bookmarks", bookmarksRouter)


module.exports = app
