const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


//define models
const userSchema = new Schema({
  email:{type:String},
  password:{type:String},
  mobileNo:{type:String},
  verified:{type:Boolean},
  name:{type:String},
  lastName:{type:String},
  gender:{type:String},
  blocked:{type:Boolean},
  assignTrainner:{type:String},
  assignTrainny:{type:Array},
  trainnerId:{type:String},
  tainnyId:{type:Array},
  type:{type:String},
  deviceToken:{type:String},
  forgotPasswordRand:{type:String},
  resetPasswordToken:{type:String},
  resetPasswordExpires:{type:String},
  pedometer:{type:Boolean} 
})


//on save Hook, encrypt password
//Before saving modal run this code
userSchema.pre('save',function(next){
  //gett access to the user model
    const user = this;
//generate a salt then run callback
    bcrypt.genSalt(10,function(err, salt){
      if(err){ return next(err); }

      //hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash){
          if(err){ return next(err); }
          //overwrite plain text password with encrypted password
          user.password = hash;
          next();
           })
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err){ return callback(err); }
    callback(null, isMatch);
  })
}


//model class
module.exports = mongoose.model('user',userSchema);

//export model
//module.exports = ModelClass;
