const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // Adding the JSON body parser to "app"

const cors = require('cors'); // Importing the CORS middleware for enabling Cross-Origin Resource Sharing

const corsOptions = {
    origin: 'http://localhost:3000' // Specifying the origin for CORS
};
app.use(cors(corsOptions)); // Applying CORS middleware with the specified options

app.listen(port, () => {
    console.log(`Server is running on ${port}`); // Starting the Express server and logging a message indicating the port
});


require('./db');// Require the file that sets up the database connection


require('./model/user');// Require the User model


const authRoutes = require('./routes/authRoutes');// Require the authentication routes
app.use(authRoutes);

// Middleware for handling 404 errors (router not found)
app.use((req, res, next) => {
    const error = new Error('Router Not Found');
    error.status = 404; // Setting the status code of the error
    next(error); // Passing the error to the next middleware function
});

// Error-handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ error: error.message }); // Sending a JSON response with the error message and status code
});
