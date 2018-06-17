var q = require("q");
var db = require("../common/database");

var connection = db.getConnection();

// Lấy danh sách tác giả
function getAuthor() {
    var arr = [];
    var defer = q.defer();
    var query = connection.query("SELECT * FROM tac_gia", function (err, result) {
        if (err) defer.reject(err);
        result.forEach(element => {
            arr.push({ id_tac_gia: element.id_tac_gia, ten_tac_gia: element.ten_tac_gia, nam_sinh: element.nam_sinh, que_quan: element.que_quan });
        });
        defer.resolve({arr});
    })
    return defer.promise
}

// Lấy ID tác giả theo ID sách
function getAuthorbyIDBook(ID) {
    if (ID) {
        var defer = q.defer();
        var query = connection.query("SELECT * FROM sach_tac_gia WHERE ?", { id_sach: ID }, function (err, result) {
            if (err) {
                defer.reject(err)
            }
            else
            {   
                if(result[0]){
                    defer.resolve(result);
                }
                else{
                    var result = "Không xác định";
                    defer.resolve(result);
                }
                
            }
        })
        return defer.promise
    }
    return false
}

function addNewAuthorofBook(author, book){
    if (author && book) {
        var defer = q.defer();
        var sql = `INSERT INTO sach_tac_gia VALUES ( ? , ? )`;
        var query = connection.query(sql, [author, book], function (err, result) {
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
// Lấy tên tác giả theo ID tác giả
function getAuthorbyID(ID) {
    if (ID) {
        var defer = q.defer();
        var query = connection.query("SELECT * FROM tac_gia WHERE ?", { id_tac_gia: ID }, function (err, result) {
            if (err) {
                defer.reject(err)
            }
            else
            {
                defer.resolve(result);
            }
        })
        return defer.promise
    }
    return false
}

// validator
function checkIDIsExisted(id) {
    if (id) {
        var defer = q.defer();
        var sql = `SELECT * FROM tac_gia WHERE id_tac_gia = ?`;
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
function addNewAuthor(author) {
    if (author) {
        var defer = q.defer();
        var sql = `INSERT INTO tac_gia VALUES ( ? , ? , ?, ? )`;
        var query = connection.query(sql, [author.id, author.ten, author.nam_sinh, author.que_quan], function (err, result) {
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

// Update
function updateAuthor(id, authorNew) {
    if (id && authorNew) {
        var defer = q.defer();
        var sql = `UPDATE tac_gia SET ten_tac_gia = ? , nam_sinh = ? , que_quan = ? WHERE id_tac_gia = ?`;
        var query = connection.query(sql, [authorNew.ten, authorNew.nam_sinh, authorNew.que_quan, id], function (err, result) {
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

// Xóa tác giả khỏi database
function Delete_Author(ID_TG){
    if(ID_TG){
        // Xóa ID TG trong bang sach_tac_gia:
        var query = connection.query("DELETE FROM sach_tac_gia WHERE ?",{id_tac_gia: ID_TG}, function(err, result){
            if(err){
                throw err;
            }
        })
        // Xóa ID sách trong bảng sach
        var query = connection.query("DELETE FROM tac_gia WHERE ?",{id_tac_gia: ID_TG}, function(err, result){
            if(err){
                throw err;
            }
        })
        console.log("Deleted Author " + ID_TG);
    }
}

// Kiểm tra mã sách có tồn tại trong sach_tac_gia không
function CheckIDBook_IDAuthor(IDBook){
    var query = connection.query("SELECT * FROM tac_gia", function(err, result){
        if(err){
            defer.reject(err)
        }
        else
        {
            var len = result.length;
            for(var i = 0; i < len; ++i){
                if(IDBook == result[i].id_sach)
                    return true;
            }
        }
    })
    return fasle;
}

module.exports = {
    getAuthorbyIDBook: getAuthorbyIDBook,
    getAuthorbyID: getAuthorbyID,
    checkIDIsExisted: checkIDIsExisted,
    addNewAuthor: addNewAuthor,
    updateAuthor: updateAuthor,
    getAuthor: getAuthor,
    addNewAuthorofBook: addNewAuthorofBook,
    CheckIDBook_IDAuthor: CheckIDBook_IDAuthor,
    Delete_Author: Delete_Author
}