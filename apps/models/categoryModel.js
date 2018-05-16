var q = require("q");
var db = require("../common/database");

const tableName = "the_loai";
var connection = db.getConnection();

function getCategories(){
    var sql = `SELECT * FROM ${tableName}`;
    var defer = q.defer();
    var arr = [];
    var query = connection.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        result.forEach(element => {
            arr.push({id_the_loai: element.id_the_loai, ten_the_loai : element.ten_the_loai});
        });
        defer.resolve({arr});
    });
    return defer.promise;
}

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
    getCategories : getCategories,
    getCategorybyID: getCategorybyID
}


