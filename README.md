## Project Overview

Name: Node/React Practicum Back-End  
Description: This is the back-end server for a practicum project using Node.js and Express to create a RESTful API  
The server communicates with a MongoDB database and provides endpoints for the front-end React application

### Technology Stack

* Node.js: JavaScript runtime environment
* Express: Node.js web application framework for building RESTful APIs
* MongoDB: NoSQL database used for storing data
* Mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js
* Nodemon: Tool for automatically restarting the server during development
* Dotenv: Module to load environment variables from a .env file
* JWT: JSON Web Tokens for authentication
* Bcrypt: Library for hashing passwords
* Cors: Middleware for enabling Cross-Origin Resource Sharing
* Morgan: HTTP request logger middleware
* Body-Parser: Middleware for parsing incoming request bodies
* Swagger-ui-express: Module to provide with API's documentation via server route 
    
### API Documentation

Utilizing features of the Swagger-ui-express, API documentation can be accessed through `/api/v1/docs` route,  
eliminating the need to surf through the `/controllers` and `/routes`, providing necessary data in a convenient form  
![Swagger Docs Image](https://github.com/Code-the-Dream-School/gg-pac-team7-back/raw/main/images/back-end-swagger-docs.png)  
> Also keep in mind that Render allocates minimum of its CPU time, so waiting for the `/api/v1/docs` response may take awhile     

### Database Models

DB models are located within `/models` directory:
```
    ./models/Bookmarks.js
    ./models/Event.js
    ./models/User.js
```
Inside these files schemas can be found     
Each schema maps to a MongoDB collection and defines the shape of the documents within that collection 

_For example, several properties from `EventSchema`_:
``` 
    title: {
        type: String,
        unique: true,
        required: true
    },
    category: {
        type: String,
        enum: ['food', 'animal', 'environment', 'health', 'social'],
        default:'social',
        required: true
    },
    coordinates: {
        type: [Number],
        required: true,
        default: undefined,
    }
    
```
Each one is named and has several attributes:   
_`type`_ - defines DataType, accepts different values like String, Number, Date, Array, etc   
_`unique`_ - property must be unique among other documents in the collection, otherwise duplicate error is casted   
_`required`_ - property is integral, document can't exist without it, otherwise considered optional   
_`enum`_ - gives a list of predefined values of a certain DataType  
_`default`_ - sets the starting value of the property

### Environment Variables

Some variables need to be accessible globally, while their values are static and may contain sensitive information  
Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`  
By default, for security purposes, `.env` included into `.gitignore` file, to ensure if won't be pushed to repository and become publically accessible  
However, the inner structure of the file can be shown, with no sensitive data included:
```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/practicum
JWT_SECRET=<jwt_secret>
JWT_EXPIRES=1d
PORT=8000
GOOGLE_API_KEY=<googleApiKey>
```

### Setup Instructions

1. Create a folder to contain both the front-end and back-end repos
2. Clone this repository to that folder
3. Run `npm install` or `npm i` to install dependencies
4. Pull the latest version of the `main` branch (when needed)
5. Run `npm run dev` to start the development server
6. Open http://localhost:8000/api/v1/ with your browser to test
7. Your back-end server is now running. You can now run the front-end app

#### Running the back-end server in Visual Studio Code

_**Note**_: In the below example, the group's front-end repository was named `bb-practicum-team1-front` and the back-end repository was named `bb-practicum-team-1-back`. Your repository will have a **different** name, but the rest should look the same  
![Back end running in VSCode](https://github.com/Code-the-Dream-School/gg-pac-team7-back/raw/main/images/back-end-running-vsc.png)   

#### Testing the back-end server API in the browser   

![Back end running in browser](https://github.com/Code-the-Dream-School/gg-pac-team7-back/raw/main/images/back-end-running-browser.png) 
   

