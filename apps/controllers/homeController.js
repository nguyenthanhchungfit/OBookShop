var customerModel = require("../models/customerModel");
var categoryModel = require("../models/categoryModel");
var bookModel = require("../models/bookModel");
var validator = require("../helpers/validator");
var pw_encrypt = require("../helpers/password_encryption");


exports.index = function(req, res){
    res.render("home.ejs");
}

exports.get_signup = function(req, res){
    res.render("signup", {data: {}});
}

exports.post_signup = function(req, res){
    //*********** Xử lý dữ liệu từ client
    var body = req.body;
    var repassword = body.repassword.trim();
    var pw_encode =  pw_encrypt.encrypt_password(body.password);
    var sex = (body.gioi_tinh == "nam")? 0 : 1;
    var customer = {
        username : body.username.trim(),
        password : body.password.trim(),
        ho_ten : body.ho_ten.trim(),
        email : body.email.trim(),
        so_dien_thoai : body.so_dien_thoai,
        gioi_tinh : sex,
        dia_chi : body.dia_chi,
        image_url : "default.jpg",
        diem_tich_luy : 0
    }

    var deter_user = -1;
    var deter_phone = -1;
    var deter_email = - 1;

    //**********8 Xử lý lỗi
    var error = "";

    // 1.1 Xử lý username
    if(customer.username.length == 0){
        error += "Chưa nhập tài khoản</br>";
    }else{
        if(customerModel.checkUserIsExisted(customer.username)){
            console.log("done");
            error += "Tài khoản này đã tồn tại</br>";
        }
    }

    // 1.2 Xử lý password
    if(customer.password.length == 0){
        error += "Chưa nhập password</br>";
    }else if(customer.password != repassword){
        error += "Hai mật khẩu chưa khớp</br>";
    }

    // 1.3 Xử lý email
    if(customer.email.length == 0){
        error += "Chưa nhập email</br>";
    }else{
        if(!validator.validateEmail(customer.email)){
            error += "Email không hợp lệ!</br>";
        }
        else{
            if(customerModel.checkEmailIsExisted(customer.email)){
                error += "Email này đã tồn tại</br>";
            }
        }     
    }

    // 1.4 Xử lý phone
    if(customer.so_dien_thoai.length == 0){
        error += "Chưa nhập số điện thoại</br>";
    }else{
        if(!validator.validatePhone(customer.so_dien_thoai)){
            error += "Số điện thoại không hợp lệ!</br>";
        }else{
            if(customerModel.checkPhoneNumberIsExisted(customer.so_dien_thoai)){
                error += "Số điện thoại này đã tồn tại</br>";
            }
        }
    }

    // 1.5 Xử lý họ tên
    if(customer.ho_ten.length == 0){
        error += "Chưa nhập họ tên</br>";
    }

    //******** Xử lý kết quả trả về 

    if(error != ""){
        res.render("signup", {data:{error : error}});
    }else{
        customer.password = pw_encrypt.encrypt_password(customer.password);
        customerModel.addNewCustomer(customer).then(function(data){
            res.redirect("login");
        }).catch(function(err){
            res.render("signup", {data:{error : "Đăng ký thất bại!"}});
        }); 
    }
    
}

exports.get_login = function(req, res){
    res.render("login");
}

