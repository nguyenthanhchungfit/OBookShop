var q = require("q");
var db = require("../common/database");

var connection = db.getConnection();
const tableName = "sach";

function GetCart(){
    var defer = q.defer();
        
        var query = connection.query("SELECT * FROM don_hang", function(err, result){
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

function getNumberCart(){
    var defer = q.defer();
        
        var query = connection.query("SELECT * FROM don_hang", function(err, result){
            if(err){
                defer.reject(err)
            }
            else
            {
                defer.resolve(result.length)
            }
        })
        return defer.promise
}

function AddCartToDatabase(Cart){
    var sql = "INSERT INTO don_hang SET ?"
    var query = connection.query(sql, Cart, (err, result) => {
        if(err) {
            throw err;
        }
    }) 
}

function AddDetailCartToDatabase(Detail_Cart){
    var sql = "INSERT INTO chi_tiet_don_hang SET ?"
    var query = connection.query(sql, Detail_Cart, (err, result) => {
        if(err) {
            throw err;
        }
    })
}

module.exports = {
    GetCart: GetCart,
    getNumberCart: getNumberCart,
    AddCartToDatabase: AddCartToDatabase,
    AddDetailCartToDatabase: AddDetailCartToDatabase
}