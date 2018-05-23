const customerModel = require("../models/customerModel");
const staffModel = require("../models/staffModel");

exports.index = function(req, res){
    res.render("manager/index");
}


exports.getDanhSachNhanVien = function(req, res){
    staffModel.getInforDanhSachNhanvien().then(function(data){
        console.log(data);
        res.render("manager/account_customer", {items: data.arr});
    }).catch(function(err){
        res.send(err);
    }); 
}

exports.getDanhSachKhachHang = function(req, res){
    customerModel.getInforDanhSachNguoiDung().then(function(data){
        console.log(data);
        res.render("manager/account_customer", {items: data.arr});
    }).catch(function(err){
        res.send(err);
    }); 
}
