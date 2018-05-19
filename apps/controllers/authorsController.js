var authorModel = require("../models/authorModel");
var url = require("url");

exports.author_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Author List');
};

exports.get_create_author = function(req, res){
    res.render("create_author", {data: {}});
}

exports.post_create_author = function(req, res){
    //*********** Xử lý dữ liệu từ client
    var body = req.body;

    var author = {
        id : body.id.trim(),
        ten : body.ten.trim(),
        nam_sinh : body.nam_sinh,
        que_quan: body.que_quan.trim()
    }

    console.log(author);

    var deter_id = -1;

    //**********8 Xử lý lỗi
    var error = "";

    // 1.1 Xử lý ID
    if(author.id.length == 0){
        error += "Chưa nhập ID tác giả</br>";
    }else{
        var isExisted = authorModel.checkIDIsExisted(author.id).then(function(data){
            if(data){
                error += "ID này đã tồn tại</br>";
                console.log("a" + error);
                deter_id = data;
                console.log(deter_id);
            }
        });
    }

    // 1.2 Xử lý tên tác giả
    if(author.ten.length == 0){
        error += "Chưa nhập tên tác giả</br>";
    }
    //******** Xử lý kết quả trả về 
    

    console.log("Before xử lý kq trả về");
    if(error != ""){
        console.log("c" + error);
        res.render("create_author", {data:{error : error}});
    }else{
        var check = authorModel.addNewAuthor(author);
        if(!check){
            res.render("create_author", {data:{error : "Tạo mới tác giả thất bại!"}});
        }else{
            res.render("create_author", {data:{success : "tạo mới tác giả thành công!"}});
        }
    }
    
}
exports.get_update_author = function(req, res){

    // Lấy chi tiết của tác giả
    // Lấy đường link trang web
    var web = req.url;
    var q = url.parse(web, true);
    // Lấy tham số id
    var qdata = q.query;

    var id_author = authorModel.getAuthorbyID(qdata.id);
    id_author.then(function(author){
        tac_gia = author[0];
        var result;
        console.log(tac_gia);
        // Nếu nhập ID không tồn tại
        if (!tac_gia) {
            // Cho kết quả trả về rỗng và báo lỗi.
            result = {
                tac_gia: empty = {
                    ten_tac_gia : "",
                    nam_sinh : "",
                    que_quan: "",
                    
                },
                error: "Tác giả không tồn tại"
            }
            res.render("update_author", {data: result});
        }
        else {
            result = {
                tac_gia: tac_gia,
                id: qdata.id
            }
            res.render("update_author", {data: result});
        }
    })
}

exports.post_update_author = function(req, res){
    //*********** Xử lý dữ liệu từ client

    // Lấy đường link trang web
    var web = req.url;
    var q = url.parse(web, true);
    // Lấy tham số id
    var qdata = q.query;

    var body = req.body;

    var author = {
        ten : body.ten.trim(),
        nam_sinh : body.nam_sinh,
        que_quan: body.que_quan
    }

    console.log(author);

    var deter_ten = -1;

    //**********8 Xử lý lỗi
    var error = "";

    // Xử lý tên tác giả
    if(author.ten.length == 0){
        error += "Chưa nhập tên tác giả</br>";
    }

    //******** Xử lý kết quả trả về 
    //while(deter_email == -1 || deter_user == -1 || deter_phone == -1);

    console.log("Before xử lý kq trả về");
    if(error != ""){
        res.render("update_author", {data:{error : error}});
    }else{
        var check = authorModel.updateAuthor(qdata.id, author);
        if(!check){
            res.render("update_author", {data:{error : "Cập nhật tác giả thất bại!"}});
        }
    }

    // Get lại dữ liệu
    var id_author = authorModel.getAuthorbyID(qdata.id);
    id_author.then(function(au){
        tac_gia = au[0];
        var result;
        console.log(tac_gia);
        result = {
            tac_gia: tac_gia,
            success : "Câp nhật tác giả thành công",
            id: qdata.id
        }
        res.render("update_author", {data: result});
    })
}
