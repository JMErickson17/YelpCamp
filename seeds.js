var mongoose = require('mongoose');
var Comment = require('./models/comment');
var Campground = require('./models/campground');

var data = [
    {
        name: "Clouds Rest",
        image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Payne's Prairie",
        image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Desert Mesa",
        image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];

/* The loop to add campgrounds is placed inside the callback function to be sure that the data is fully removed before
 * adding in the new data. Otherwise the order of removing and adding campgrounds would be unpredictable
 */

function seedDB() {
    // Remove all campgrounds from database
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed campgrounds");

        //Add campgrounds from the data array into the database
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Campground added");
                    // Create a comment
                    Comment.create(
                        {
                            text: "This place is great but wish there was internet",
                            author: "Homer"
                        }, function (err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;