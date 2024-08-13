const app = require("./app");
require('dotenv').config()
const connectDB = require('./db/connect')
const port = process.env.PORT

const start = () => {
    try {
      connectDB(process.env.MONGO_URI)
      return app.listen(port, () =>
        console.log(`Server started on port: ${port}`),
      )
    } 
    catch (error) {
      console.log("Error happened while connecting database: ", error)
    }
  }
  
start()
