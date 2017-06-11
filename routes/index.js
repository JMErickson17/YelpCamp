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
    User.register(newUser, req.body.password, function (err, account) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        });
    });
});

// SHOW - Shows login form
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
    res.redirect("/campgrounds");
});


/* -------------------- Middleware -------------------- */

// Middleware function to determine if the user is logged in using
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;