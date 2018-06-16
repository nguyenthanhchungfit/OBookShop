var customerModel = require("../models/customerModel");

exports.index = function(req, res){
    var user = req.session.user;
    if(!user){
        res.redirect("login");
    }else{
        var image_link = "static/imgs/users/customer/" + user.username + ".jpg";
        res.render("customer/index", {data : {user : user, image_link : image_link}}); 
    }
}

exports.logout = function(req, res){
    req.session.user = null;
    res.redirect("../");
}
