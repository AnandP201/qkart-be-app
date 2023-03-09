const mongoose = require("mongoose");
// NOTE - "validator" external library and not the custom middleware at src/middlewares/validate.js
const validator = require("validator");
const config = require("../config/config");
const bcrypt=require('bcryptjs')
// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Complete userSchema, a Mongoose schema for "users" collection
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type:String,
      required:true
    },
    password: {
      type: String,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
    walletMoney: {
      type:Number,
      default:500
    },
    address: {
      type: String,
      default: config.default_address,
    },
    createdAt:{
      type: Date,
      default:Date.now
    },
    updatedAt:{
      type: Date,
      default:Date.now
    }
  },
  // Create createdAt and updatedAt fields automatically
  {
    timestamps: true,
  }
);

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement the isEmailTaken() static method
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email) {
  const isUserExist=await this.findOne({"email":email})
  if(isUserExist){
    return true
  }
  return false
};

userSchema.pre('save',function(next){
  let user=this;

  if(!user.isModified('password'))return next()

  bcrypt.genSalt(12,(err,salt)=>{
    if(err)return next(err)

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
  });
  })
})

userSchema.methods.isPasswordMatch = async function(candidatePassword) {
  const isMatch=await bcrypt.compare(candidatePassword,this.password)

  return isMatch
};

userSchema.methods.hasSetNonDefaultAddress = async function () {
  const user = this;
   return user.address !== config.default_address;
};



// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS
/*
 * Create a Mongoose model out of userSchema and export the model as "User"
 * Note: The model should be accessible in a different module when imported like below
 * const User = require("<user.model file path>").User;
 */

/**
 * @typedef User
 */
const User=new mongoose.Schema(userSchema)



module.exports={User:mongoose.model("User",User)}
