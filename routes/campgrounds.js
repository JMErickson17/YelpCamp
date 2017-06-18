/* This file contains the routes for displaying and adding campgrounds
 */

var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var mongoose = require('mongoose');
var middleware = require('../middleware');

// INDEX Route - Show all campgrounds
router.get("/", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    })
});

// NEW - Show form to add a new campground
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

// CREATE - Creates a new campground in the database
router.post("/", middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: description, author: author};
    Campground.create(newCampground, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log(campground);
            res.redirect("/campgrounds");
        }
    });
});

// SHOW - Shows more info about a specified campground
router.get("/:id", function (req, res) {
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log(campground);
            res.render("campgrounds/show", { campground: campground });
        }
    });
});

// SHOW - Shows form to edit a campground
router.get('/:id/edit', middleware.verifyCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.render('campgrounds/edit', {campground: campground});
        }
    });
});

// PUT - Finds and updates a specified campground
router.put('/:id', middleware.verifyCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
});

// DESTROY - Remove the specified campground
router.delete('/:id', middleware.verifyCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    })
});

module.exports = router;