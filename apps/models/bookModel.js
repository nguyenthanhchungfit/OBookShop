var q = require("q");
var db = require("../common/database");

var connection = db.getConnection();
const tableName = "sach";

function getInforBooksForHome(){
    var sql = `SELECT id_sach, ten_sach, gia, so_luong_ton, image_sach_url FROM ${tableName}`;
    var defer = q.defer();
    var arr = [];
    var query = connection.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        result.forEach(element => {
            arr.push({id_sach : element.id_sach, ten_sach : element.ten_sach, 
                gia : element.gia, so_luong_ton : element.so_luong_ton,
                image_sach_url : element.image_sach_url});
        });
        defer.resolve({arr});
    });
    return defer.promise;
}

function getInforBooksForHomeByCategory(the_loai){
    var sql = `SELECT id_sach, ten_sach, gia, so_luong_ton, image_sach_url FROM ${tableName} WHERE the_loai = "${the_loai}"`;
    var defer = q.defer();
    var arr = [];
    var query = connection.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        result.forEach(element => {
            arr.push({id_sach : element.id_sach, ten_sach : element.ten_sach, 
                gia : element.gia, so_luong_ton : element.so_luong_ton,
                image_sach_url : element.image_sach_url});
        });
        defer.resolve({arr});
    });
    return defer.promise;
}

// Lấy danh sách sách
function getInforBookForSearchHome(ten_sach, nxb, the_loai, gia){
    var sql;
    if(gia == 0){
        sql = `SELECT id_sach, ten_sach, gia, so_luong_ton, image_sach_url FROM ${tableName} WHERE ten_sach like n'%${ten_sach}%' AND nha_xuat_ban like '%${nxb}%' AND the_loai like '%${the_loai}%' AND gia > 0`;
    }else if(gia == 1){
        sql = `SELECT id_sach, ten_sach, gia, so_luong_ton, image_sach_url FROM ${tableName} WHERE ten_sach like n'%${ten_sach}%' AND nha_xuat_ban like '%${nxb}%' AND the_loai like '%${the_loai}%' AND gia > 0 AND gia <= 50000`;
    }else if(gia == 2){
        sql = `SELECT id_sach, ten_sach, gia, so_luong_ton, image_sach_url FROM ${tableName} WHERE ten_sach like n'%${ten_sach}%' AND nha_xuat_ban like '%${nxb}%' AND the_loai like '%${the_loai}%' AND gia > 50000 AND gia <= 75000`;
    }else if(gia == 3){
        sql = `SELECT id_sach, ten_sach, gia, so_luong_ton, image_sach_url FROM ${tableName} WHERE ten_sach like n'%${ten_sach}%' AND nha_xuat_ban like '%${nxb}%' AND the_loai like '%${the_loai}%' AND gia >75000 0 AND gia <= 100000`;
    }else if(gia == 4){
        sql = `SELECT id_sach, ten_sach, gia, so_luong_ton, image_sach_url FROM ${tableName} WHERE ten_sach like n'%${ten_sach}%' AND nha_xuat_ban like '%${nxb}%' AND the_loai like '%${the_loai}%' AND gia > 100000`;
    }

    var defer = q.defer();
    var arr = [];
    var query = connection.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        result.forEach(element => {
            arr.push({id_sach : element.id_sach, ten_sach : element.ten_sach, 
                gia : element.gia, so_luong_ton : element.so_luong_ton,
                image_sach_url : element.image_sach_url});
        });
        defer.resolve({arr});
    });
    return defer.promise;
}

// Lấy sách từ ID sách
function getBookbyID(ID){
    if(ID){
        var defer = q.defer();
        
        var query = connection.query("SELECT * FROM sach WHERE ?",{id_sach: ID}, function(err, result){
            if(err){
                defer.reject(err)
            }
            else
            {
                defer.resolve(result)
            }
        })
        return defer.promise
    }
    return false
}

// Lấy danh sách sách theo ID thể loại
function getBookbyIDCategory(ID){
    if(ID){
        var defer = q.defer();
        var query = connection.query("SELECT * FROM sach WHERE ?", {the_loai: ID}, function(err, result){
            if(err){
                defer.reject(err)
            }
            else
            {
                defer.resolve(result)
            }
        })
        return defer.promise
    }
    return false
}
// Lấy sách từ ID tác giả
function getBookbyIDAuthor(ID){
    if(ID){
        var defer = q.defer();
        
        var query = connection.query("SELECT * FROM sach_tac_gia WHERE ?", {id_tac_gia: ID}, function(err, result){
            if(err){
                defer.reject(err)
            }
            else
            {
                var len = result.length
                var arr = []
                for(var i = 0; i < len; i++){
                    if(i != len - 1){
                        var Sach = getBookbyID(result[i].id_sach)
                        Sach.then(function(data){
                            sach = data[0]
                            arr.push(sach)
                        })
                    }
                    else{
                        var Sach = getBookbyID(result[i].id_sach)
                        Sach.then(function(data){
                            sach = data[0]
                            arr.push(sach)
                            defer.resolve(arr)
                        })
                    }
                    
                }
            }
        })
        return defer.promise
    }
    return false
}
// Lấy danh sách sách có tên nhà xuất bản Name
function getBookbyNamePublihser(Name){
    if(Name){
        var defer = q.defer();
        
        var query = connection.query("SELECT * FROM sach WHERE ?",{nha_xuat_ban: Name}, function(err, result){
            if(err){
                defer.reject(err)
            }
            else
            {
                defer.resolve(result)
            }
        })
        return defer.promise
    }
    return false
}

// Giảm số lượng sách
function UpdateNumberBook(IDbook, newNuber){
    var query = connection.query("UPDATE sach SET so_luong_ton = ? WHERE id_sach = ?", [newNuber, IDbook], (err, result) => {
        if(err) {
            throw err;
        }
    })
}

// Xóa sách khỏi database
function DeleteBook(IDBook){
    if(IDBook){
        // Xóa ID sách trong bang sach_tac_gia:
        var query = connection.query("DELETE FROM sach_tac_gia WHERE ?",{id_sach: IDBook}, function(err, result){
            if(err){
                throw err;
            }
        })
        // Xóa ID sách trong bảng sach
        var query = connection.query("DELETE FROM sach WHERE ?",{id_sach: IDBook}, function(err, result){
            if(err){
                throw err;
            }
        })
        console.log("Deleted book " + IDBook);
    }
}

function checkIDIsExisted(id) {
    if (id) {
        var defer = q.defer();
        var sql = `SELECT * FROM ${tableName} WHERE id_sach = ?`;
        var query = connection.query(sql, [id], function (err, result, fields) {
            if (err) defer.reject(err);
            if (result.length == 0) {
                console.log(0);
                defer.resolve(false);

            } else {
                console.log(1);
                defer.resolve(true);
            }
        });
        return defer.promise;

    }
    return false;
}

// Insert
function addNewBook(book) {
    if (book) {
        var defer = q.defer();
        var sql = `INSERT INTO ${tableName} values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        var query = connection.query(sql, [book.id_sach, book.ten_sach, book.the_loai, book.nha_xuat_ban, book.nam_xuat_ban, book.khuyen_mai, book.gia, book.so_luong_ton, book.chat_luong, book.image_sach_url, book.doc_truoc], function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}
function updateBook(id, bookNew) {
    if (id && bookNew) {
        var defer = q.defer();
        var sql = `UPDATE ${tableName} SET ten_sach = ? , the_loai = ? , nha_xuat_ban = ?, nam_xuat_ban = ?, khuyen_mai = ?, gia = ?, so_luong_ton = ? , doc_truoc = ? WHERE id_sach = ?`;
        var query = connection.query(sql, [bookNew.ten_sach, bookNew.the_loai, bookNew.nha_xuat_ban, bookNew.nam_xuat_ban, bookNew.khuyen_mai, bookNew.gia, bookNew.so_luong_ton, bookNew.doc_truoc, id], function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

module.exports = {
    getInforBooksForHome : getInforBooksForHome,
    getInforBooksForHomeByCategory : getInforBooksForHomeByCategory,
    getBookbyID: getBookbyID,
    getBookbyIDCategory: getBookbyIDCategory,
    getBookbyIDAuthor: getBookbyIDAuthor,
    getBookbyNamePublihser: getBookbyNamePublihser,
    UpdateNumberBook: UpdateNumberBook,
    DeleteBook: DeleteBook,
    checkIDIsExisted: checkIDIsExisted,
    addNewBook: addNewBook,
    updateBook: updateBook,
    getInforBookForSearchHome : getInforBookForSearchHome
}