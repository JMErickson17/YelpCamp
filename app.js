/*
 * This file contains the main entry point for the YelpCamp Application.
 */

var express         = require('express'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    bodyParser      = require('body-parser'),
    User            = require('./models/user'),
    LocalStrategy   = require('passport-local'),
    expressSession  = require('express-session'),
    methodOverride  = require('method-override'),
    seedDB          = require('./seeds');

var commentRoutes    = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes      = require('./routes/index');

var app = express();

// Creates or connects to the database
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

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

// By passing req.user into res.locals.currentUser it makes the current user available to all templates
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

/* -------------------- Route Config -------------------- */

// By passing a String with the route prefixes, express will append the string to the beginning of the route
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(indexRoutes);

/* -------------------- Server -------------------- */

app.listen(3000, function () {
    console.log("Server starting on port 3000...");
});