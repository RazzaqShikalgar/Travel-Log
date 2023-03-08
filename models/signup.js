const mongoose = require('mongoose');
// const encrypt = require("mongoose-encryption");
const bcrypt = require('bcrypt');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
// const route = express.Router();
const userSchema =  new mongoose.Schema({
    name      : { type:String , required:true },
    
    email     : { type:String , required:true },
    
    phone     : { type:Number , required:true },
 
    password  : { type:String , required:true },

    cpassword : { type:String , required:true },

    tokens    : [{token:{ type:String,required:true}}]
});

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
      this.password = await  bcrypt.hash(this.password,10);
      this.cpassword = await bcrypt.hash(this.cpassword,10);
    }
    next();
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
