var publisherModel = require("../models/publisherModel")
var bookModel = require("../models/bookModel")

exports.getPublisherByName = function(req, res){
    // Lấy danh sách nxb từ tên nxb
    var ListNXB = publisherModel.getPublisherbyName(req.params.Name)

    ListNXB.then(function(nha_xuat_ban){
        nhaxuatban = nha_xuat_ban[0]

        // Lấy danh sách sách có cùng tên nhà xuất bản
        var listSach = bookModel.getBookbyNamePublihser(req.params.Name)
        listSach.then(function(sach){

            // Lấy danh sách nhà xuất bản
            var listNXB = publisherModel.getPublisher()
            listNXB.then(function(listNXB){
                var result = {
                    nhaxuatban: nhaxuatban,
                    sach: sach,
                    listNXB: listNXB
                }
        
                res.render("detail_publisher", {data: result})
            })
        })        
    })
}