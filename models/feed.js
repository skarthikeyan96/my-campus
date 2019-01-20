const mongoose = require("mongoose");
const FeedSchema = new mongoose.Schema({
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
        fullname : String
    },
    created:{
        type : Date,
        default :Date.now()
   }
})
module.exports = mongoose.model("Feed",FeedSchema)
