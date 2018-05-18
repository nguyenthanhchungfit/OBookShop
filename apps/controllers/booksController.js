var bookModel = require("../models/bookModel");
var authorModel = require("../models/authorModel")
var categoryModel = require("../models/categoryModel")
var cartDetail = require("../controllers/cart")

exports.getBookbyID = function(req, res){
    var id = req.params.id;
    var ThongTin = {
        id: id,
        SoLuong: 1,
        textButton: "Thêm vào giỏ hàng"
    }
    getDataDetailBook(req, res, ThongTin)
};

exports.AddToCart = function(req, res){
    var id = req.params.id;
    var SoLuong = req.body.SoLuongSach;

    var Sach = bookModel.getBookbyID(id)
    Sach.then(function(dataSach){
        sach = dataSach[0]

        var IDTacGia = authorModel.getAuthorbyIDBook(id)
        IDTacGia.then(function(sach_TG){
            var idtacgia = sach_TG[0]

            var TacGia = authorModel.getAuthorbyID(idtacgia.id_tac_gia)
            TacGia.then(function(tac_gia){
                var tacgia = tac_gia[0]

                var result = {
                    sach:sach,
                    tacgia: tacgia,
                    SoLuong: parseInt(SoLuong),
                    TongTien: (sach.gia - sach.gia*sach.khuyen_mai/100) * parseInt(SoLuong)
                }
                cartDetail.AddToCart(result)
            })
        })
    })

    var ThongTin = {
        id: id,
        SoLuong: parseInt(SoLuong),
        textButton: "Đã thêm vào giỏ hàng"
    }
    getDataDetailBook(req, res, ThongTin)
}

function getDataDetailBook(req, res, thongtin){
    // Lấy chi tiết sách theo ID sách
    var sach = bookModel.getBookbyID(thongtin.id)
    sach.then(function(sach){
        Sach = sach[0]
        Sach.gia = Sach.gia - Sach.gia*Sach.khuyen_mai/100

        // Lấy ID tác giả từ ID sách
        var IDtacgia = authorModel.getAuthorbyIDBook(Sach.id_sach)
        IDtacgia.then(function(sach_tac_gia){
            var idtacgia = sach_tac_gia[0]
            
            // Lấy tên tác giả từ ID tác giả
            var Tacgia = authorModel.getAuthorbyID(idtacgia.id_tac_gia)
            Tacgia.then(function(tac_gia){
                var tacgia = tac_gia[0]

                // Lấy thể loại theo ID thể loại
                var Theloai = categoryModel.getCategorybyID(Sach.the_loai)
                Theloai.then(function(the_loai){
                    var theloai = the_loai[0]

                    // Lấy danh sách các sách cùng thể loại
                    var SachCungTheLoai = bookModel.getBookbyIDCategory(theloai.id_the_loai)
                    SachCungTheLoai.then(function(sachcungtheloai){
                        var result = {
                            Sach: Sach,
                            tacgia: tacgia,
                            theloai: theloai,
                            sachcungtheloai: sachcungtheloai,
                            thongtin: thongtin
                        }
                        res.render("detail_book", {data: result})
                    })
                })
            })
        })
    })
}

exports.index = function(req, res) {
    bookModel.getInforBooksForHome().then(function(data){
        res.render("home_item_book", {items : data.arr});
    })
};