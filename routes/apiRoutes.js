var db = require("../models");

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
            where: { id: req.body.userId } // need to grab this from cookie or somewhere else...
        })
        .then(function(userData) {
            // console.log(data);
            if(data){
                db.Gig.create({
                    title: req.body.title,
                    description: req.body.description,
                    date_needed: req.body.dateNeeded,
                    amount_offered: req.body.amountOffered,
                    location: req.body.location,
                    category: req.body.category,
                    UserId: userData.id
                })
                .then(function (gigData) {
                    res.json(gigData).end();
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
        db.User.create({
            username: req.body.username,
            fullname: req.body.fullname,
            password: req.body.password,
            email: req.body.fullname,
            phone: req.body.fullname,
            location: req.body.location
        })
        .then(function (userData) {
            res.json(userData).end();
        });
    });

    // Create a new user
    app.post("/api/rating/:userId", function (req, res) {
        db.User.findOne({
            where: { id: req.body.userId } // grab this from the login user's info giving the rating
        })
        .then(function(userData) {
            // console.log(data);
            if(data){
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
