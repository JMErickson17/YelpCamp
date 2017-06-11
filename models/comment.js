/* This file defines the comment Schema and model for storing comments in the database then exports the model. */

var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);