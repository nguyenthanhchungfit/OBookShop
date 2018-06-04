var customerModel = require("../models/customerModel");

exports.index = function(req, res){
    var user = req.session.user;
    if(!user){
        res.redirect("login");
    }else{
        res.render("customer/index", {user : user}); 
    }
}

exports.logout = function(req, res){
    req.session.user = null;
    res.redirect("../login");
}
