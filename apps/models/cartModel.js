var q = require("q");
var db = require("../common/database");

var connection = db.getConnection();
const tableName = "sach";

function getCartByID(ID){
    if(ID){
        var defer = q.defer();
        
        var query = connection.query("SELECT * FROM don_hang WHERE ?",{ma_don_hang: ID}, function(err, result){
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

function getFinalCart(){
    var defer = q.defer();
        
        var query = connection.query("SELECT * FROM don_hang", function(err, result){
            if(err){
                defer.reject(err)
            }
            else
            {
                var len = result.length;
                defer.resolve(result[len - 1]);
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

function UpdateCartToDatabase(ID, trang_thai){
    var query = connection.query("UPDATE don_hang SET trang_thai = ? WHERE ma_don_hang = ?",
     [trang_thai, ID], (err, result) => {
        if(err) {
            throw err;
        }
    })
}

module.exports = {
    GetCart: GetCart,
    getFinalCart: getFinalCart,
    AddCartToDatabase: AddCartToDatabase,
    AddDetailCartToDatabase: AddDetailCartToDatabase,
    getCartByID: getCartByID,
    UpdateCartToDatabase: UpdateCartToDatabase
}