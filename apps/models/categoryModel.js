var q = require("q");
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

module.exports = {
    getCategories : getCategories
}
