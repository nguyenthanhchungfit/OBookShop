var bookModel = require("../models/bookModel");
var authorModel = require("../models/authorModel");
var categoryModel = require("../models/categoryModel");
var publisherModel = require("../models/publisherModel");
var cartDetail = require("../controllers/cart");
var fs = require("fs");
var xml2js = require("xml2js");
var url = require("url");

exports.getBookbyID = function (req, res) {
    var id = req.params.id;
    var listCmt = ReadFileComment(id)
    var ThongTin = {
        id: id,
        SoLuong: 1,
        listCmt: listCmt
    }
    getDataDetailBook(req, res, ThongTin)
};

exports.AddToCart = function (req, res) {
    var id = req.params.id;
    var SoLuong = req.body.SoLuongSach;
    var listCmt = ReadFileComment(id)

    var SachDB = bookModel.getBookbyID(id)
    SachDB.then(function (dataSach) {
        sach = dataSach[0]

        var IDTacGiaDB = authorModel.getAuthorbyIDBook(id)
        IDTacGiaDB.then(function (dataSach_TG) {
            var idtacgia = dataSach_TG[0]

            var TacGiaDB = authorModel.getAuthorbyID(idtacgia.id_tac_gia)
            TacGiaDB.then(function (tac_gia) {
                var tacgia = tac_gia[0]

                var result = {
                    sach: sach,
                    tacgia: tacgia,
                    SoLuong: parseInt(SoLuong),
                    TongTien: (sach.gia - sach.gia * sach.khuyen_mai / 100) * parseInt(SoLuong)
                }



                if (sach.so_luong_ton > SoLuong) {

                    cartDetail.AddToCart(result, req, res)
                    // Giảm số lượng sách ở database
                    var SoLuongTonMoi = sach.so_luong_ton - SoLuong
                    bookModel.UpdateNumberBook(sach.id_sach, SoLuongTonMoi)

                    var ThongTin = {
                        id: id,
                        SoLuong: parseInt(SoLuong),
                        listCmt: listCmt,
                        success: "Thêm thành công vào giỏ hàng"
                    }
                    getDataDetailBook(req, res, ThongTin)
                }
                else {
                    var error = ""
                    if (sach.so_luong_ton == 0) {
                        error = "Sách đã hết hàng, vui lòng quay lại sau"
                    }
                    else if (sach.so_luong_ton < SoLuong) {
                        error = "Thêm giỏ hàng thất bại: Không đủ số lượng sách yêu cầu"
                    }
                    var ThongTin = {
                        id: id,
                        SoLuong: parseInt(SoLuong),
                        listCmt: listCmt,
                        error: error
                    }
                    getDataDetailBook(req, res, ThongTin)
                }
            })
        })
    })
}

exports.index = function (req, res) {
    bookModel.getInforBooksForHome().then(function (data) {
        res.render("home_item_book", { items: data.arr });
    })
};

function getDataDetailBook(req, res, thongtin) {
    // Lấy chi tiết sách theo ID sách
    var sach = bookModel.getBookbyID(thongtin.id)
    sach.then(function (sach) {
        Sach = sach[0]
        Sach.gia = Sach.gia - Sach.gia * Sach.khuyen_mai / 100

        // Lấy ID tác giả từ ID sách
        var IDtacgia = authorModel.getAuthorbyIDBook(Sach.id_sach)
        IDtacgia.then(function (sach_tac_gia) {
            var idtacgia = sach_tac_gia[0]

            // Lấy tên tác giả từ ID tác giả
            var Tacgia = authorModel.getAuthorbyID(idtacgia.id_tac_gia)
            Tacgia.then(function (tac_gia) {
                var tacgia = tac_gia[0]

                // Lấy thể loại theo ID thể loại
                var Theloai = categoryModel.getCategorybyID(Sach.the_loai)
                Theloai.then(function (the_loai) {
                    var theloai = the_loai[0]

                    // Lấy danh sách các sách cùng thể loại
                    var SachCungTheLoai = bookModel.getBookbyIDCategory(theloai.id_the_loai)
                    SachCungTheLoai.then(function (sachcungtheloai) {
                        var result = {
                            Sach: Sach,
                            tacgia: tacgia,
                            theloai: theloai,
                            sachcungtheloai: sachcungtheloai,
                            thongtin: thongtin
                        }
                        res.render("detail_book", { data: result })
                    })
                })
            })
        })
    })
}

function ReadFileComment(id) {
    var listCmt = []
    var parser = new xml2js.Parser();

    fs.readFile(__dirname + "/../common/comments/" + id + ".xml", function (err, data) {
        parser.parseString(data, function (err, result) {
            var len = result["comments"]["comment"].length
            for (var i = 0; i < len; ++i) {
                var cmt = {
                    comment: result["comments"]["comment"][i]['_'],
                    username: result["comments"]["comment"][i]['$'].username,
                    datetime: result["comments"]["comment"][i]['$'].datetime
                }
                listCmt.push(cmt)
            }
        })
    })
    return listCmt
}


exports.index = function (req, res) {
    bookModel.getInforBooksForHome().then(function (data) {
        res.render("home_item_book", { items: data.arr });
    })
};

exports.get_create_book = function (req, res) {
    categoryModel.getCategories().then(function (tl) {
        authorModel.getAuthor().then(function (tg) {
            publisherModel.getPublisher().then(function (nxb) {
                var item = {
                    tl: tl.arr,
                    tg: tg.arr,
                    nxb: nxb.arr
                }
                res.render("create_book", { data: {}, items: item });
            })
        })
    })
}

exports.update_delete_book = function(req, res){
    bookModel.getInforBooksForHome().then(function (data) {
        res.render("staff/update_delete_book", { items: data.arr });
    })
    
}

exports.post_create_book = function (req, res) {
    //*********** Xử lý dữ liệu từ client
    var error = "";
    var ori = "";
    console.log(req.file);
    if (req.file == null) {
        error += "Chưa thêm ảnh của sách</br>";
    }
    else {
        ori = req.file.originalname;
    }
    var body = req.body;
    var book = {
        id_sach: body.id_sach.trim(),
        ten_sach: body.ten_sach.trim(),
        the_loai: body.the_loai,
        tac_gia: body.tac_gia,
        nha_xuat_ban: body.nha_xuat_ban,
        nam_xuat_ban: body.nam_xuat_ban,
        khuyen_mai: body.khuyen_mai,
        gia: body.gia,
        so_luong_ton: body.so_luong_ton,
        chat_luong: "",
        image_sach_url: ori,
        doc_truoc: body.doc_truoc
    }

    console.log(book);

    //**********8 Xử lý lỗi


    if (book.ten_sach.length == 0) {
        error += "Chưa nhập tên sách</br>";
    }

    if (book.khuyen_mai > 100 || book.khuyen_mai < 0) {
        error += "% khuyến mãi trong khoảng từ 0 -> 100</br>"
    }
    if (book.id_sach.length == 0) {
        error += "Chưa nhập ID sách</br>";
        book.id_sach = "&";
    }

    if (book.gia.length == 0) {
        error += "Chưa nhập giá của sách</br>"
    }

    if (book.gia <= 0) {
        error += "Giá phải > 0</br>";
    }

    if (book.so_luong_ton.length == 0) {
        error += "Chưa nhập số lượng tồn của sách</br>"
    }

    if (book.so_luong_ton < 0) {
        error += "Số lượng tồn phải >= 0</br>";
    }

    //******** Xử lý kết quả trả về 
    var isExisted = bookModel.checkIDIsExisted(book.id_sach).then(function (data) {
        if (data) {
            error += "ID này đã tồn tại</br>";
            console.log(error);
            console.log(data);
        }
        categoryModel.getCategories().then(function (tl) {
            authorModel.getAuthor().then(function (tg) {
                publisherModel.getPublisher().then(function (nxb) {
                    var item = {
                        tl: tl.arr,
                        tg: tg.arr,
                        nxb: nxb.arr
                    }

                    console.log("Before xử lý kq trả về");
                    if (error != "") {
                        res.render("create_book", { data: { error: error }, items: item });
                    } else {
                        var check = bookModel.addNewBook(book);
                        var check2 = authorModel.addNewAuthorofBook(book.tac_gia, book.id_sach);
                        if (!check || !check2) {
                            res.render("create_book", { data: { error: "Tạo mới sách thất bại!" }, items: item });
                        } else {
                            res.render("create_book", { data: { success: "tạo mới sách thành công!" }, items: item });
                        }
                    }
                })
            })
        })
    });
}

exports.get_update_book = function (req, res) {
    categoryModel.getCategories().then(function (tl) {
        authorModel.getAuthor().then(function (tg) {
            publisherModel.getPublisher().then(function (nxb) {
                var item = {
                    tl: tl.arr,
                    tg: tg.arr,
                    nxb: nxb.arr
                }
                // Lấy chi tiết của sách
                // Lấy đường link trang web
                var web = req.url;
                var q = url.parse(web, true);
                // Lấy tham số id
                var qdata = q.query;
                console.log(qdata.id);
                bookModel.getBookbyID(qdata.id).then(function (book) {
                    authorModel.getAuthorbyIDBook(qdata.id).then(function (author) {
                        tac_gia = author[0];
                        sach = book[0];
                        console.log(sach);
                        if (!sach || !tac_gia) {
                            result = {
                                sach: empty = {
                                    ten_sach: "",
                                    nam_xuat_ban: "",
                                    khuyen_mai: "",
                                    gia: "",
                                    so_luong_ton: "",
                                    doc_truoc: ""
                                },
                                tac_gia: empty = {
                                    id_tac_gia: ""
                                },
                                error: "Sách không tồn tại"
                            }
                            res.render("update_book", { items: item, data: result });
                        }
                        else {
                            result = {
                                sach: sach,
                                id: qdata.id,
                                tac_gia: tac_gia
                            }
                            res.render("update_book", { items: item, data: result });
                        }
                    })
                })
            })
        })
    })
}
exports.post_update_book = function (req, res) {
    //*********** Xử lý dữ liệu từ client

    // Lấy đường link trang web
    var web = req.url;
    var q = url.parse(web, true);
    // Lấy tham số id
    var qdata = q.query;

    var body = req.body;
    console.log(body);
    var book = {
        ten_sach: body.ten_sach.trim(),
        the_loai: body.the_loai,
        tac_gia: body.tac_gia,
        nha_xuat_ban: body.nha_xuat_ban,
        nam_xuat_ban: body.nam_xuat_ban,
        khuyen_mai: body.khuyen_mai,
        gia: body.gia,
        so_luong_ton: body.so_luong_ton,
        chat_luong: "",
        doc_truoc: body.doc_truoc
    }

    console.log(book);


    //**********8 Xử lý lỗi
    var error = "";

    if (book.ten_sach.length == 0) {
        error += "Chưa nhập tên sách</br>";
    }

    if (book.khuyen_mai > 100 || book.khuyen_mai < 0) {
        error += "% khuyến mãi trong khoảng từ 0 -> 100</br>"
    }

    if (book.gia.length == 0) {
        error += "Chưa nhập giá của sách</br>"
    }

    if (book.gia <= 0) {
        error += "Giá phải > 0</br>";
    }

    if (book.so_luong_ton.length == 0) {
        error += "Chưa nhập số lượng tồn của sách</br>"
    }

    if (book.so_luong_ton < 0) {
        error += "Số lượng tồn phải >= 0</br>";
    }

    //******** Xử lý kết quả trả về 
    //while(deter_email == -1 || deter_user == -1 || deter_phone == -1);

    console.log("Before xử lý kq trả về");
    if (error != "") {
        res.render("update_author", { data: { error: error } });
    } else {
        var check = bookModel.updateBook(qdata.id, book);
        if (!check) {
            res.render("update_book", { data: { error: "Cập nhật sách thất bại!" } });
        }
    }

    // Get lại dữ liệu
    categoryModel.getCategories().then(function (tl) {
        authorModel.getAuthor().then(function (tg) {
            publisherModel.getPublisher().then(function (nxb) {
                var item = {
                    tl: tl.arr,
                    tg: tg.arr,
                    nxb: nxb.arr
                }
                bookModel.getBookbyID(qdata.id).then(function (book) {
                    authorModel.getAuthorbyIDBook(qdata.id).then(function (author) {
                        tac_gia = author[0];
                        sach = book[0];
                        console.log(sach);
                        if (!sach) {
                            result = {
                                sach: empty = {
                                    ten_sach: "",
                                    nam_xuat_ban: "",
                                    khuyen_mai: "",
                                    gia: "",
                                    so_luong_ton: "",
                                    doc_truoc: ""
                                },
                                tac_gia: tac_gia,
                                error: "Sách không tồn tại"
                            }
                            res.render("update_book", { items: item, data: result });
                        }
                        else {
                            result = {
                                sach: sach,
                                id: qdata.id,
                                tac_gia: tac_gia,
                                success: "Câp nhật tác giả thành công",
                            }
                            res.render("update_book", { items: item, data: result });
                        }
                    })
                })
            })
        })
    })
}
exports.delete_book = function(req, res){
    bookModel.DeleteBook(req.params.id);
    bookModel.getInforBooksForHome().then(function (data) {
        res.render("staff/update_delete_book", { items: data.arr });
    })
}