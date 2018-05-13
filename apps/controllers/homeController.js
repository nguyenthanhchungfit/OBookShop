var customerModel = require("../models/customerModel");
var categoryModel = require("../models/categoryModel");
var bookModel = require("../models/bookModel");
var validator = require("../helpers/validator");

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

    console.log(customer);

    var deter_user = -1;
    var deter_phone = -1;
    var deter_email = - 1;

    //**********8 Xử lý lỗi
    var error = "";

    // 1.1 Xử lý username
    if(customer.username.length == 0){
        error += "Chưa nhập tài khoản</br>";
    }else{
        var isExisted = customerModel.checkUserIsExisted(customer.username).then(function(data){
            if(data){
                error += "Tài khoản này đã tồn tại</br>";
                deter_user = data;
                console.log(deter_user);
            }
        });
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
            var isExisted = customerModel.checkEmailIsExisted(customer.email).then(function(data){
                if(data){
                    error += "Email này đã tồn tại</br>";
                    deter_email = data;
                    console.log(deter_email);
                }
            });
        }     
    }

    // 1.4 Xử lý phone
    if(customer.so_dien_thoai.length == 0){
        error += "Chưa nhập số điện thoại</br>";
    }else{
        if(!validator.validatePhone(customer.so_dien_thoai)){
            error += "Số điện thoại không hợp lệ!</br>";
        }else{
            var isExisted = customerModel.checkPhoneNumberIsExisted(customer.so_dien_thoai).then(function(data){
                if(data){
                    error += "Số điện thoại này đã tồn tại</br>";
                    deter_phone = data;
                    console.log(deter_phone);
                }
            });
        }
    }

    // 1.5 Xử lý họ tên
    if(customer.ho_ten.length == 0){
        error += "Chưa nhập họ tên</br>";
    }

    //******** Xử lý kết quả trả về 


    while(deter_email == -1 || deter_user == -1 || deter_phone == -1);

    console.log("Before xử lý kq trả về");
    if(error != ""){
        res.render("signup", {data:{error : error}});
    }else{
        var res = customerModel.addNewCustomer(customer);
        if(!res){
            res.render("signup", {data:{error : "Đăng ký thất bại!"}});
        }else{
            res.render("signup", {data:{success : "Đăng ký thành công!"}});
        }
    }
    
}


