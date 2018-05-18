var q = require("q");
var db = require("../common/database");

var connection = db.getConnection();

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

module.exports = {
    getPublisher: getPublisher,
    getPublisherbyName: getPublisherbyName
}