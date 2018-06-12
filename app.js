var dotenv = require('dotenv').config(), //loads .env file into process.env
    path = require('path'),
    express = require('express'), //use express framework
    app = express(), //express app
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'); //for cross-site calls like api from product framework



app.use(cors()) //load cors for cross-site calls

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

//Use body parser to access req.body
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
const taskRoutes = require('./routes/tasks')
app.use('/tasks',taskRoutes)


//Passport configuration/initialization

//Connect to mongodb using mongoose
const options = {
    //useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    keepAlive: 120
}
var db = mongoose.connect(process.env.DB, options, function(error) {
    if(error)
        console.log('Error opening mongo connection')
    else
        console.log('Db connection opened')
})

//Do all seeding functions here including initializing counters for auto-increment IDs in collections
// require('./config/seed')

module.exports = app


//Enable routes for oauth authentication by Google
// app.use(require('./api/routes/google-oauth'))

//Launch angular application on the root route
