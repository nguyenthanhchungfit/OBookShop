var q = require("q");
var db = require("../common/database");

var connection = db.getConnection();
const tableName = "nha_xuat_ban";
// Lấy danh sách nhà xuất bản
function getPublisher() {
    var arr = [];
    var defer = q.defer();
    var query = connection.query("SELECT * FROM nha_xuat_ban", function (err, result) {
        if (err) defer.reject(err);
        result.forEach(element => {
            arr.push({ ten_nxb: element.ten_nxb, nam_thanh_lap: element.nam_thanh_lap, dia_chi : element.dia_chi });
        });
        defer.resolve({ arr });
    })
    return defer.promise
}

// Lấy thông tin nhà xuất bản từ Tên NXB
function getPublisherbyName(Name) {
    if (Name) {
        var defer = q.defer();
        var query = connection.query("SELECT * FROM nha_xuat_ban WHERE ?", { ten_nxb: Name }, function (err, result) {
            if (err) {
                defer.reject(err)
            }
            else {
                defer.resolve(result)
            }
        })
        return defer.promise
    }
    return false
}


// validator
function checkNameIsExisted(name) {
    if (name) {
        var defer = q.defer();
        var sql = `SELECT * FROM ${tableName} WHERE ten_nxb = "${name}"`;
        var query = connection.query(sql, function (err, result, fields) {
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
function addNewPublisher(publisher) {
    if (publisher) {
        var defer = q.defer();
        var sql = `INSERT INTO ${tableName} VALUES ( ? , ? , ? )`;
        var query = connection.query(sql, [publisher.ten_nxb, publisher.nam_thanh_lap, publisher.dia_chi], function (err, result) {
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
function updatePublisher(id, publisherNew) {
    if (id && publisherNew) {
        var defer = q.defer();
        var sql = `UPDATE ${tableName} SET nam_thanh_lap = ? , dia_chi = ?  WHERE ten_nxb = ?`;
        var query = connection.query(sql, [publisherNew.nam_thanh_lap, publisherNew.dia_chi, id], function (err, result) {
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

// Xóa nhà xuất bản
function Delete_Publisher(Name){
    if(Name){
        // Xóa nxb trong bang sach
        var query = connection.query("UPDATE sach SET nha_xuat_ban = ? WHERE nha_xuat_ban = ?",["Khác", Name], function(err, result){
            if(err){
                throw err;
            }
        })
        // Xóa tên nxb trong bảng nxb
        var query = connection.query("DELETE FROM nha_xuat_ban WHERE ?",{ten_nxb: Name}, function(err, result){
            if(err){
                throw err;
            }
        })
        console.log("Deleted publisher " + Name);
    }
}
module.exports = {
    getPublisher: getPublisher,
    getPublisherbyName: getPublisherbyName,
    checkNameIsExisted: checkNameIsExisted,
    addNewPublisher: addNewPublisher,
    updatePublisher: updatePublisher,
    Delete_Publisher: Delete_Publisher
}