var q = require("q");
var db = require("../common/database");

var connection = db.getConnection();
const tableName = "nha_xuat_ban";
// Lấy danh sách nhà xuất bản
function getPublisher(){
    var defer = q.defer();
        var query = connection.query("SELECT * FROM nha_xuat_ban", function(err, result){
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

// Lấy thông tin nhà xuất bản từ Tên NXB
function getPublisherbyName(Name){
    if(Name){
        var defer = q.defer();
        var query = connection.query("SELECT * FROM nha_xuat_ban WHERE ?", {ten_nxb: Name}, function(err, result){
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


// validator
function checkNameIsExisted(name){
    if(name){
        var defer = q.defer();
        var sql = `SELECT * FROM ${tableName} WHERE ten_nxb = "${name}"`;
        var query = connection.query(sql, function(err, result, fields){
            if(err) defer.reject(err);
            if(result.length == 0){
                console.log(0);
                defer.resolve(false);
                
            }else{
                console.log(1);
                defer.resolve(true);
            }
        });
        return defer.promise;

    }
    return false;
}
// Insert
function addNewPublisher(publisher){
    if(publisher){
        var defer = q.defer();
        var sql = `INSERT INTO ${tableName} VALUES ( ? , ? , ? )`;
        var query = connection.query(sql, [publisher.ten_nxb, publisher.nam_thanh_lap, publisher.dia_chi], function(err, result){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

// Update

module.exports = {
    getPublisher: getPublisher,
    getPublisherbyName: getPublisherbyName,
    checkNameIsExisted: checkNameIsExisted,
    addNewPublisher: addNewPublisher
}