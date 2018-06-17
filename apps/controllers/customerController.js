var customerModel = require("../models/customerModel");

exports.index = function(req, res){
    res.redirect("/customer/dashboard");
}


exports.dashboard = function(req, res){
    var user = req.session.user;
    if(!user){
        res.redirect("../login");
    }else{
        customerModel.getImageUrlByUsername(user.username).then(function(userimg){
            var image_link = "../static/imgs/users/customer/" + userimg.user.image_url;
            res.render("customer/index", {data : {user : user, image_link : image_link}});
        });
    }
}

exports.information = function(req, res){

    var user_session = req.session.user;
    if(!user_session){
        res.redirect("../login");
    }else{
        customerModel.getInforCustomerByUsername(user_session.username).then(function(user){
            var image_link = "../static/imgs/users/customer/" + user.user.image_url;
            if(user.user.gioi_tinh == 0){
                user.user.gioi_tinh = "Nam";
            }else{
                user.user.gioi_tinh = "Nữ";
            }
            res.render("customer/information", {data : {user : user.user, image_link : image_link}});
        }).catch(function(err){
            res.send(err);
        });    
    }
}

exports.edit_information = function(req, res){
    var user_session = req.session.user;
    if(!user_session){
        res.redirect("../login");
    }else{
        customerModel.getInforCustomerByUsername(user_session.username).then(function(user){
            var select = {nam : '', nu : ''};
            if(user.user.gioi_tinh == 0){
                select.nam = 'selected';
            }else{
                select.nu = 'selected';
            }
            var image_link = "../static/imgs/users/customer/" + user.user.image_url;
            res.render("customer/edit_information", {data : {user : user.user, image_link : image_link, select : select}}); 
        }).catch(function(err){
            res.send(err);
        }); 
    }
}

exports.edit_information_post = function(req, res){
    var user_session = req.session.user;
    if(!user_session){
        res.redirect("../login");
    }else{
        var user_body = {
            email : req.body.email.trim(),
            ho_ten : req.body.ho_ten.trim(),
            gioi_tinh : req.body.gioi_tinh,
            so_dien_thoai : req.body.so_dien_thoai.trim(),
            dia_chi : req.body.dia_chi.trim()
        };

        if(user_body.gioi_tinh == "nam"){
            user_body.gioi_tinh = 0;
        }else{
            user_body.gioi_tinh = 1;
        }

        customerModel.getInforCustomerByUsername(user_session.username).then(function(user){
            var user_real = user.user;
            var image_link = "../static/imgs/users/customer/" + user.user.image_url;

            var select = {nam : '', nu : ''};
            if(user.user.gioi_tinh == 0){
                select.nam = 'selected';
            }else{
                select.nu = 'selected';
            }

            var success = "Cập nhật thành công!";
            var esuccess = "Cập nhật thất bại!";

            if(user_real.email == user_body.email && user_real.ho_ten == user_body.ho_ten
                && user_real.gioi_tinh == user_body.gioi_tinh && user_real.so_dien_thoai ==
                user_body.so_dien_thoai && user_real.dia_chi == user_real.dia_chi){
                    
                    res.render("customer/edit_information", {data : {user : user.user, image_link : image_link, select : select, success : success}}); 
            }else{
                var err = "";
                if(user_real.email != user_body.email){
                    if(customerModel.checkEmailIsExistedWithUsername(user_real.username, user_body.email)){
                        err += "<br/>Email này đã tồn tại!";
                    }
                }

                if(user_real.so_dien_thoai != user_body.so_dien_thoai){
                    if(customerModel.checkPhoneNumberIsExistedWithUsername(user_real.username, user_body.so_dien_thoai)){
                        err += "<br/>Số điện thoại này đã tồn tại!";
                    }
                }

                if(err != ""){
                    res.render("customer/edit_information", {data : {user : user.user, image_link : image_link, select : select, esuccess : esuccess}}); 
                }else{
                    customerModel.updateNewInformation(user_real.username, user_body).then(function(isSuccess){
                        user.user.email = user_body.email;
                        user.user.ho_ten = user_body.ho_ten;
                        user.user.gioi_tinh = user_body.gioi_tinh;
                        user.user.so_dien_thoai = user_body.so_dien_thoai;
                        user.user.dia_chi = user_body.dia_chi;

                        console.log("user new", user.user);

                        if(user.user.gioi_tinh == 0){
                            select.nam = 'selected';
                        }else{
                            select.nu = 'selected';
                        }
                        res.render("customer/edit_information", {data : {user : user.user, image_link : image_link, select : select, success : success}});
                    }).catch(function(err){
                        res.send(err);
                    })
                }

            }        
        }).catch(function(err){
            res.send(err);
        });    
    }
}

exports.change_password = function(req, res){
    var user = req.session.user;
    if(!user){
        res.redirect("../login");
    }else{
        var image_link = "../static/imgs/users/customer/" + user.username + ".jpg";
        res.render("customer/change_password", {data : {user : user, image_link : image_link}}); 
    }
}

exports.change_password_post = function(req, res){
    var user_session = req.session.user;
    if(!user_session){
        res.redirect("../login");
    }else{
        var old_password = req.body.old_password.trim();
        var new_password = req.body.new_password.trim();
        var re_new_password = req.body.re_new_password.trim();
        var image_link = "../static/imgs/users/customer/" + user_session.username + ".jpg";
        var error = "";
        console.log("Vo day");
        customerModel.isValidAccount(user_session.username, old_password).then(function(isTrue){
            if(isTrue == false){
                error = "Mật khẩu cũ không đúng";
                res.render("customer/change_password", {data : {error: error, user : user_session, image_link : image_link}}); 
            }else{
                if(new_password != re_new_password){
                    error = "Hai mật khẩu mới không khớp nhau";
                    res.render("customer/change_password", {data : {error: error, user : user_session, image_link : image_link}}); 
                }else{
                    customerModel.updateNewPassword(user_session.username, new_password).then(function(isSuccess){
                        if(isSuccess){
                            var success = "Cập nhật thành công!";
                            res.render("customer/change_password", {data : {success : success, user : user_session, image_link : image_link}}); 
                        }else{
                            var esuccess = "Cập nhật thất bại!";
                            res.render("customer/change_password", {data : {esuccess : esuccess, user : user_session, image_link : image_link}}); 
                        }
                    })
                    
                }
            }
        }).catch(function(err){
            res.rend(err);
        })
         
    }
}

exports.orders = function(req, res){
    var user = req.session.user;
    if(!user){
        res.redirect("../login");
    }else{
        var image_link = "../static/imgs/users/customer/" + user.username + ".jpg";
        res.render("customer/orders", {data : {user : user, image_link : image_link}}); 
    }
}

exports.logout = function(req, res){
    req.session.user = null;
    res.redirect("../../");
}
