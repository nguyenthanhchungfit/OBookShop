var bookModel = require("../models/bookModel");
var authorModel = require("../models/authorModel");
var categoryModel = require("../models/categoryModel");
var cartDetail = require("../controllers/cart");
var fs = require("fs")
var xml2js = require("xml2js")


function ReadFileComment() {  // Chưa hoàn thiện
    var parser = new xml2js.Parser();

    fs.readFile(__dirname +  "/../common/comments/IS0001.xml", function(err, data){
        parser.parseString(data, function(err, result){
            console.log(result)
        })
    })
}

exports.getBookbyID = function(req, res){
    var id = req.params.id;
    var ThongTin = {
        id: id,
        SoLuong: 1
    }
    getDataDetailBook(req, res, ThongTin)
};

exports.AddToCart = function(req, res){
    var id = req.params.id;
    var SoLuong = req.body.SoLuongSach;

    var SachDB = bookModel.getBookbyID(id)
    SachDB.then(function(dataSach){
        sach = dataSach[0]

        var IDTacGiaDB = authorModel.getAuthorbyIDBook(id)
        IDTacGiaDB.then(function(dataSach_TG){
            var idtacgia = dataSach_TG[0]

            var TacGiaDB = authorModel.getAuthorbyID(idtacgia.id_tac_gia)
            TacGiaDB.then(function(tac_gia){
                var tacgia = tac_gia[0]

                var result = {
                    sach:sach,
                    tacgia: tacgia,
                    SoLuong: parseInt(SoLuong),
                    TongTien: (sach.gia - sach.gia*sach.khuyen_mai/100) * parseInt(SoLuong)
                }
                if(sach.so_luong_ton > SoLuong){

                    cartDetail.AddToCart(result, req, res)
                    // Giảm số lượng sách ở database
                    var SoLuongTonMoi = sach.so_luong_ton - SoLuong
                    bookModel.UpdateNumberBook(sach.id_sach, SoLuongTonMoi)

                    var ThongTin = {
                        id: id,
                        SoLuong: parseInt(SoLuong),
                        success: "Thêm thành công vào giỏ hàng"
                    }
                    getDataDetailBook(req, res, ThongTin)
                }
                else{
                    var error = ""
                    if(sach.so_luong_ton == 0){
                        error = "Sách đã hết hàng, vui lòng quay lại sau"
                    }
                    else if(sach.so_luong_ton < SoLuong){
                        error = "Thêm giỏ hàng thất bại: Không đủ số lượng sách yêu cầu"
                    }
                    var ThongTin = {
                        id: id,
                        SoLuong: parseInt(SoLuong),
                        error: error
                    }
                    getDataDetailBook(req, res, ThongTin)
                }
            })
        })
    })
}

exports.index = function(req, res) {
    bookModel.getInforBooksForHome().then(function(data){
        res.render("home_item_book", {items : data.arr});
    })
};

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

exports.get_create_book = function(req, res) {
    res.render("create_book");
}

