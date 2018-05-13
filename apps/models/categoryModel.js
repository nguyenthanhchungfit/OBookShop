var q = require("q");
var db = require("../common/database");

var connection = db.getConnection();

// Lấy thể loại theo ID thể loại
function getCategorybyID(ID){
    if(ID){
        var defer = q.defer();
        var query = connection.query("SELECT * FROM the_loai WHERE ?", {id_the_loai: ID}, function(err, result){
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
    getCategorybyID: getCategorybyID
}