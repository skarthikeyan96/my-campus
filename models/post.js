const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    heading : String,
    description : String,
    comments : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
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
   }

})
module.exports = mongoose.model("Post",PostSchema)
