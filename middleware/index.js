var Campground = require('../models/campground');
var Comment = require('../models/comment');

var middlewareMethods = {};

middlewareMethods.verifyCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, campground) {
            if (err) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if (campground.author.id && campground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("Permission Denied.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Login.");
        res.redirect("back");
    }
};

middlewareMethods.verifyCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, comment) {
            if (err) {
                res.redirect("back");
            } else {
                if (comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("Permission Denied.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Login.");
        res.redirect("back");
    }
};

middlewareMethods.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login.");
    res.redirect("/login");
};


module.exports = middlewareMethods;