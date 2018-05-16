var bookModel = require("../models/bookModel");
var authorModel = require("../models/authorModel")
var categoryModel = require("../models/categoryModel")

exports.getBookbyID = function(req, res){

    // Lấy chi tiết sách theo ID sách
    var sach = bookModel.getBookbyID(req.params.id)
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
                tacgia = tac_gia[0]

                // Lấy thể loại theo ID thể loại
                var Theloai = categoryModel.getCategorybyID(Sach.the_loai)
                Theloai.then(function(the_loai){
                    theloai = the_loai[0]

                    // Lấy danh sách các sách cùng thể loại
                    var SachCungTheLoai = bookModel.getBookbyIDCategory(theloai.id_the_loai)
                    SachCungTheLoai.then(function(sachcungtheloai){
                        var result = {
                            Sach: Sach,
                            tacgia: tacgia,
                            theloai: theloai,
                            sachcungtheloai: sachcungtheloai
                        }
                        
                        res.render("detail_book", {data: result})
                    })
                })
            })
        })
    })
};

exports.index = function(req, res) {
    bookModel.getInforBooksForHome().then(function(data){
        res.render("home_item_book", {items : data.arr});
    })
};