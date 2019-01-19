const mongoose = require('mongoose');
const PassportLocalMongoose = require('passport-local-mongoose')
const UserSchema = mongoose.Schema({
    username:String,
    FullName:String,
    email:String,
    password:String,
    isStudent:{
        type:Boolean,
        Default:true
    },
    isAdmin:{
       type:Boolean,
       Default:false 
    }
})
UserSchema.plugin(PassportLocalMongoose)
module.exports = mongoose.model('User',UserSchema);