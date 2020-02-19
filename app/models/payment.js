const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//define models
const paymentSchema = new Schema({
     name: {type:String},
     email: {type:String},
     serviceName: {type:String},
     paymentMonth: {type:String},
     amount: {type:String},
     currency: {type:String},
     transactionId: {type:String},
     receiptImg: {type:String},
     userId:{type:String},
})

//model class
module.exports = mongoose.model('payment',paymentSchema);