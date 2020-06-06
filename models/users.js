const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String ,
    required: [ true , 'Please provide your name' ]
  },
  email: {
    type: String ,
    unique: true ,
    lowercase: true , 
    required: true ,
    validate: [validator.isEmail , 'Please provide a valid email']
  },
  photo: String ,
  role: {
    type: String ,
    enum: [ 'user' , 'guide' , 'lead-guide' , 'admin'] ,
    default: 'user'
  },
  password: {
    type: String ,
    required: [ true , 'Please provide a valid password' ] ,
    minlength: 8 ,
    select: false
  },
  passwordConfirm: {
    type: String ,
    required: [ true , 'Please confirm your password' ] ,
    validate: {
      validator: function(el){ // On create/save User
        return el === this.password
      },
      message: 'Passwords must be the same'
    }
  },
  passwordChangeAt: Date ,
  tokenForPasswordReset: String ,
  tokenForPasswordResetExpires: Date,
  //delete user?
  active: {
    type: Boolean ,
    default: true,
    select: false
  }
})


// DOC Middleware
// 1 Encrypt pass
userSchema.pre( 'save' , async function( next){
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash( this.password , 12 )
  // Once validation is met , no need to persist it in DB
  this.passwordConfirm = undefined;
  next()
});
// 2 Check for pass modified
userSchema.pre( 'save' , function(next){
  // do nothing if
  if(!this.isModified('password') || this.isNew) return next();

  this.passwordChangeAt = Date.now() - 1000 
  next()
})
// QUERY Middleware
// 'deleted users'
userSchema.pre(/^find/ , function(next){
  this.find({ active: {$ne:false} })
  next()
})

// INSTANT METHODS within model
//  1.Check if password is correct
userSchema.methods.correctPass = async function( candidatePass , userPass ){
  return await bcrypt.compare( candidatePass , userPass )
};

// 2.Check modifiedPass against JWT issued at 
userSchema.methods.changedPassAt = function( JwtIssuedAt ){
  if(this.passwordChangeAt){
    return JwtIssuedAt < parseInt( this.passwordChangeAt.getTime() / 1000 )
  }
  return false 
}

// 3.Generate a token on PasswordReset
userSchema.methods.createTokenForPassReset = function(){
  //1
  const resetToken = crypto.randomBytes(32).toString('hex')
  this.tokenForPasswordReset = crypto
  .createHash('sha256')
  .update(resetToken)
  .digest('hex');
  
  console.log({resetToken} , this.tokenForPasswordReset);
  
  //2
  this.tokenForPasswordResetExpires = Date.now() + 10 * 60 * 1000
  return resetToken;
}



const UserModel = mongoose.model( 'User' , userSchema );

module.exports = UserModel