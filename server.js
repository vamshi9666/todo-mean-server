const express = require('express');
const app  = express();
const port = 3000;
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors')

mongoose.connect(process.env.MLAB_LINK);

const connection = mongoose.connection;

connection.on('open',()=>{
	console.log("mlab connected ")


})
connection.on('error',()=>{
	console.log("mlab connection failed ! \n check your internet connection")
})


// app.use(cors()) //load cors for cross-site calls

//Use body parser to access req.body
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

const tasksRoutes = require('./routes/tasks')
app.use('/tasks',tasksRoutes)

app.listen(port,()=>{
	console.log("server started on port "+ port)
})