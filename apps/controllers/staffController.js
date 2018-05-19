var publisherModel = require("../models/publisher")


exports.index = function(req, res){
    res.send("Staff Controller");
}

exports.get_create_publisher = function(req, res){
    res.render("create_publisher", {data: {}});
}

exports.post_create_publisher = function(req, res){
    //*********** Xử lý dữ liệu từ client
    var body = req.body;

    var publisher = {
        ten_nxb : body.ten_nxb.trim(),
        nam_thanh_lap : body.nam_thanh_lap,
        dia_chi: body.dia_chi
    }

    console.log(publisher);

    var deter_ten = -1;

    //**********8 Xử lý lỗi
    var error = "";

    // 1.1 Xử lý tên nhà xuất bản
    if(publisher.ten_nxb.length == 0){
        error += "Chưa nhập tên nhà xuất bản</br>";
    }else{
        var isExisted = publisherModel.checkNameIsExisted(publisher.ten_nxb).then(function(data){
            if(data){
                error += "Tên nhà xuất bản này đã tồn tại</br>";
                deter_ten = data;
                console.log(deter_ten);
            }
        });
    }

    //******** Xử lý kết quả trả về 
    //while(deter_email == -1 || deter_user == -1 || deter_phone == -1);

    console.log("Before xử lý kq trả về");
    if(error != ""){
        res.render("create_publisher", {data:{error : error}});
    }else{
        var check = publisherModel.addNewPublisher(publisher);
        if(!check){
            res.render("create_publisher", {data:{error : "Tạo mới nhà xuất bản thất bại!"}});
        }else{
            res.render("create_publisher", {data:{success : "tạo mới nhà xuất bản thành công!"}});
        }
    }
    
}