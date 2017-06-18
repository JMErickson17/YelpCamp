/*
* This file contains the Schema and model to be used for campgrounds in the database.
*
* The comments property contains an array of comment IDs defined by "type" and the model with "ref".
*/

var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);
