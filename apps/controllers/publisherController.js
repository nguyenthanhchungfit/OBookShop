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
                var result = {
                    nhaxuatban: nhaxuatban,
                    sach: sach,
                    listNXB: listNXB
                }

                res.render("detail_publisher", { data: result })
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
