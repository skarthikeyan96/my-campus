const mongoose = require("mongoose");
const announceSchema = mongoose.Schema({
    heading : String,
    description : String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        fullname: String
    },
    Posted : {
        type : Date,
        default : Date.now()
    }
});
module.exports = mongoose.model("Announce",announceSchema);