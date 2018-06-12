// const express = require('express');
// const app  = express();
// const port = process.env.PORT ||3000;
// const mongoose = require('mongoose')
// const bodyParser = require('body-parser');
// const cors = require('cors')
// const options = {
//     //useMongoClient: true,
//     autoIndex: false, // Don't build indexes
//     reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
//     reconnectInterval: 500, // Reconnect every 500ms
//     poolSize: 10, // Maintain up to 10 socket connections
//     // If not connected, return errors immediately rather than waiting for reconnect
//     bufferMaxEntries: 0,
//     keepAlive: 120
// }

// mongoose.connect(process.env.DB, options, function(error) {
//     if(error)
//         console.log('Error opening mongo connection')
//     else
//         console.log('Db connection opened')
// });

// const connection = mongoose.connection;

// connection.on('open',()=>{
// 	console.log("mlab connected ")


// })
// connection.on('error',()=>{
// 	console.log("mlab connection failed ! \n check your internet connection")
// })


// // app.use(cors()) //load cors for cross-site calls

// //Use body parser to access req.body
// app.use(bodyParser.urlencoded({
//   extended: true
// }))
// app.use(bodyParser.json())

// const tasksRoutes = require('./routes/tasks')
// app.use('/tasks',tasksRoutes)






// app.listen(port,()=>{
// 	console.log("server started on port "+ port)
// })
const http = require('http');
const app = require('./app');

const port = process.env.PORT ||3000;
const server = http.createServer(app);

server.listen(port,()=>{
  console.log("server listening on port "+ port)
});
 