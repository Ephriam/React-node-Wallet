var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");
var _ = require("lodash");
const autoIncrement = require('mongoose-auto-increment')

var app = express();

serverPort = process.env.PORT || 3001;
databasePort = 27017;
databseName = "react-wallet";
mongoUri = 'mongodb://ephriam:mlab123@ds119150.mlab.com:19150/chatandwallet'
mongoUriLocal = 'mongodb://127.0.0.1:'+ databasePort + '/' + databseName
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "./public")))

//connect to mongoDB
//mongoose.connect('mongodb://127.0.0.1:'+ databasePort + '/' + databseName)
mongoose.connect(mongoUriLocal).then(()=>{}, (err) => {console.log(err);throw new Error('db')})
const connection = mongoose.connection.on('error', () => {console.error.bind(console, 'Database connection error:');throw new Error('db')})
                   .once('open', function() {  console.log("Database is connected!");  })

autoIncrement.initialize(connection);

var routes = require('./routes')

_.each(routes, (controller, route)=>{
    app.use('/api'+ route, require(controller))
})

app.use('/api/*', (req, res, next) => {
    var error = new Error('404 Not found')
    error.status = 404
    next(error)
})

app.use('/*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

var server = app.listen(serverPort, function(){
	console.log("Server started at port "+serverPort)
})
