var router = require('express').Router();
const mongoose = require('mongoose')
const jwt = require('jwt-simple');
const User = mongoose.model('user');
const Authentication = require('./app/controller/authentication');
const profileData = require('./app/controller/profile');
const stripeKeysDev = require('./app/controller/payments');
var cors = require('cors')
//creating token for user or through user.id
function tokenForUser(user){
    console.log(user,'tokennnnnnn')
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp}, 'getfitfar3344556698765432');
  }

  
    router.post('/signup', cors(), Authentication.signup);

// router.post('/signup', function(req , res , next){
//     const email = req.body.email;
//   const password = req.body.password;
//   const mobileNo = req.body.mobileNo;
//   const verified = 'true';
//   const name = req.body.name;
//   const lastName = req.body.lastName;
//   const gender = req.body.gender;
//   const type = req.body.type;
//   const deviceToken = req.body.deviceToken;
//   const blocked = 'false';
//   console.log(email +''+ password +''+ mobileNo +''+verified);
//   if(!email || !password){
//       return res.status(422).send({error:'you must provide email and password'})
//     }

//     //see if a user given email exist show error
//         User.findOne({email:email},function(err,existingUser){
//           if(err){ return next(err); }
//     //if a user with email does exit, return a error
//         if(existingUser){
//           return res.status(422).send({error:'Email in use'});
//         }

//         const user = new User({
//         email:email,
//         password:password,
//         mobileNo:mobileNo,
//         name:name,
//         lastName:lastName,
//         gender:gender,
//         verified:verified,
//         blocked:blocked,
//         type:type,
//         deviceToken:deviceToken
//       });
//       console.log(user,'checkingggggggg');
//       user.save(function(err){
//         if(err){ return next(err); }
//       });
//       res.json({
//         token:tokenForUser(user),
//         _id:user._id,
//         code:200,
//       });
//     });

//})
module.exports = router;

// module.exports = function (app) {


    //post routes
    //app.post('/signin',requireSignin,  Authentication.signin);
    // app.post('/signup', cors(), Authentication.signup);
    // app.post('/signin', cors(), Authentication.signin);
    // app.post('/postemail', cors(), Authentication.forgotpasword);
    // app.post('/changepassword', cors(), Authentication.changePassword);
    // app.post('/postexerciselog', cors(), exerciseLog.exerciseLogData);
    // app.post('/weightLog', cors(), exerciseLog.weightPostLog);
    // app.post('/profile', profileData.userProfilePost);
    // app.post('/bmilogs', cors(), bmiPostData.bmiLogData);
    // app.post('/macrodata', exerciseLog.macrosPostCalculater);
    // app.post('/payment', cors(), stripeKeysDev.stripeCharge);
    // app.post('/otherpayment', cors(), stripeKeysDev.otherpaymentmethod);
    // app.post('/pedometer', cors(), pedometerDetail.postpedometerdata);
    // app.post('/getpedometerbyid', pedometerDetail.getpedometerdata);
    // app.post('/postgoal', cors(), setGoalFitness.createGoal);
    // app.post('/getgoal', cors(), setGoalFitness.getGoal);
    // app.post('/email', cors(), emailtemplate.sendrequestemail);
    //app.post('/imageupload', cors(), cloudinaryProcess.uploadImage);

    //get routes
    // app.get('/getuseremail', Authentication.getemail);
    // app.get('/getallexerciselog', exerciseLog.getAllLogData);
    // app.get('/getweightlog', exerciseLog.getWeightLog);
    // app.get('/keys', stripeKeysDev.stripeKeys);
    // app.get('/getuserdetail', admin.dashboardValue);


    //admin routes
    // app.get('/getuser', admin.getAllUser);
    // app.get('/gettrainner', admin.getTrainner);
    // app.get('/gettrainny', admin.getTrainny);
    // app.post('/updateuser', cors(), admin.updateUser);
    // app.post('/adminuser', cors(), admin.changeStatusByAdmin);
    // app.post('/getuserbyemail', cors(), admin.getUserByEmail);
    // app.get('/getemailadmin', admin.getemailadmin);
    // app.post('/block', cors(), admin.blockuser);
    // app.post('/invoice', cors(), admin.invoices);
    // app.post('/getProfile', cors(), admin.userProfile);
    // app.post('/getbmi', cors(), bmiPostData.getBmiDataId);
    // app.post('/getmacros', cors(), exerciseLog.getmacros);
// }