var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");



router.get("/",function(req,res) {
    res.render("home.ejs");
})

router.get("/register",function(req,res) {
    res.render("register.ejs");
})

router.post("/register",function(req,res) {
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err)
            req.flash("error",err.message)
            return res.render("register.ejs")
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to Yelp-Camp");
            res.redirect("/campgrounds")
        })
    })
})


router.get("/login",function(req,res) {
    res.render("login.ejs");
})



router.post('/login', (req, res) => passport.authenticate('local',
 { successRedirect: '/campgrounds', failureRedirect: '/login', })
 (req, res));





router.get("/logout",function(req,res) {
    req.logout();
    req.flash("success","Logged You Out")
    res.redirect("/campgrounds");
})






module.exports = router;