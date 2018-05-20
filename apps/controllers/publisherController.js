var publisherModel = require("../models/publisherModel")
var bookModel = require("../models/bookModel")

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