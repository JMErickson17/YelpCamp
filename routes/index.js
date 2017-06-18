/* This file contains general and authentication routes.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

// INDEX - Shows the landing page
router.get("/", function (req, res) {
    res.render("landing");
});

/* -------------------- Auth Routes -------------------- */

// SHOW - Show register form
router.get("/register", function (req, res) {
    res.render("register");
});

// CREATE - Creates a new user and handles all sign up logic
router.post("/register", function (req, res) {
    var newUser = User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function () {
            console.log(user);
            req.flash("success", "Welcome to YelpCamp, " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// SHOW - Shows login form
/* By passing in req.flash("error") to message renders the error message inside flash if it exists
* The value of the flash error is then displayed in the view */
router.get("/login", function (req, res) {
    res.render("login");
});

// Authenticates a user using middleware from passport-local-mongoose
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {

});

// Logout logic
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged out.");
    res.redirect("/campgrounds");
});

module.exports = router;