/*
 * This file contains the main entry point for the YelpCamp Application.
 */

var express         = require('express'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    bodyParser      = require('body-parser'),
    flash           = require('connect-flash'),
    User            = require('./models/user'),
    logger          = require('morgan'),
    LocalStrategy   = require('passport-local'),
    expressSession  = require('express-session'),
    methodOverride  = require('method-override'),
    seedDB          = require('./seeds');

var commentRoutes    = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes      = require('./routes/index');

var app = express();
var port = process.env.PORT || 3000;

/* Creates or connects to the database */
mongoose.connect("mongodb://localhost/yelp_camp");

/* -------------------- Express Configuration -------------------- */

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(logger('dev'));

//seedDB();

/* -------------------- Passport Configuration -------------------- */

app.use(expressSession({
    secret: "The passphrase to encode and decode the session",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* Passing req.user into res.locals.currentUser makes the current user available to all templates as currentUser.
 * Adding error and success into res.locals makes the flash variables available in all views.
 */
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

/* -------------------- Route Config -------------------- */

/* By passing a String with the route prefixes, express will append the string to the beginning of the route */
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(indexRoutes);

/* -------------------- Server -------------------- */

app.listen(port, function () {
    console.log("Server starting on port " + port);
});