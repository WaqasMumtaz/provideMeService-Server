const mongoose = require('mongoose')
const jwt = require('jwt-simple');
const User = mongoose.model('user');
//var configDB = require('./config/database.js');
//const moment = require('moment');
const profile = mongoose.model('userProfile');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt-nodejs');


//creating token for user or through user.id
function tokenForUser(user){
  console.log(user,'tokennnnnnn')
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp}, 'getfitfar3344556698765432');
}

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
      user: "drens224@gmail.com",
      pass: "drent1234"
    },
    tls: {
        rejectUnauthorized: true
    }

});

exports.signup = function(req, res, next){
  console.log('API HIT')
  const email = req.body.email;
  const password = req.body.password;
  const mobileNo = req.body.mobileNo;
  const verified = 'true';
  const name = req.body.name;
  const lastName = req.body.lastName;
  const gender = req.body.gender;
  const type = req.body.type;
  const deviceToken = req.body.deviceToken;
  const blocked = 'false';
  console.log(email +''+ password +''+ mobileNo +''+verified);
  if(!email || !password){
      return res.status(422).send({error:'you must provide email and password'})
    }

    //see if a user given email exist show error
        User.findOne({email:email},function(err,existingUser){
          if(err){ return next(err); }
    //if a user with email does exit, return a error
        if(existingUser){
          return res.status(422).send({error:'Email in use'});
        }

        const user = new User({
        email:email,
        password:password,
        mobileNo:mobileNo,
        name:name,
        lastName:lastName,
        gender:gender,
        verified:verified,
        blocked:blocked,
        type:type,
        deviceToken:deviceToken
      });
      console.log(user,'checkingggggggg');
      user.save(function(err){
        if(err){ return next(err); }
      });
      res.json({
        token:tokenForUser(user),
        _id:user._id,
        code:200,
      });
    });
}

exports.getemail = function(req,res,next){
  User.find(function(err,userEmail){
    if(err){
      return res.status(422).send({error:'something went wrong'});
    }
    else if(userEmail){
      const emails = [];
      for(var i=0;i<userEmail.length;i++){
        emails.push(userEmail[i].email)
      }
      res.send({
        code:200,
        msg:'All user emails',
        content:emails
      })
    }
  })
}
exports.signin = async (req, res, next) => {
  //user has already had their email and password auth'd
  //we just need to give them a token
  console.log('api hit')
  let specific_User_Profile = [];
  let trainnySpecificProfile = [];
  let trainnerSpecificProfile= [];
  var useremail = req.body.email;
  var password = req.body.password;
  //console.log(useremail)
  User.findOne({email:useremail},function(err,user){
    if(user){
      //onsole.log(user,'database user');
      //const user = this;
      if(user.type == 'trainee'){

        if((user.trainnerId == undefined || user.trainnerId == null)){
        bcrypt.compare(password, user.password, function(err, isMatch){
          if(err){ return callback(err); }
          //callback(null, isMatch);
          if(isMatch){
            res.send({
          token: tokenForUser(user),
          _id:user._id,
          email:user.email,
          name:user.name,
          type:user.type,
          code:200,
          deviceToken:user.deviceToken || '',
          //username:user.firstName +''+ user.lastName
        });
          }
          else if(!isMatch){
            res.send({
              msg:'password not match',
              Match:isMatch
            })
          }
          //console.log(isMatch);
        })
      }

      else{
        console.log('check')
      if(user.type == 'trainee'){
        console.log('trainny');
        profile.find({"userId":user.trainnerId},function(err,trainnerProfile){
          if(err){}
          else if(trainnerProfile){
            trainnerSpecificProfile = trainnerProfile
            profile.find({"userId":user._id},function(err,specificUserProfile){
              if(err){
                specific_User_Profile = err;
              }
              else if(specificUserProfile){
                //console.log(specificUserProfile)
                specific_User_Profile = specificUserProfile;
                bcrypt.compare(password, user.password, function(err, isMatch){
                  if(err){ return callback(err); }
                  //callback(null, isMatch);
                  if(isMatch){
                    res.send({
                  token: tokenForUser(user),
                  _id:user._id,
                  email:user.email,
                  name:user.name,
                  assignTrainner:user.assignTrainner,
                  assignTrainny:user.assignTrainny,
                  tainnyId:user.tainnyId,
                  type:user.type,
                  trainnerId:user.trainnerId,
                  profile:specific_User_Profile,
                  trainnyProfiledata:trainnySpecificProfile,
                  trainnerProfileData:trainnerSpecificProfile,
                  deviceToken:user.deviceToken || '',
                  code:200,
                  //username:user.firstName +''+ user.lastName
                });
                  }
                  else if(!isMatch){
                    res.send({
                      msg:'password not match',
                      Match:isMatch
                    })
                  }
                  //console.log(isMatch);
                })
              }
            })
          }
        })
      } 
    
      else if(user.type == 'trainner'){
        console.log('trainner');
        profile.find({"userId":user.tainnyId},function(err,trainnyProfile){
          if(err){res.send('error',err)}
          else if(trainnyProfile){
            trainnySpecificProfile = trainnyProfile
            profile.find({"userId":user._id},function(err,specificUserProfile){
              if(err){
                specific_User_Profile = err;
              }
              else if(specificUserProfile){
                //console.log(specificUserProfile)
                specific_User_Profile = specificUserProfile;
                bcrypt.compare(password, user.password, function(err, isMatch){
                  if(err){ return callback(err); }
                  //callback(null, isMatch);
                  if(isMatch){
                    res.send({
                  token: tokenForUser(user),
                  _id:user._id,
                  email:user.email,
                  name:user.name,
                  assignTrainner:user.assignTrainner,
                  assignTrainny:user.assignTrainny,
                  tainnyId:user.tainnyId,
                  trainnerId:user.trainnerId,
                  type:user.type,
                  profile:specific_User_Profile,
                  trainnyProfiledata:trainnySpecificProfile,
                  trainnerProfileData:trainnerSpecificProfile,
                  deviceToken:user.deviceToken || '',
                  code:200,
                  //username:user.firstName +''+ user.lastName
                });
                  }
                  else if(!isMatch){
                    res.send({
                      msg:'password not match',
                      Match:isMatch
                    })
                  }
                  //console.log(isMatch);
                })
              }
            })
            //res.send('checking')
          }
        })
      }
    }
  }
  else if(user.type == 'trainner'){
    if((user.tainnyId == undefined || user.tainnyId == null)){
      bcrypt.compare(password, user.password, function(err, isMatch){
        if(err){ return callback(err); }
        //callback(null, isMatch);
        if(isMatch){
          res.send({
        token: tokenForUser(user),
        _id:user._id,
        email:user.email,
        name:user.name,
        type:user.type,
        deviceToken:user.deviceToken || '',
        code:200,
        //username:user.firstName +''+ user.lastName
      });
        }
        else if(!isMatch){
          res.send({
            msg:'password not match',
            Match:isMatch
          })
        }
        //console.log(isMatch);
      })
    }
    else{
      console.log('check')
    if(user.type == 'trainee'){
      console.log('trainny');
      profile.find({"userId":user.trainnerId},function(err,trainnerProfile){
        if(err){}
        else if(trainnerProfile){
          trainnerSpecificProfile = trainnerProfile
          profile.find({"userId":user._id},function(err,specificUserProfile){
            if(err){
              specific_User_Profile = err;
            }
            else if(specificUserProfile){
              //console.log(specificUserProfile)
              specific_User_Profile = specificUserProfile;
              bcrypt.compare(password, user.password, function(err, isMatch){
                if(err){ return callback(err); }
                //callback(null, isMatch);
                if(isMatch){
                  res.send({
                token: tokenForUser(user),
                _id:user._id,
                email:user.email,
                name:user.name,
                assignTrainner:user.assignTrainner,
                assignTrainny:user.assignTrainny,
                tainnyId:user.tainnyId,
                type:user.type,
                trainnerId:user.trainnerId,
                profile:specific_User_Profile,
                trainnyProfiledata:trainnySpecificProfile,
                trainnerProfileData:trainnerSpecificProfile,
                deviceToken:user.deviceToken || '',
                code:200,
                //username:user.firstName +''+ user.lastName
              });
                }
                else if(!isMatch){
                  res.send({
                    msg:'password not match',
                    Match:isMatch
                  })
                }
                //console.log(isMatch);
              })
            }
          })
        }
      })
    } 
  
    else if(user.type == 'trainner'){
      console.log('trainner');
      for(var i=0;i<(user.tainnyId).length;i++){
        console.log(user.tainnyId[i],'checkingggggggg')
         profile.find({"userId":{$in:user.tainnyId[i]}}, function(err,trainnyProfile){
          if(err){res.send('error',err)}
          else if(trainnyProfile){
            console.log(trainnyProfile)
               trainnySpecificProfile.push(trainnyProfile)
          }
        })
      }
      // profile.find({"userId":user.tainnyId},function(err,trainnyProfile){
      //   if(err){res.send('error',err)}
      //   else if(trainnyProfile){
      //     trainnySpecificProfile = trainnyProfile
          profile.find({"userId":user._id},function(err,specificUserProfile){
            if(err){
              specific_User_Profile = err;
            }
            else if(specificUserProfile){
              //console.log(specificUserProfile)
              specific_User_Profile = specificUserProfile;
              bcrypt.compare(password, user.password, function(err, isMatch){
                if(err){ return callback(err); }
                //callback(null, isMatch);
                if(isMatch){
                  res.send({
                token: tokenForUser(user),
                _id:user._id,
                email:user.email,
                name:user.name,
                assignTrainner:user.assignTrainner,
                assignTrainny:user.assignTrainny,
                tainnyId:user.tainnyId,
                trainnerId:user.trainnerId,
                type:user.type,
                profile:specific_User_Profile,
                trainnyProfiledata:trainnySpecificProfile,
                trainnerProfileData:trainnerSpecificProfile,
                deviceToken:user.deviceToken || '',
                code:200,
                //username:user.firstName +''+ user.lastName
              });
                }
                else if(!isMatch){
                  res.send({
                    msg:'password not match',
                    Match:isMatch
                  })
                }
                //console.log(isMatch);
              })
            }
          })
          //res.send('checking')
        }
      //})
    //}
  }
  }
    }
  
  })

}
exports.comparePassword = function(req, res, next){
  currentpassword = req.body.password;
  email = req.body.email;
  User.findOne({email:email},function(err,user){
    if(user){
      console.log(user);
      //const user = this;
      bcrypt.compare(currentpassword, user.password, function(err, isMatch){
        if(err){ return callback(err); }
        //callback(null, isMatch);
        if(isMatch){
          res.send({
            msg:'password Match',
            Match:isMatch
          })
        }
        else if(!isMatch){
          res.send({
            msg:'Not Match',
            Match:isMatch
          })
        }
        //console.log(isMatch);
      })
    }
  })
}

exports.forgotpasword = function(req,res,next){
  var val = Math.floor(1000 + Math.random() * 9000);
  console.log(val);
  var email = req.body.email;
  if(!email){
    res.send({
      code:404,
      msg:'kindly give proper email'
    })
  }
  //=========user email send to perticular client start=============//
  mailOptions={
    to : email,
    subject : `${val} Is your verification code `,
    html : `<html>
    <head>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700,800&display=swap" rel="stylesheet">
    </head>
    <body style="background-color: black; padding:50px; font-family: 'Montserrat', sans-serif;">


    <div style="text-align: center; margin-top:50px">
    <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1561456528/getfit-01_xmpxlq.png" width="150" height="200">
    </div>
    <div>
      <p style="text-align: center; color:#aaaaaa; font-size:23px;"> You requested to reset your GetFitAthletic password.
        <br/>
      Enter the below verification code into the app to
      <br/>
      reset your password.
      </p>
    </div>

    <div style="text-align: center; margin-top:50px">
      <button style="width:240px; height:50px; border-radius:8px; background-color:#ff6200; border-color:#ff6200; color:white; font-size:25px; font-weight:800; font-family: 'Montserrat', sans-serif;">${val}</button>
      <p style="font-size:15px; color:#aaaaaa;"> Click the button to copy your code. </p>
    </div>

    <div>
      <p style="text-align: center; color:#aaaaaa; font-size:23px;">If you did not request this password change, <br/>please let us know.</p>
    </div>


    </body>
    </html>`
  }
  smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
          console.log(error);
    res.end(error);
   }else{
          console.log("Message sent: " + response.message);
          console.log("Message sent: " + response.message);

       }
});
User.updateOne(
        {"email":email},
        {$set: {"forgotPasswordRand": val}}
    ).then(() => {
        res.send({
            code:200,
            data:'Email sent'
        });
    }).catch(() => res.status(422).send({msg:''}));

    //========user email send to perticular client end===============//
}

exports.changePassword = function(req,res,next){
  //console.log('change password');
  var randomCode = req.body.code,
      newPassword = req.body.password;

  User.findOne({"forgotPasswordRand":randomCode},function(err,userWithCode){
    //console.log(userWithCode);
    if(err == null && userWithCode == null){
      res.send({
        code:400,
        msg:'Code is not match which we send on email'
      })
    }
    else if(userWithCode){
      console.log(randomCode)
      if(userWithCode.forgotPasswordRand == randomCode){
            userWithCode.password = newPassword;
            userWithCode.save(function(err,doc){
                if(err){}
                res.send({
                    code:200,
                    msg:'Password is successfuly Changed'
                })
            })
        }
      else if(userWithCode.forgotPasswordRand != randomCode){
        res.send({
          code:200,
          msg:'random code not match correctly with email code',
        })
      }
      }
    })
}
