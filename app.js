var express = require("express");
var bodyParser = require("body-parser")
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var flash = require("connect-flash")
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var passportLocalStrategy = require("passport-local-mongoose");
var User = require("./models/user");

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")



// seedDB();

mongoose.connect("Put Db String here",{ useNewUrlParser: true, useUnifiedTopology: true })




var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))
app.use(flash());

app.use(require("express-session")({
    secret:"vikram santosh shinde",
    resave:false,
    saveUninitialized:false
}));



app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");

    next();
})


app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(3000,function() {
    console.log("Server is listening on port 3000");
})