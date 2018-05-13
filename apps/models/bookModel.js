var q = require("q");
var db = require("../common/database");

var connection = db.getConnection();
const tableName = "sach";


function getInfor(){
    console.log("Helo");
    var sql = "SELECT * FROM sach";
    var query = connection.query(sql, function(err, result, fields){
        if(err) throw err;
        console.log(fields);
    });
}

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

module.exports = {
    getInfor : getInfor,
    getInforBooksForHome : getInforBooksForHome,
    getInforBooksForHomeByCategory : getInforBooksForHomeByCategory
}