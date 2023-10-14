const mongoose = require("mongoose")
const validator = require("validator")
const userModel = mongoose.model("task", {
    title: {
        type: String
    },
    content: {
        type: String
    },
    date: {
        type: String,
    },
    status: {
        type: String,
        default: false
    }
})

module.exports = userModel