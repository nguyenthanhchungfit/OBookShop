var publisherModel = require("../models/publisherModel")
var bookModel = require("../models/bookModel")
var url = require("url")

exports.getPublisherByName = function (req, res) {
    // Lấy danh sách nxb từ tên nxb
    var ListNXB = publisherModel.getPublisherbyName(req.params.Name)

    ListNXB.then(function (nha_xuat_ban) {
        nhaxuatban = nha_xuat_ban[0]

        // Lấy danh sách sách có cùng tên nhà xuất bản
        var listSach = bookModel.getBookbyNamePublihser(req.params.Name)
        listSach.then(function (sach) {

            // Lấy danh sách nhà xuất bản
            var listNXB = publisherModel.getPublisher()
            listNXB.then(function (listNXB) {
                var user = req.session.user;
                if(!user){
                    var result = {
                        nhaxuatban: nhaxuatban,
                        sach: sach,
                        listNXB: listNXB
                    }
                    res.render("detail_publisher", { data: result })
                }else{
                    var link = "";
                    if(user.type == 1){
                        link = "/customer";
                    }else if(user.type == 2){
                        link = "/staff";
                    }else if(user.type == 3){
                        link = "/manager";
                    }
                    var result = {
                        nhaxuatban: nhaxuatban,
                        sach: sach,
                        listNXB: listNXB,
                        user: user,
                        link: link
                    }
    
                    res.render("detail_publisher", { data: result })  
                }
                
            })

        })
    })
}
exports.get_create_publisher = function (req, res) {
    res.render("create_publisher", { data: {} });
}

exports.post_create_publisher = function (req, res) {
    //*********** Xử lý dữ liệu từ client
    var body = req.body;

    var publisher = {
        ten_nxb: body.ten_nxb.trim(),
        nam_thanh_lap: body.nam_thanh_lap,
        dia_chi: body.dia_chi
    }

    console.log(publisher);


    //**********8 Xử lý lỗi
    var error = "";

    // 1 Xử lý tên nhà xuất bản
    // Nếu không có tên thì tên = "&"
    if (publisher.ten_nxb.length == 0) {
        error += "Chưa nhập tên nhà xuất bản</br>";
        publisher.ten_nxb = "&";
    }
    var isExisted = publisherModel.checkNameIsExisted(publisher.ten_nxb).then(function (data) {
        if (data) {
            error += "Tên nhà xuất bản này đã tồn tại</br>";
            console.log(data);
        }
        console.log("Before xử lý kq trả về");
        if (error != "") {
            res.render("create_publisher", { data: { error: error } });
        } else {
            var check = publisherModel.addNewPublisher(publisher);
            if (!check) {
                res.render("create_publisher", { data: { error: "Tạo mới nhà xuất bản thất bại!" } });
            } else {
                res.render("create_publisher", { data: { success: "tạo mới nhà xuất bản thành công!" } });
            }
        }
    });

}

exports.update_delete_publisher = function(req, res){
    publisherModel.getPublisher().then(function (data) {
        res.render("staff/update_delete_publisher", { items: data.arr });
    })
    
}
exports.get_update_publisher = function (req, res) {

    // Lấy chi tiết của nhà xuất bản
    // Lấy đường link trang web
    var web = req.url;
    var q = url.parse(web, true);
    // Lấy tham số id
    var qdata = q.query;
    console.log(qdata.id);
    var id_publisher = publisherModel.getPublisherbyName(qdata.id);
    id_publisher.then(function (publisher) {
        nxb = publisher[0];
        var result;
        console.log(nxb);
        // Nếu nhập ID không tồn tại
        if (!nxb) {
            // Cho kết quả trả về rỗng và báo lỗi.
            result = {
                nxb: empty = {
                    nam_thanh_lap: "",
                    dia_chi: ""
                },
                error: "Nhà xuất bản không tồn tại"
            }
            res.render("update_publisher", { data: result });
        }
        else {
            result = {
                nxb: nxb,
                id: qdata.id
            }
            res.render("update_publisher", { data: result });
        }
    })
}

exports.post_update_publisher = function (req, res) {
    //*********** Xử lý dữ liệu từ client

    // Lấy đường link trang web
    var web = req.url;
    var q = url.parse(web, true);
    // Lấy tham số id
    var qdata = q.query;

    var body = req.body;

    var publisher = {
        nam_thanh_lap: body.nam_thanh_lap,
        dia_chi: body.dia_chi
    }

    console.log(publisher);

    var deter_ten = -1;

    //**********8 Xử lý lỗi
    var error = "";

    console.log("Before xử lý kq trả về");
    if (error != "") {
        res.render("update_publisher", { data: { error: error } });
    } else {
        var check = publisherModel.updatePublisher(qdata.id, publisher);
        if (!check) {
            res.render("update_publisher", { data: { error: "Cập nhật nhà xuất bản thất bại!" } });
        }
    }

    // Get lại dữ liệu
    var id_publisher = publisherModel.getPublisherbyName(qdata.id);
    id_publisher.then(function (pub) {
        nxb = pub[0];
        var result;
        console.log(nxb);
        result = {
            nxb: nxb,
            success: "Câp nhật nhà xuất bản thành công",
            id: qdata.id
        }
        res.render("update_publisher", { data: result });
    })
}
// Xóa NXB
exports.Delete_Publisher = function(req, res){
    publisherModel.Delete_Publisher(req.params.Name);
}

exports.delete_publisher = function(req, res){
    console.log(req.params.Name)
    publisherModel.Delete_Publisher(req.params.Name);
    publisherModel.getPublisher().then(function (data) {
        res.render("staff/update_delete_publisher", { items: data.arr });
    })
}

// Lấy dan sách nhà xuất bản cho trang chủ
exports.get_publishers_for_Home = function(req, res){
    if(req.query.ten_nxb){
        var ten_nxb = req.query.ten_nxb;
        if(ten_nxb == "Tất cả"){
            bookModel.getInforBooksForHome().then(function(data){
                bookModel.getInforBooksForHome().then(function (data) {
                    var step = 0;
                    if (req.query.step) {
                        step = req.query.step;
                    }
                    var pages = [];
                    var iCur = step * 9;
                    var size = iCur + 9;
                    size = (size < data.arr.length) ? size : data.length;
                    for (var i = iCur; i < size; i++) {
                        pages.push(data.arr[i]);
                    }
    
                    var length_paging = data.arr.length;
                    var size_paging = 0;
                    if (length_paging > 0) {
                        size_paging = (length_paging % 9);
                        if (length_paging % 9 != 0) {
                            size_paging++;
                        }
                    }
                    var paging = [];
                    for (var i = 1; i <= size_paging; i++) {
                        paging.push(i);
                    }
                    res.render("home_item_book", {
                        items: pages,
                        paging: paging,
                        iCur : step
                    });
                });
            });
        }else{
            bookModel.getBookbyNamePublihser(ten_nxb).then(function(data){
                res.render("home_item_book", { items: data, paging: [] });
            });
        }
        
    }else{
        publisherModel.getPublisherForHome().then(function(data){
            data.arr.unshift({ten_nxb : 'Tất cả'});
            res.render("home_category_publisher", { items: data.arr })
        });
    }
    
}

// Lấy danh sách nhà xuất bản option cho trang chủ
exports.get_publishers_option_for_Home = function(req, res){
    publisherModel.getPublisherForHome().then(function(data){
        data.arr.unshift({ten_nxb : 'Tất cả'});
        res.render("optionNXB", { items: data.arr })
    });
}
