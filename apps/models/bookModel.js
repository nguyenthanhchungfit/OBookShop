var q = require("q");
var db = require("../common/database");

var connection = db.getConnection();
const tableName = "sach";

function getInforBooksForHome(){
    var sql = `SELECT id_sach, ten_sach, gia, so_luong_ton, image_sach_url FROM ${tableName}`;
    var defer = q.defer();
    var arr = [];
    var query = connection.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        result.forEach(element => {
            arr.push({id_sach : element.id_sach, ten_sach : element.ten_sach, 
                gia : element.gia, so_luong_ton : element.so_luong_ton,
                image_sach_url : element.image_sach_url});
        });
        defer.resolve({arr});
    });
    return defer.promise;
}

function getInforBooksForHomeByCategory(the_loai){
    var sql = `SELECT id_sach, ten_sach, gia, so_luong_ton, image_sach_url FROM ${tableName} WHERE the_loai = "${the_loai}"`;
    var defer = q.defer();
    var arr = [];
    var query = connection.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        result.forEach(element => {
            arr.push({id_sach : element.id_sach, ten_sach : element.ten_sach, 
                gia : element.gia, so_luong_ton : element.so_luong_ton,
                image_sach_url : element.image_sach_url});
        });
        defer.resolve({arr});
    });
    return defer.promise;
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
// Lấy sách từ ID tác giả
function getBookbyIDAuthor(ID){
    if(ID){
        var defer = q.defer();
        
        var query = connection.query("SELECT * FROM sach_tac_gia WHERE ?", {id_tac_gia: ID}, function(err, result){
            if(err){
                defer.reject(err)
            }
            else
            {
                var len = result.length
                var arr = []
                for(var i = 0; i < len; i++){
                    if(i != len - 1){
                        var Sach = getBookbyID(result[i].id_sach)
                        Sach.then(function(data){
                            sach = data[0]
                            arr.push(sach)
                        })
                    }
                    else{
                        var Sach = getBookbyID(result[i].id_sach)
                        Sach.then(function(data){
                        sach = data[0]
                        arr.push(sach)
                        defer.resolve(arr)
                    })
                    }
                    
                }
            }
        })
        return defer.promise
    }
    return false
}


module.exports = {
    getInforBooksForHome : getInforBooksForHome,
    getInforBooksForHomeByCategory : getInforBooksForHomeByCategory,
    getBookbyID: getBookbyID,
    getBookbyIDCategory: getBookbyIDCategory,
    getBookbyIDAuthor: getBookbyIDAuthor
}