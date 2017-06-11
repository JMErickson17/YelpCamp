/* Routes used to show and add comments to campgrounds */

// Passing the mergeParams object into the router object will merge the params from the campgrounds and comments so :id can be accessed
var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// NEW - Show form to add comment to a specific campground
router.get("/new", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// CREATE - Creates a new comment and adds it to the comments array of the specified campground
router.post("/", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // Add username and ID to comment to associate a user with a comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

/* SHOW edit page for comments */
router.get('/:comment_id/edit', middleware.verifyCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render('comments/edit', { campground_id: req.params.id, comment: comment });
        }
    });
});

/* PUT - Update a specified comment */
router.put('/:comment_id', middleware.verifyCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
});

/* DESTROY - Delete a specified comment */
router.delete('/:comment_id', middleware.verifyCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
       if (err) {
           res.redirect("back");
       } else {
           res.redirect('/campgrounds/' + req.params.id);
       }
    });
});

module.exports = router;