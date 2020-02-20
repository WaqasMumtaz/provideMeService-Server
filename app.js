var express     = require('express'),
    app         = express();
    // config      = require('.//config/config'),
    cookieParser = require('cookie-parser');
     bodyParser  = require('body-parser'),
     glob        = require('glob'),
     mongoose    = require('mongoose'),
    //  server      = app.listen(config.port),
    //  io          = require('socket.io').listen(server),
    cors = require('cors');

// Read env file data 
require("dotenv").config();
// intrect with mongo database through promises
mongoose.Promise = global.Promise;
console.log(process.env.MONGOURI)    

// require('./mongo');

require('./app/models/user');
require('./app/models/profile');
require('./app/models/payment');


// require('./app/controller/home');
const router = require('./router')


app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// router(app);
// app.use(cookieParser());

//Connecting database

// var configDB = require('./config/database.js');
mongoose.connect(process.env.MONGOURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection failed:'));
db.once('open', function (callback) {
    console.log("Database :: Interview :: connection established successfully.");
});




app.set('port' , process.env.PORT || 8000)
const port = app.get('port');

app.use('/', router);

app.get('/', (req , res)=>{
    res.send('<h1>Welcome Provide Me Service , Server</h1>')
})

 app.listen(port , ()=>{
     console.log('Server Port >>', port);
 })   