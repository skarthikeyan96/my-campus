const mongoose = require('mongoose');
const tskstatusSchema = mongoose.Schema({
    author :{
        id : {
            type:mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username  : String,
        fullname : String
    },
    taskstatus : String 
})
module.exports = mongoose.model("tskstatus",tskstatusSchema)