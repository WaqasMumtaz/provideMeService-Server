const Authentication = require('./app/controller/authentication');
// const profileData = require('./app/controller/profile');
// const stripeKeysDev = require('./app/controller/payments');
var cors = require('cors')


module.exports = function (app) {


    //post routes
    //app.post('/signin',requireSignin,  Authentication.signin);
    app.post('/signup', cors(), Authentication.signup);
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
}