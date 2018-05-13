var q = require("q");
var db = require("../common/database");

var connection = db.getConnection();

function getInfor(){
    console.log("Helo");
    var sql = "SELECT * FROM sach";
    var query = connection.query(sql, function(err, result, fields){
        if(err) throw err;
        console.log(fields);
    });
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

module.exports = {
    getInfor : getInfor,
    getBookbyID: getBookbyID,
    getBookbyIDCategory: getBookbyIDCategory
}