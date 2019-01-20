const mongoose = require('mongoose');
const PassportLocalMongoose = require('passport-local-mongoose');
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
});
UserSchema.index({
    FullName: 1,
    username: 1,
    email: 1
});
UserSchema.plugin(PassportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);