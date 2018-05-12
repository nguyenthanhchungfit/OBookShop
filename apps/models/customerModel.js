
var db = require("../common/database");
var q = require("q");
var conn = db.getConnection();

const tableName = "khach_hang";

// validator
function checkEmailIsExisted(email){
    if(email){
        var defer = q.defer();
        var sql = `SELECT email FROM ${tableName} WHERE email = "${email}"`;
        var query = conn.query(sql, function(err, result, fields){
            if(err) defer.reject(err);
            if(result.length == 0){
                defer.resolve(0);
            }else{
                defer.resolve(1);
            }
        });
        return defer.promise;
    }
    return false;

}

function checkUserIsExisted(username){
    if(username){
        var defer = q.defer();
        var sql = `SELECT username FROM ${tableName} WHERE username = "${username}"`;
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

function checkPhoneNumberIsExisted(phone){
    if(phone){
        var defer = q.defer();
        var sql = `SELECT so_dien_thoai FROM ${tableName} WHERE so_dien_thoai = "${phone}"`;
        var query = conn.query(sql, function(err, result, fields){
            if(err) throw err;
            if(result.length == 0){                
                defer.resolve(0);
            }else{
                defer.resolve(1);
            }
        });
        return defer.promise;
    }
    return false;
}

// Insert
function addNewCustomer(customer){
    if(customer){
        var defer = q.defer();
        var sql = `INSERT INTO ${tableName} SET ?`;
        var query = conn.query(sql, user, function(err, result){
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


// Delete

module.exports = {
    checkEmailIsExisted : checkEmailIsExisted,
    checkPhoneNumberIsExisted : checkPhoneNumberIsExisted,
    checkUserIsExisted : checkUserIsExisted,
    addNewCustomer : addNewCustomer
}