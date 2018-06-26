const customerModel = require("../models/customerModel");
const staffModel = require("../models/staffModel");
const orderModel = require("../models/orderModel");
const url = require("url");
exports.index = function (req, res) {
    res.render("manager/index");
}

exports.getTop10Book = function (req, res) {
    orderModel.top10Book().then(function (data) {
        console.log(data);
        res.render("manager/top10", { items: data.arr });
    }).catch(function (err) {
        res.send(err);
    });
}
exports.getDanhSachNhanVien = function (req, res) {
    staffModel.getInforDanhSachNhanvien().then(function (data) {
        console.log(data);
        res.render("manager/account_staff", { items: data.arr });
    }).catch(function (err) {
        res.send(err);
    });
}
exports.edit_customer_information = function (req, res) {
    // Lấy đường link trang web
    var web = req.url;
    var q = url.parse(web, true);
    // Lấy tham số username
    var qdata = q.query;
    console.log(qdata.username);
    customerModel.getInforCustomerByUsername(qdata.username).then(function (user) {
        var select = { nam: '', nu: '' };
        if (user.user.gioi_tinh == 0) {
            select.nam = 'selected';
        } else {
            select.nu = 'selected';
        }
        var image_link = "../static/imgs/users/customer/" + user.user.image_url;
        res.render("manager/edit_customer_information", { data: { username: qdata.username, user: user.user, image_link: image_link, select: select } });
    }).catch(function (err) {
        res.send(err);
    });
}

exports.edit_customer_information_post = function (req, res) {
    var user_body = {
        email: req.body.email.trim(),
        ho_ten: req.body.ho_ten.trim(),
        gioi_tinh: req.body.gioi_tinh,
        so_dien_thoai: req.body.so_dien_thoai.trim(),
        dia_chi: req.body.dia_chi.trim()
    };

    if (user_body.gioi_tinh == "nam") {
        user_body.gioi_tinh = 0;
    } else {
        user_body.gioi_tinh = 1;
    }
    // Lấy đường link trang web
    var web = req.url;
    var q = url.parse(web, true);
    // Lấy tham số username
    var qdata = q.query;
    console.log(qdata.username);
    customerModel.getInforCustomerByUsername(qdata.username).then(function (user) {
        var user_real = user.user;
        var image_link = "../static/imgs/users/customer/" + user.user.image_url;

        var select = { nam: '', nu: '' };
        if (user.user.gioi_tinh == 0) {
            select.nam = 'selected';
        } else {
            select.nu = 'selected';
        }

        var success = "Cập nhật thành công!";
        var esuccess = "Cập nhật thất bại!";

        if (user_real.email == user_body.email && user_real.ho_ten == user_body.ho_ten
            && user_real.gioi_tinh == user_body.gioi_tinh && user_real.so_dien_thoai ==
            user_body.so_dien_thoai && user_real.dia_chi == user_body.dia_chi) {

            res.render("manager/edit_customer_information", { data: { username: qdata.username, user: user.user, image_link: image_link, select: select, success: success } });
        } else {
            var err = "";
            if (user_real.email != user_body.email) {
                if (customerModel.checkEmailIsExistedWithUsername(user_real.username, user_body.email)) {
                    err += "<br/>Email này đã tồn tại!";
                }
            }

            if (user_real.so_dien_thoai != user_body.so_dien_thoai) {
                if (customerModel.checkPhoneNumberIsExistedWithUsername(user_real.username, user_body.so_dien_thoai)) {
                    err += "<br/>Số điện thoại này đã tồn tại!";
                }
            }
            if (err != "") {
                res.render("manager/edit_customer_information", { data: { username: qdata.username, user: user.user, image_link: image_link, select: select, esuccess: esuccess, err: err } });
            } else {
                customerModel.updateNewInformation(user_real.username, user_body).then(function (isSuccess) {
                    user.user.email = user_body.email;
                    user.user.ho_ten = user_body.ho_ten;
                    user.user.gioi_tinh = user_body.gioi_tinh;
                    user.user.so_dien_thoai = user_body.so_dien_thoai;
                    user.user.dia_chi = user_body.dia_chi;

                    console.log("user new", user.user);
                    //Khi đổi Nam sang Nữ, thì select.nu = 'selected'. Sau đó đổi Nữ sang Nam thì Nữ đã select rồi.
                    select.nam = '';
                    select.nu = '';
                    if (user.user.gioi_tinh == 0) {
                        select.nam = 'selected';
                    } else {
                        select.nu = 'selected';
                    }
                    res.render("manager/edit_customer_information", { data: { username: qdata.username, user: user.user, image_link: image_link, select: select, success: success } });
                }).catch(function (err) {
                    res.send(err);
                })
            }

        }
    }).catch(function (err) {
        res.send(err);
    });
}
exports.getDanhSachKhachHang = function (req, res) {
    customerModel.getInforDanhSachNguoiDung().then(function (data) {
        console.log(data);
        data.arr.forEach(function (i) {
            if (i.gioi_tinh == 0) {
                i.gioi_tinh = "Nam";
            } else {
                i.gioi_tinh = "Nữ";
            }
        });
        res.render("manager/account_customer", { items: data.arr });
    }).catch(function (err) {
        res.send(err);
    });
}
