const keys = require('../../config/keys');
const stripe = require("stripe")(keys.stripeSecretKey);
const mongoose = require('mongoose')
const paymentModel = mongoose.model('payment');

exports.stripeKeys = function(req, res, next){
    const publicKey = String(keys.stripePulishableKey)
  console.log(publicKey,'with string')
  console.log(keys.stripePulishableKey,'without string')
res.send({
  keys:publicKey
})
}

exports.stripeCharge = async function(req, res, next){
  let data = req.body;
  
  console.log(data,'stripe data');
  
   stripe.customers.create({
    email: data.email,
    source: data.token
  })
  .then(customer => 
    stripe.charges.create({
      amount: data.amount, // Unit: cents
      currency: data.currency,
      customer: customer.id,
      source: customer.default_source.id,
      description: 'Test payment',
    }))
  .then(function(charge){
    var stripeResponse = charge;
    res.send({
      code:200,
      amount:charge.amount,
      billing_details:charge.billing_details,
      created:charge.created,
      currency:charge.currency,
      description:charge.description,
      paid:charge.paid,
      status:charge.status
    })
    if(stripeResponse.status == "succeeded"){
      const paymentFinalModal = new paymentModel({
          name: data.name,
         email: data.email,
         serviceName: data.serviceName,
         paymentMonth: data.paymentMonth,
         amount: data.amount,
         currency: data.currency,
         transactionId: data.transactionId,
         receiptImg: data.receiptImg,
         userId:data.userId,
      });
      paymentFinalModal.save(function(err,successData){
        if(err){
          // res.send({
          //   code:404,
          //   msg:'Error in API'
          // })
        }
        else if(successData){
          // res.send({
          //   code:200,
          //   msg:'payment data successfully saved'
          // })
        }
      })
    }
    
  }) 
  .catch(err => {
    console.log("Error:", err);
    res.status(500).send({error: err.code});
  });
}

exports.otherpaymentmethod = function(req, res, next){
  const otherMethod = req.body;
  const paymentFinalModal = new paymentModel({
    name: otherMethod.name,
     email: otherMethod.email,
     serviceName: otherMethod.serviceName,
     paymentMonth: otherMethod.paymentMonth,
     amount: otherMethod.amount,
     currency: otherMethod.currency,
     transactionId: otherMethod.transactionId,
     receiptImg: otherMethod.receiptImg,
     userId:otherMethod.userId,
  });
  paymentFinalModal.save(function(err,successData){
    if(err){
      res.send({
        code:404,
        msg:'Error in API'
      })
    }
    else if(successData){
      res.send({
        code:200,
        msg:'payment data successfully saved'
      })
    }
  })
  console.log(otherMethod,'changing in all');
}