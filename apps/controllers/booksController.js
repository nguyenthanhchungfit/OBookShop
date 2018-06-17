var bookModel = require("../models/bookModel");
var authorModel = require("../models/authorModel");
var categoryModel = require("../models/categoryModel");
var publisherModel = require("../models/publisherModel");
var cartDetail = require("../controllers/cart");
var DS_BanChay = require("../common/danh_sach_dac_biet/danh_sach_ban_chay_nhat")
var DS_BinhChon = require("../common/danh_sach_dac_biet/danh_sach_binh_chon_cao_nhat")
var DS_GiamGia = require("../common/danh_sach_dac_biet/danh_sach_giam_gia")
var DS_MoiPhatHanh = require("../common/danh_sach_dac_biet/danh_sach_moi_phat_hanh")
var fs = require("fs")
var xml2js = require("xml2js")

exports.getBookbyID = function(req, res){
    var id = req.params.id;
    var listCmt = ReadFileComment(id)
    var ThongTin = {
        id: id,
        SoLuong: 1,
        listCmt: listCmt
    }
    getDataDetailBook(req, res, ThongTin)
};

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


exports.getBookbyID = function(req, res){
    var id = req.params.id;
    if(req.query.so_luong){
        var SoLuong = req.query.so_luong;
        var SachDB = bookModel.getBookbyID(id)
        SachDB.then(function(dataSach){
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

                if (sach.so_luong_ton >= SoLuong) {

                    cartDetail.AddToCart(result, req, res)

                    var ThongTin = {
                        success: "Thêm thành công vào giỏ hàng"
                    }
                    res.render("notification", {data: ThongTin})
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
                        error: error
                    }
                    res.render("notification", {data: ThongTin})
                }
                })
            })
        })
    }
    else {
        var isUser;
        if(req.session.user != null) {
            isUser = true;
        }
        else{
            isUser = false;
        }
        var ThongTin = {
            id: id,
            SoLuong: 1,
            isUser: isUser
        }
        getDataDetailBook(req, res, ThongTin)
    }
};

// Xóa sách
exports.Delete_Book = function(req, res){
    bookModel.DeleteBook(req.params.id);
}

// Top bán chạy --------------------------------------------------------------------------------------
exports.Top_Selling_Book = function(req, res){
    var listSach = bookModel.getInforBooksForHome()
    listSach.then(function(data){
        var result = {
            DS_BanChay: DS_BanChay,
            sach: data
        }
        res.render("staff/top_selling", {data: result});
    })   
}

exports.Add_Selling = function(req, res){
    console.log(req.params.id);
    if(req.query.add_selling){
        if(CheckIDBookExistInList(req.params.id, DS_BanChay) == false)
        {
            if(DS_BanChay.list.length < 10){
                DS_BanChay.list.push({
                    id: req.params.id,
                    so_luong: req.query.add_selling
                })
                DS_BanChay.NV_Capnhat.push({
                    username: req.session.user.username,
                    ThoiGian: new Date().toLocaleString(),
                    ID_Sach: req.params.id,
                    type: "Thêm"
                })
                // Ghi file
                var jsonFile = JSON.stringify(DS_BanChay)
                fs.writeFile(__dirname +  "/../common/danh_sach_dac_biet/danh_sach_ban_chay_nhat.json", jsonFile, function(err){
                    if(err){
                        throw err;
                    }
                })
                var listSach = bookModel.getInforBooksForHome()
                listSach.then(function(data){
                    var result = {
                        DS_BanChay: DS_BanChay,
                        sach: data
                    }
                    res.render("staff/top_selling", {data: result});
                })
            }
            else{
                var listSach = bookModel.getInforBooksForHome()
                listSach.then(function(data){
                    var result = {
                        DS_BanChay: DS_BanChay,
                        sach: data,
                        error: "Số sách không được vượt quá 10"
                    }
                    res.render("staff/top_selling", {data: result});
                })
            }
        }
        else{
            var listSach = bookModel.getInforBooksForHome()
            listSach.then(function(data){
                var result = {
                    DS_BanChay: DS_BanChay,
                    sach: data,
                    error: "Sách đã tồn tại"
                }
                res.render("staff/top_selling", {data: result});
            })
        }
    }
}

exports.Delete_Selling = function(req, res){ 
    if(req.params.id){
        for(var i = 0; i < DS_BanChay.list.length; ++i){
            if(DS_BanChay.list[i].id == req.params.id){
                DS_BanChay.list.splice(i, 1);
            }
        }
        DS_BanChay.NV_Capnhat.push({
            username: req.session.user.username,
            ThoiGian: new Date().toLocaleString(),
            ID_Sach: req.params.id,
            type: "Xóa"
        })
        // Ghi file
        var jsonFile = JSON.stringify(DS_BanChay)
        fs.writeFile(__dirname +  "/../common/danh_sach_dac_biet/danh_sach_ban_chay_nhat.json", jsonFile, function(err){
            if(err){
                throw err;
            }
        })
        var listSach = bookModel.getInforBooksForHome()
            listSach.then(function(data){
                var result = {
                    DS_BanChay: DS_BanChay,
                    sach: data
                }
                res.render("staff/top_selling", {data: result});
            })
    }
}

// Top sách vote -----------------------------------------------------------------------------------------------
exports.Top_Vote_Book = function(req, res){
    var listSach = bookModel.getInforBooksForHome()
    listSach.then(function(data){
        var result = {
            DS_BinhChon: DS_BinhChon,
            sach: data
        }
        res.render("staff/top_vote", {data: result});
    })   
}

exports.Add_Vote = function(req, res){
    console.log(req.params.id);
    if(req.query.add_vote){
        if(CheckIDBookExistInList(req.params.id, DS_BinhChon) == false)
        {
            if(DS_BinhChon.list.length < 10){
                DS_BinhChon.list.push({
                    id: req.params.id,
                    so_luong: req.query.add_vote
                })
                DS_BinhChon.NV_Capnhat.push({
                    username: req.session.user.username,
                    ThoiGian: new Date().toLocaleString(),
                    ID_Sach: req.params.id,
                    type: "Thêm"
                })
                // Ghi file
                var jsonFile = JSON.stringify(DS_BinhChon)
                fs.writeFile(__dirname +  "/../common/danh_sach_dac_biet/danh_sach_binh_chon_cao_nhat.json", jsonFile, function(err){
                    if(err){
                        throw err;
                    }
                })
                var listSach = bookModel.getInforBooksForHome()
                listSach.then(function(data){
                    var result = {
                        DS_BinhChon: DS_BinhChon,
                        sach: data
                    }
                    res.render("staff/top_vote", {data: result});
                })
            }
            else{
                var listSach = bookModel.getInforBooksForHome()
                listSach.then(function(data){
                    var result = {
                        DS_BinhChon: DS_BinhChon,
                        sach: data,
                        error: "Số sách không được vượt quá 10"
                    }
                    res.render("staff/top_vote", {data: result});
                })
            }
        }
        else{
            var listSach = bookModel.getInforBooksForHome()
            listSach.then(function(data){
                var result = {
                    DS_BinhChon: DS_BinhChon,
                    sach: data,
                    error: "Sách đã tồn tại"
                }
                res.render("staff/top_vote", {data: result});
            })
        }
    }
}

exports.Delete_Vote = function(req, res){ 
    if(req.params.id){
        for(var i = 0; i < DS_BinhChon.list.length; ++i){
            if(DS_BinhChon.list[i].id == req.params.id){
                DS_BinhChon.list.splice(i, 1);
            }
        }
        DS_BinhChon.NV_Capnhat.push({
            username: req.session.user.username,
            ThoiGian: new Date().toLocaleString(),
            ID_Sach: req.params.id,
            type: "Xóa"
        })
        // Ghi file
        var jsonFile = JSON.stringify(DS_BinhChon)
        fs.writeFile(__dirname +  "/../common/danh_sach_dac_biet/danh_sach_binh_chon_cao_nhat.json", jsonFile, function(err){
            if(err){
                throw err;
            }
        })
        var listSach = bookModel.getInforBooksForHome()
            listSach.then(function(data){
                var result = {
                    DS_BinhChon: DS_BinhChon,
                    sach: data
                }
                res.render("staff/top_vote", {data: result});
            })
    }
}
// Top sách giảm giá -----------------------------------------------------------------------------------------------
exports.Top_Sale_Book = function(req, res){
    var listSach = bookModel.getInforBooksForHome()
    listSach.then(function(data){
        var result = {
            DS_GiamGia: DS_GiamGia,
            sach: data
        }
        res.render("staff/top_sale", {data: result});
    })   
}

exports.Add_Sale = function(req, res){
    console.log(req.params.id);
    if(req.query.add_sale){
        if(CheckIDBookExistInList(req.params.id, DS_GiamGia) == false)
        {
            DS_GiamGia.list.push({
                id: req.params.id,
                so_luong: req.query.add_sale
            })
            DS_GiamGia.NV_Capnhat.push({
                username: req.session.user.username,
                ThoiGian: new Date().toLocaleString(),
                ID_Sach: req.params.id,
                type: "Thêm"
            })
            // Ghi file
            var jsonFile = JSON.stringify(DS_GiamGia)
            fs.writeFile(__dirname +  "/../common/danh_sach_dac_biet/danh_sach_giam_gia.json", jsonFile, function(err){
                if(err){
                    throw err;
                }
            })
            var listSach = bookModel.getInforBooksForHome()
            listSach.then(function(data){
                var result = {
                    DS_GiamGia: DS_GiamGia,
                    sach: data
                }
                res.render("staff/top_sale", {data: result});
            })
        }
        else{
            var listSach = bookModel.getInforBooksForHome()
            listSach.then(function(data){
                var result = {
                    DS_GiamGia: DS_GiamGia,
                    sach: data,
                    error: "Sách đã tồn tại"
                }
                res.render("staff/top_sale", {data: result});
            })
        }
    }
}

exports.Delete_Sale = function(req, res){ 
    if(req.params.id){
        for(var i = 0; i < DS_GiamGia.list.length; ++i){
            if(DS_GiamGia.list[i].id == req.params.id){
                DS_GiamGia.list.splice(i, 1);
            }
        }
        DS_GiamGia.NV_Capnhat.push({
            username: req.session.user.username,
            ThoiGian: new Date().toLocaleString(),
            ID_Sach: req.params.id,
            type: "Xóa"
        })
        // Ghi file
        var jsonFile = JSON.stringify(DS_GiamGia)
        fs.writeFile(__dirname +  "/../common/danh_sach_dac_biet/danh_sach_giam_gia.json", jsonFile, function(err){
            if(err){
                throw err;
            }
        })
        var listSach = bookModel.getInforBooksForHome()
            listSach.then(function(data){
                var result = {
                    DS_GiamGia: DS_GiamGia,
                    sach: data
                }
                res.render("staff/top_sale", {data: result});
            })
    }
}

// Top mới phát hành --------------------------------------------------------------------------------------
exports.Top_New_Book = function(req, res){
    var listSach = bookModel.getInforBooksForHome()
    listSach.then(function(data){
        var result = {
            DS_MoiPhatHanh: DS_MoiPhatHanh,
            sach: data
        }
        res.render("staff/top_new", {data: result});
    })   
}

exports.Add_New = function(req, res){
    console.log(req.params.id);
    if(req.query.add_new){
        if(CheckIDBookExistInList(req.params.id, DS_MoiPhatHanh) == false)
        {
            if(CheckNgayMoiPhatHanh(req.query.add_new)){
                DS_MoiPhatHanh.list.push({
                    id: req.params.id,
                    ngay_phat_hanh: req.query.add_new
                })
                DS_MoiPhatHanh.NV_Capnhat.push({
                    username: req.session.user.username,
                    ThoiGian: new Date().toLocaleString(),
                    ID_Sach: req.params.id,
                    type: "Thêm"
                })
                // Ghi file
                var jsonFile = JSON.stringify(DS_MoiPhatHanh)
                fs.writeFile(__dirname +  "/../common/danh_sach_dac_biet/danh_sach_moi_phat_hanh.json", jsonFile, function(err){
                    if(err){
                        throw err;
                    }
                })
                var listSach = bookModel.getInforBooksForHome()
                listSach.then(function(data){
                    var result = {
                        DS_MoiPhatHanh: DS_MoiPhatHanh,
                        sach: data
                    }
                    res.render("staff/top_new", {data: result});
                })
            }
            else{
                var listSach = bookModel.getInforBooksForHome()
            listSach.then(function(data){
                var result = {
                    DS_MoiPhatHanh: DS_MoiPhatHanh,
                    sach: data,
                    error: "Chỉ được thêm sách có thời gian cách hiện tại không quá 1 tháng"
                }
                res.render("staff/top_new", {data: result});
            })
            }
        }
        else{
            var listSach = bookModel.getInforBooksForHome()
            listSach.then(function(data){
                var result = {
                    DS_MoiPhatHanh: DS_MoiPhatHanh,
                    sach: data,
                    error: "Sách đã tồn tại"
                }
                res.render("staff/top_new", {data: result});
            })
        }
    }
}

exports.Delete_New = function(req, res){ 
    if(req.params.id){
        for(var i = 0; i < DS_MoiPhatHanh.list.length; ++i){
            if(DS_MoiPhatHanh.list[i].id == req.params.id){
                DS_MoiPhatHanh.list.splice(i, 1);
            }
        }
        DS_MoiPhatHanh.NV_Capnhat.push({
            username: req.session.user.username,
            ThoiGian: new Date().toLocaleString(),
            ID_Sach: req.params.id,
            type: "Xóa"
        })
        // Ghi file
        var jsonFile = JSON.stringify(DS_MoiPhatHanh)
        fs.writeFile(__dirname +  "/../common/danh_sach_dac_biet/danh_sach_moi_phat_hanh.json", jsonFile, function(err){
            if(err){
                throw err;
            }
        })
        var listSach = bookModel.getInforBooksForHome()
            listSach.then(function(data){
                var result = {
                    DS_MoiPhatHanh: DS_MoiPhatHanh,
                    sach: data
                }
                res.render("staff/top_new", {data: result});
            })
    }
}

exports.ViewComment = function(req, res){
    var id_sach = req.params.id;
    var listCmt = []
    var parser = new xml2js.Parser();   
   
    fs.readFile(__dirname +  "/../common/comments/" + id_sach + ".xml", function(err, data){
        parser.parseString(data, function(err, result){
            if(result){
                var len = result.comments.comment.length
                for(var i = 0; i < len; ++i){
                    var cmt = {
                        comment: {
                            content: result.comments.comment[i].content[0],
                            username: result.comments.comment[i].username[0],
                            datetime: result.comments.comment[i].datetime[0]
                        }
                    }
                    listCmt.push(cmt)
                }
            }
            
            // Ghi file comment nếu có bình luận mới
            if(req.query.binh_luan){
                var cont = req.query.binh_luan
                var cmt = {
                    comment: {
                        content: cont,
                        username: req.session.user.username, // session
                        datetime: new Date().toLocaleString()
                    }
                }
                listCmt.push(cmt)
                var builder = new xml2js.Builder({rootName: "comments"});
                xml = builder.buildObject(listCmt)
                fs.writeFile(__dirname +  "/../common/comments/" + id_sach + ".xml",xml, function(err) {
                    if(err) {
                        throw err;
                    }
                }); 
            }
            if(listCmt.length != 0){
                res.render("comment", {data: listCmt})
            }
            else{
                res.send("Chưa có bình luận");
            }
        })
        
    })
}

exports.index = function (req, res) {
    bookModel.getInforBooksForHome().then(function (data) {
        res.render("home_item_book", { items: data.arr });
    })
};

exports.index = function(req, res) {
    bookModel.getInforBooksForHome().then(function(data){
        res.render("home_item_book", {items : data.arr});
    })
};

exports.get_create_book = function(req, res) {
    res.render("create_book");
}

function CheckIDBookExistInList(ID, DS){
    var len  = DS.list.length
    for(var i = 0; i < len; ++i){
        if(ID == DS.list[i].id)
        return true;
    }
    return false
}

function getDataDetailBook(req, res, thongtin){
    // Lấy chi tiết sách theo ID sách
    var sach = bookModel.getBookbyID(thongtin.id)
    sach.then(function (sach) {
        Sach = sach[0]
        Sach.gia = Sach.gia - Sach.gia*Sach.khuyen_mai/100
        // Lấy thể loại theo ID thể loại
        var Theloai = categoryModel.getCategorybyID(Sach.the_loai)
        Theloai.then(function(the_loai){
            var theloai = the_loai[0]
            // Lấy danh sách các sách cùng thể loại
            var SachCungTheLoai = bookModel.getBookbyIDCategory(theloai.id_the_loai)
            SachCungTheLoai.then(function(sachcungtheloai){
                // Lấy ID tác giả từ ID sách
                var IDtacgia = authorModel.getAuthorbyIDBook(Sach.id_sach)
                IDtacgia.then(function(sach_tac_gia){
                    if(sach_tac_gia == "Không xác định"){
                        var result = {
                            Sach: Sach,
                            tacgia: sach_tac_gia,
                            theloai: theloai,
                            sachcungtheloai: sachcungtheloai,
                            thongtin: thongtin,
                            isAuthor: false
                        }
                        res.render("detail_book", {data: result})
                    }
                    else{
                        var Tacgia = authorModel.getAuthorbyID(sach_tac_gia[0].id_tac_gia)
                        Tacgia.then(function(tac_gia){
                            tacgia = tac_gia[0];
                            console.log(tacgia);
                            var result = {
                                Sach: Sach,
                                tacgia: tacgia,
                                theloai: theloai,
                                sachcungtheloai: sachcungtheloai,
                                thongtin: thongtin,
                                isAuthor: true
                            }
                            res.render("detail_book", {data: result})
                        })
                    }
                })
            })
        })
    })
}

function CheckNgayMoiPhatHanh(ngay){
    var ngay_phat_hanh = new Date(ngay);
    var now = new Date();
    if(now.getFullYear() - ngay_phat_hanh.getFullYear() > 0 
        || now.getMonth() - ngay_phat_hanh.getMonth() > 1 
        || (now.getMonth() - ngay_phat_hanh.getMonth() == 0 && now.getDate()-ngay_phat_hanh.getDate() < 0)){
        return false;
    }
    return true;
}
