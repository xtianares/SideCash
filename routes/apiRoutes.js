var db = require("../models");
var Op = db.Op; // needed for operators

module.exports = function(app) {
    // Get all gigs
    app.get("/api/gigs", function(req, res) {
        db.Gig.findAll({
            where: {},
            include: [db.user]
        })
        .then(function(dbGigs) {
            res.render("index", { gigs: dbGigs });
        });
    });

    // Get one gig
    app.get("/api/gig/:id", function(req, res) {
        db.Gig.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(dbGigs) {
            res.json(dbGigs);
        });
    });

    // Create a new gig
    app.post("/api/gig/create", function (req, res) {
        // if user exits, use ID
        db.User.findOne({
            where: { username: req.body.username } // need to grab this from cookie or somewhere else...
        })
        .then(function(userData) {
            // console.log(data);
            if(userData){
                db.Gig.create({
                    title: req.body.title,
                    description: req.body.description,
                    date_needed: req.body.date_needed,
                    amount_offered: req.body.amount_offered,
                    location: req.body.location,
                    category: req.body.category,
                    UserId: userData.id
                })
                .then(function (gigData) {
                    res.json(gigData).end();
                    // res.redirect("/gig-info/" + gigData.id);
                });
            }
            // if user does not exist
            else {
                res.redirect("/login");
            }
        });
    });

    // update gig info
    app.put("/api/gig/update/:id", function (req, res) {
        // if user exits, use ID
        db.Gig.update({
            title: req.body.title,
            description: req.body.description,
            date_needed: req.body.dateNeeded,
            amount_offered: req.body.amountOffered,
            location: req.body.location,
            category: req.body.category,
            UserId: userData.id
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(function (gigData) {
            res.json(gigData).end();
        });
    });

    // Create a new user
    app.post("/api/user/create", function (req, res) {
        db.User.findOne({
            where: { username: req.body.username } // need to grab this from cookie or somewhere else...
        })
        .then(function(userData) {
            // console.log(data);
            if(userData){
                let err = {
                    error: "Username already taken!"
                };
                res.json(err).end();
            }
            // if user does not exist create user
            else {
                db.User.create({
                    username: req.body.username,
                    fullname: req.body.fullname,
                    password: req.body.password,
                    email: req.body.email,
                    phone: req.body.phone,
                    location: req.body.location
                })
                .then(function (userData) {
                    res.json(userData).end();
                    // res.redirect("/user/" + userData.id);
                })
            }
        });
    });

    // user login
    app.post("/api/user/login", function (req, res) {
        db.User.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        })
        .then(function(userData) {
            // console.log(data);
            if(userData){
                res.json(userData).end();
            }
            // if user does not exist
            else {
                let err = {
                    error: "Please check your username and password."
                };
                res.json(err).end();
            }
        });
    });


    // add new rating for user
    app.post("/api/rating/:userId", function (req, res) {
        db.User.findOne({
            where: { id: req.body.userId } // grab this from the login user's info giving the rating
        })
        .then(function(userData) {
            // console.log(data);
            if(userData){
                db.rating.create({
                    rating: req.body.rating,
                    UserId: req.params.userId
                })
                .then(function (ratingData) {
                    res.json(ratingData).end();
                });
            }
            // if user does not exist
            else {
                res.redirect("/login");
            }
        });
    });

    // Delete a gig by id
    app.delete("/api/gig/:id", function(req, res) {
        db.Gig.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(dbGigs) {
            res.json(dbGigs);
        });
    });
};
