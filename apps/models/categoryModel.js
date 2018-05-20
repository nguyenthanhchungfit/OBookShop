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
// validator
function checkIDIsExisted(id){
    if(id){
        var defer = q.defer();
        var sql = `SELECT * FROM ${tableName} WHERE id_the_loai = ?`;
        var query = connection.query(sql, [id], function(err, result, fields){
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
function addNewCategory(category){
    if(category){
        var defer = q.defer();
        var sql = `INSERT INTO ${tableName} VALUES ( ? , ? )`;
        var query = connection.query(sql, [category.id, category.ten_the_loai], function(err, result){
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
function updateCategory(id, categoryNew){
    if(id && categoryNew){
        var defer = q.defer();
        var sql = `UPDATE ${tableName} SET ten_the_loai = ? WHERE id_the_loai = ?`;
        var query = connection.query(sql, [categoryNew.ten_the_loai, id], function(err, result){
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

module.exports = {
    getCategories : getCategories,
    getCategorybyID: getCategorybyID,
    addNewCategory : addNewCategory,
    updateCategory : updateCategory,
    checkIDIsExisted : checkIDIsExisted
}


