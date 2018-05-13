var q = require("q");
var db = require("../common/database");

var connection = db.getConnection();

// Lấy ID tác giả theo ID sách
function getAuthorbyIDBook(ID){
    if(ID){
        var defer = q.defer();
        var query = connection.query("SELECT * FROM sach_tac_gia WHERE ?", {id_sach: ID}, function(err, result){
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
// Lấy tên tác giả theo ID tác giả
function getAuthorbyID(ID){
    if(ID){
        var defer = q.defer();
        var query = connection.query("SELECT * FROM tac_gia WHERE ?", {id_tac_gia: ID}, function(err, result){
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
    getAuthorbyIDBook: getAuthorbyIDBook,
    getAuthorbyID: getAuthorbyID
}