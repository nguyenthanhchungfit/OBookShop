
exports.index = function(req, res){
    // if(req.session.user != null){
    //     if(req.session.user.type == 2){
    //         res.render("staff/index", {data: req.session.user.username});
    //     }
    //     else{
    //         res.redirect("/login");
    //     }
    // }
    // else{
    //     res.redirect("/login");
    // }
    res.render("staff/index");
}

