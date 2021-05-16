var express = require("express");
var Campground = require("../models/campground");
var Comment = require("../models/comment")
var router = express.Router();
var middleware = require("../middleware/")


router.get("/",function(req,res) {
    
    // res.render("campgrounds.ejs",{campgrounds:campgrounds});
    Campground.find({},function(err,campgrounds) {
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/campgrounds.ejs",{campgrounds:campgrounds,currentUser:req.user});
        }
    })
})

router.post("/",middleware.isLoggedIn,function(req,res) {
    var name = req.body.name;
    var img = req.body.img;
    var desc = req.body.desc;
    var author = {
        id:req.user._id,
        username:req.user.username
    }
    var camp = {name:name,image:img,description:desc,author:author};
    // campgrounds.push(camp);
    Campground.create(
        camp,
        function(err,campground) {
            if(err){
                console.log(err);
            }
            else{
                res.redirect("/campgrounds");
            }
        }
    )





    
})

router.get("/new",middleware.isLoggedIn,function(req,res) {
    res.render("campgrounds/new.ejs");
})



router.get("/:id",function(req,res) {
    // res.send("this will be the show page");
    Campground.findById(req.params.id).populate("comments").exec(function(err,campground) {
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show.ejs",{campground:campground});
        }
    })
})



router.get("/:id/edit",middleware.check,function(req,res) {

        Campground.findById(req.params.id,function(err,campground) {
        
            res.render("campgrounds/edit.ejs",{campground:campground});
        });
});



router.post("/:id",middleware.check,function(req,res) {
    var name = req.body.name;
    var img = req.body.img;
    var desc = req.body.desc;
    var camp = {name:name,image:img,description:desc};
    Campground.findByIdAndUpdate(req.params.id,camp,function(err,campground) {
        if(err){
            res.redirect("/campgrounds")
        }
        else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    })
    
})




router.delete("/:id",middleware.check,function(req,res) {
    Campground.findByIdAndRemove(req.params.id,function(err,campground) {
        if(err){
            res.redirect("/campgrounds")
        }
        else{
            res.redirect("/campgrounds")
        }
    })
    
})










module.exports = router;