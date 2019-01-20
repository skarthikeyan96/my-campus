const mongoose = require("mongoose");
const ResourceSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        fullname: String
    },
    url: String,
    created: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model("Resource", ResourceSchema)
