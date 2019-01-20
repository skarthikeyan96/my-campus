const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
    heading : String,
    description : String,
    author :{
        id : {
            type:mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username  : String,
        fullname : String
    },
    created:{
        type : Date,
        default :Date.now()
   },
   deadline :{
       type:Date
   }
})
module.exports = mongoose.model("Task",TaskSchema)
