var bookModel = require("../models/bookModel");
var categoryModel = require("../models/categoryModel");
var url = require("url");

exports.getBooksForHomeByCategory = function (req, res) {
    if (req.query.the_loai) {
        var id_the_loai = req.query.the_loai;
        if (id_the_loai == 'all') {
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
        } else {
            bookModel.getInforBooksForHomeByCategory(id_the_loai).then(function (data) {
                res.render("home_item_book", {
                    items: data.arr,
                    paging: []
                });
            });
        }
    } else {
        categoryModel.getCategories().then(function (data) {
            data.arr.unshift({
                id_the_loai: 'all',
                ten_the_loai: 'Tất cả'
            });
            res.render("home_category_book", {
                items: data.arr
            });
        })
    }
}
exports.get_create_category = function (req, res) {
    res.render("create_category", {
        data: {}
    });
}

exports.post_create_category = function (req, res) {
    //*********** Xử lý dữ liệu từ client
    var body = req.body;

    var category = {
        id: body.id.trim(),
        ten: body.ten_the_loai.trim(),
    }

    console.log(category);

    //**********8 Xử lý lỗi
    var error = "";



    // 1.1 Xử lý tên thể loại
    if (category.ten.length == 0) {
        error += "Chưa nhập tên thể loại</br>";
    }

    // 1.2 Xử lý ID thể loại
    // Nếu chưa nhập ID thì ID coi như = "&"

    if (category.id.length == 0) {
        error += "Chưa nhập ID thể loại</br>";
        category.id = "&";
    }

    //******** Xử lý kết quả trả về 
    var isExisted = categoryModel.checkIDIsExisted(category.id).then(function (data) {
        if (data) {
            error += "ID này đã tồn tại</br>";
            console.log(error);
            console.log(data);
        }
        console.log("Before xử lý kq trả về");
        if (error != "") {
            res.render("create_category", {
                data: {
                    error: error
                }
            });
        } else {
            var check = categoryModel.addNewCategory(category);
            if (!check) {
                res.render("create_category", {
                    data: {
                        error: "Tạo mới thể loại thất bại!"
                    }
                });
            } else {
                res.render("create_category", {
                    data: {
                        success: "tạo mới thể loại thành công!"
                    }
                });
            }
        }
    });
}
exports.get_update_category = function (req, res) {

    // Lấy tên của thể loại
    // Lấy đường link trang web
    var web = req.url;
    var q = url.parse(web, true);
    // Lấy tham số id
    var qdata = q.query;

    var id_category = categoryModel.getCategorybyID(qdata.id);
    id_category.then(function (category) {
        the_loai = category[0];
        var result;
        console.log(the_loai);
        // Nếu nhập ID không tồn tại
        if (!the_loai) {
            // Cho kết quả trả về rỗng và báo lỗi.
            result = {
                the_loai: empty = {
                    ten_the_loai: ""
                },
                error: "Thể loại không tồn tại"
            }
            res.render("update_category", {
                data: result
            });
        } else {
            result = {
                the_loai: the_loai,
                id: qdata.id
            }
            res.render("update_category", {
                data: result
            });
        }
    })
}
exports.post_update_category = function (req, res) {
    //*********** Xử lý dữ liệu từ client

    // Lấy đường link trang web
    var web = req.url;
    var q = url.parse(web, true);
    // Lấy tham số id
    var qdata = q.query;

    var body = req.body;

    var category = {
        ten_the_loai: body.ten_the_loai.trim()
    }

    console.log(category);

    var deter_ten = -1;

    //**********8 Xử lý lỗi
    var error = "";

    // Xử lý tên tác giả
    if (category.ten_the_loai.length == 0) {
        error += "Chưa nhập thể loại</br>";
    }

    //******** Xử lý kết quả trả về 
    //while(deter_email == -1 || deter_user == -1 || deter_phone == -1);

    console.log("Before xử lý kq trả về");
    if (error != "") {
        res.render("update_category", {
            data: {
                error: error
            }
        });
    } else {
        var check = categoryModel.updateCategory(qdata.id, category);
        if (!check) {
            res.render("update_category", {
                data: {
                    error: "Cập nhật thể loại thất bại!"
                }
            });
        }
    }

    // Get lại dữ liệu
    var id_category = categoryModel.getCategorybyID(qdata.id);
    id_category.then(function (cate) {
        the_loai = cate[0];
        var result;
        console.log(the_loai);
        result = {
            the_loai: the_loai,
            success: "Câp nhật thể loại thành công",
            id: qdata.id
        }
        res.render("update_category", {
            data: result
        });
    })
}

exports.getDanhSachTheLoaiOption = function(req, res){
    categoryModel.getCategories().then(function (data) {
        data.arr.unshift({
            id_the_loai: '0',
            ten_the_loai: 'Tất cả'
        });
        res.render("optionTheLoai", {
            items: data.arr
        });
    });
}