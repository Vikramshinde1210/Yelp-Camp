var Campground = require("../models/campground");
var Comment = require("../models/comment")

var middlewareObj = {}

middlewareObj.check = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,campground) {
            if(err){
                req.flash("error","Campground Not Found")
                res.redirect("back")
            }
            else{
                if(campground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","You don't have permission to do that")
                    res.redirect("back")
                }
                
            }
        })
    } else{
        req.flash("error","You Need To Be Logged In To Do That")
        res.redirect("back")
    }
}


middlewareObj.checkComment = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,comment) {
            if(err){
                res.redirect("back")
            }
            else{
                if(comment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","You don't have permission to do that")
                    res.redirect("back")
                }
                
            }
        })
    } else{
        req.flash("error","You Need To Be Logged In To Do That")
        res.redirect("back")
    }
}


middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You Need To Be Logged In To Do That")
    res.redirect("/login")
}


module.exports = middlewareObj