const User = mongoose.model('user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const profile = mongoose.model('userProfile');
const paymentModel = mongoose.model('payment');
//creating token for user or through user.id
function tokenForUser(user){
  console.log(user,'tokennnnnnn')
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp}, 'getfitfar3344556698765432');
}
exports.getAllUser = function(req, res, next){
    User.find(function(err, users){
      if(err){
        res.send({
          code:404,
          msg:'no user Found'
        })
      }
      else if(users){
        res.send({
          code:200,
          msg:'All getfit users',
          content:users
        })
      }
    })
}

exports.getTrainner = function(req, res, next){
  User.find({"type":"trainner"},function(err,trainnerData){
    if(err){
      res.send({
        code:404,
        msg:'trainner not found',
        content:[]
      })
    }
    else if(trainnerData){
      res.send({
        code:200,
        msg:'All trainner',
        content:trainnerData
      })
    }
  })
}

exports.getTrainny = function(req, res, next){
  User.find({"type":"trainee"},function(err, trainnyData){
    if(err){
      res.send({
        code:404,
        msg:'trainy not found',
        content:[]
      })
    }
    else if(trainnyData){
      res.send({
        code:200,
        msg:'All trainnies',
        content:trainnyData
      })
    }
  })
}

exports.updateUser = function (req, res, next){
  console.log(req.body);
  const trainnerName = req.body.trainnerName;
  const trainnyName  = req.body.trainnyName;
  const trainnerId = req.body.trainnerId;
  const trainnyId = req.body.trainnyId;
  const profileDetail = req.body.profileDetail

  console.log(trainnerName,+''+trainnyName,+''+trainnerId,+''+trainnyId);
  //res.send({he:'heloo'})
  User.updateMany({"_id":trainnyId.userId},
  {$set: {"trainnerId":trainnerId,"assignTrainner":trainnerName}}).then((response) =>{
    
  }).catch(() => res.status(422).send({msg:'okay'}));

  User.updateMany({"_id":trainnerId},
  {$push: {"tainnyId":trainnyId,"assignTrainny":profileDetail}}).then((response) =>{
    res.send({
      code:200,
      msg:'trainner is successfully assign',
      content:response
    })
  }).catch(() => res.status(422).send({msg:'okay'}));

}


exports.changeStatusByAdmin = function(req, res, next){
  const userObj = req.body;
 console.log(userObj,'checking admin');
 User.updateOne(
  {"_id":userObj.id},
  {$set: {"type": userObj.type}},
  {multi:true}
).then((response) => {
  res.send({
      code:200,
      msg:'profile data updated successfully',
      content:response
  });
}).catch(() => res.status(422).send({msg:'okay'}));
}

exports.getUserByEmail = function(req, res, next){
  const specificEmail = req.body.email;
  //console.log(specificEmail);
  User.find({"email":specificEmail},function(err,specificUser){
    if(err){
      res.send({
        code:404,
        msg:'Not get any user',
        content:[]
      })
    }
    else if(specificUser){
      res.send({
        code:200,
        msg:'data for' +''+specificEmail,
        content:specificUser
      })
    }
  })
}

exports.getemailadmin = function(req,res,next){
  User.find(function(err,userEmail){
    if(err){
      return res.status(422).send({error:'something went wrong'});
    }
    else if(userEmail){
      const emails = [];
      for(var i=0;i<userEmail.length;i++){
        emails.push({
          Email:userEmail[i].email,
          id:userEmail[i]._id
        })
      }
      res.send({
        code:200,
        msg:'All user emails',
        content:emails
      })
    }
  })
}

exports.blockuser = function(req,res,next){
  var useremail = req.body.email;
  var status = req.body.status;
  const keyValue = req.body.key;
  const tempKey = JSON.stringify(keyValue);
  
  //console.log(tempKey);
  console.log(status,'emmmmmaaaaiiilllll');
   User.find({"email":useremail}, function(err,data){
      if(err){
        return res.status(422).send({error:'something went wrong'})
      }
      else if(data){
        //var keyValue = req.body.key;
        if(keyValue == 'blocked'){
          console.log('checking valueeeeee')
        User.updateOne(
          {"email":useremail},
          {$set: {"blocked": status}},
          {multi:true}
        ).then((response) => {
          res.send({
              code:200,
              msg:'User data updated successfully',
              content:response
          });
        }).catch(() => res.status(422).send({msg:'okay'}));
      }
      else if(keyValue == 'verified'){
        console.log(keyValue,'hitttttt');
        User.updateOne(
          {"email":useremail},
          {$set: {"verified": status}},
          {multi:true}
        ).then((response) => {
          res.send({
              code:200,
              msg:'User data updated successfully',
              content:response
          });
        }).catch(() => res.status(422).send({msg:'okay'}));
      }
    }
   })
}


exports.invoices = function(req,res,next){
  let userId = req.body.userId;
     //let userId = '5d26e864b67ae70017a0f41f'; 
  paymentModel.find({"userId":userId},function(err,invoiceData){
    if(err){
      res,send({
        code:404,
        msg:'Something went wrong in API request'
      })
    }
    else if(invoiceData){
      //res.send(invoiceData)
      if(invoiceData.length == 0){
        res.send({
          code:200,
          msg:'No invoice found for current user',
          content:invoiceData
        })
      }
      else if(invoiceData.length > 0){
        res.send({
          code:200,
          msg:'Invoice for current user',
          content:invoiceData
        })
      }
    }
  })
}

exports.userProfile = function(req, res, next){
  let userId = req.body.userId;
  console.log(userId , 'userId')
  // let userId = "d7cceff5dcbe400170d5cf0";
  profile.find({"userId":userId},function(err,specificProfile){
    if(err){
      res.send({
        code:404,
        msg:'Something went wrong'
      })
    }
    else if(specificProfile.length != 0){
      console.log(specificProfile.length != 0)
      res.send({
        code:200,
        msg:'User Specific Profile',
        content:specificProfile
      })
    }
    else if(specificProfile.length == 0){
      console.log(specificProfile.length == 0)
      res.send({
        code:200,
        msg:'User not created profile yet',
        content:specificProfile
      })
    }
  })
}

exports.dashboardValue = function(req,res,next){
  let Trainee = [];
  let Trainnerdata = [];
  User.find(function(err,userData){
      if(err){
        res.send({
          code:404,
          msg:'something went wrong',
          content:[]
        })
      }
      else if(userData){
        for(var i=0;i<userData.length;i++){
          if(userData[i].type == 'trainee'){
            Trainee.push(userData[i].name);
          }
          else if(userData[i].type == 'trainner'){
            Trainnerdata.push(userData[i].name);
          }
        }
        res.send({
          code:200,
          msg:'All user Data',
          totalUsers:userData.length,
          totalTrainne:Trainee.length,
          totalTrainner:Trainnerdata.length
        })
      }
  })
}