const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    heading : String,
    description : String,
    
    author :{
        id : {
            type:mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username  : String,
        firstname : String
    },
    created:{
        type : Date,
        default :Date.now()
   },
   deadline :{
       type:Date
   }

})
module.exports = mongoose.model("Post",PostSchema)
