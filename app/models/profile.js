const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define models
const profileSchema = new Schema({
    userId:{type:String},
    date:{type:String},
    time:{type:String},
    email:{type:String},
    address:{type:String},
    contactNo:{type:String},
    gender:{type:String},
    image:{type:String},
    name:{type:String},
    type:{type:String},
    
})

//model class
module.exports = mongoose.model('userProfile',profileSchema);