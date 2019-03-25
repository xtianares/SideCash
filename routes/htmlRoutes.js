var db = require("../models");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        res.render("index", {
            msg: "Welcome!"
        });
    });

    // find all gigs
    app.get("/gigs", function(req, res) {
        db.Gig.findAll({
            where: {},
            include: [db.User]
        })
        .then(function(dbGigs) {
            res.render("gigs", { gigs: dbGigs });
        });
    })

    // display single gig info
    app.get("/gig/:id", function(req, res) {
        db.Gig.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(dbGig) {
            res.render("gig-info", { gig: dbGig});
        });
    });

    // display single gig info
    app.get("/update-gig/:id", function(req, res) {
        db.Gig.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(dbGig) {
            res.render("update-gig", { gig: dbGig}); // use info here to prepopulate form
        });
    });

    // display user info
    app.get("/user/:id", function(req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [
                { model: db.Gig },
                { model: db.Rating }
            ]
        })
        .then(function(dbUser) {
            res.render("user-profile", { user: dbUser});
        });
    });

    // display user info
    app.get("/post-gig", function(req, res) {
        res.render("post-gig", { msg: "Post new gig!" });
    });

    // login page
    app.get("/login", function(req, res) {
        res.render("login", { msg: "Login to use our app!" });
    });

    // signup page
    app.get("/signup", function(req, res) {
        res.render("signup", { msg: "Signup to use our app!" });
    });

    // all other page
    // app.get("/:page", function(req, res) {
    //     res.render(req.params.page, { msg: "This is our app!" });
    // });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};
