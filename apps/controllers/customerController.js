var customerModel = require("../models/customerModel");

exports.index = function(req, res){
    res.redirect("/customer/dashboard");
}


exports.dashboard = function(req, res){
    var user = req.session.user;
    if(!user){
        res.redirect("../login");
    }else{
        var image_link = "../static/imgs/users/customer/" + user.username + ".jpg";
        res.render("customer/index", {data : {user : user, image_link : image_link}}); 
    }
}

exports.information = function(req, res){

    var user_session = req.session.user;
    if(!user_session){
        res.redirect("login");
    }else{
        customerModel.getInforCustomerByUsername(user_session.username).then(function(user){
            var image_link = "../static/imgs/users/customer/" + user.user.username + ".jpg";
            console.log(user);
            res.render("customer/information", {data : {user : user.user, image_link : image_link}});
        }).catch(function(err){

        });    
    }
}

exports.edit_information = function(req, res){
    res.send("edit_information");
}

exports.change_password = function(req, res){
    res.send("change_password");
}

exports.orders = function(req, res){
    res.send("orders");
}

exports.logout = function(req, res){
    req.session.user = null;
    res.redirect("../../");
}
