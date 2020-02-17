const mongoose = require("mongoose");

// Read env file data 
require("dotenv").config();

// intrect with mongo database through promises
mongoose.Promise = global.Promise;

console.log(process.env.MONGOURI)


