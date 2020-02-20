var router = require('express').Router();
const Authentication = require('./app/controller/authentication');
const profileData = require('./app/controller/profile');
const stripeKeysDev = require('./app/controller/payments');
var cors = require('cors')

//post requests
router.post('/signup', cors(), Authentication.signup);
router.post('/signin', cors(), Authentication.signin);
router.post('/postemail', cors(), Authentication.forgotpasword);
router.post('/changepassword', cors(), Authentication.changePassword);

//get requests
//get routes
router.get('/getuseremail', Authentication.getemail);


module.exports = router;

