const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator")

const userSchema = new mongoose.Schema({

  email:{
    required: true,
    type: String
  },
  password:{
    required:true,
    type:String
  },
  username:{ 
    required: true,
    type: String
  }
})

// Sign Up static method
userSchema.statics.signUpUser = async function(email, password, username){
  //check if there info for the email and password
  if( !email || !password){
    throw Error("All fields must be filled!")
  }
  //Validate email 
  if(!validator.isEmail(email)){
    throw Error("Email is not valid")
  }

  //Validate password to have length and other charcteristics that make it strong
  if(!validator.isStrongPassword(password)){
    throw Error("Password is not strong enough")
  }
 //check if email is already in use
 const exists = await this.findOne({email})
 if(exists){
  throw Error ("Email already in use")
 }
  //check if username is already in use 
  const existsUsername = await this.findOne({username}) //ali adding it
  if(existsUsername){
   throw Error ("User name already in use")
  }
 //hashing the password before saving them into the db
  //generating a salt
  const salt = await bcrypt.genSalt(10);
  // hashing the password
  const hash = await bcrypt.hash(password, salt);

  // Saving password and email in the db
  const user = await this.create({ email, password:hash, username})

  return user;
}

//Log In Static method
userSchema.statics.logInUser = async function(email, password){
  //Verify that all fields are filled
  if(!email || !password){
    throw Error("All fields must be filled!")
  }
    //Validate email 
    if(!validator.isEmail(email)){
      throw Error("Email is not valid, please check it and try again")
    }

  //User must be already registered in the db to be able to log in
  const user = await this.findOne({email})
  if(!user){
    throw Error("The email entered is not registed in our database, please check it and try again")
  }

  //Password Validation with bcrypt
  const match = await bcrypt.compare(password, user.password)
  if(!match){
    throw Error("Incorrect password")
  }
  return user
}

const User = mongoose.model("user", userSchema);
module.exports = User