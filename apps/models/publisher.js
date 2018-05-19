var db = require("../common/database");
var q = require("q");
var conn = db.getConnection();

const tableName = "nha_xuat_ban";

// validator
function checkNameIsExisted(name){
    if(name){
        var defer = q.defer();
        var sql = `SELECT * FROM ${tableName} WHERE ten_nxb = "${name}"`;
        var query = conn.query(sql, function(err, result, fields){
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
        var query = conn.query(sql, [publisher.ten_nxb, publisher.nam_thanh_lap, publisher.dia_chi], function(err, result){
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
    checkNameIsExisted: checkNameIsExisted,
    addNewPublisher: addNewPublisher
}