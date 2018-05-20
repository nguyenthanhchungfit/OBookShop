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

function UpdateCartToDatabase(cart){
    console.log(cart)
    var query = connection.query("UPDATE don_hang SET nguoi_nhan = ?, nguoi_gui = ?, dia_chi = ?, so_dien_thoai = ?, ngay_mua = ?, trang_thai = ? WHERE ma_don_hang = ?",
     [cart.nguoi_nhan, cart.nguoi_gui, cart.dia_chi, cart.so_dien_thoai, cart.ngay_mua, cart.trang_thai, cart.ma_don_hang], (err, result) => {
        if(err) {
            throw err;
        }
    })
}

module.exports = {
    GetCart: GetCart,
    getNumberCart: getNumberCart,
    AddCartToDatabase: AddCartToDatabase,
    AddDetailCartToDatabase: AddDetailCartToDatabase,
    getCartByID: getCartByID,
    UpdateCartToDatabase: UpdateCartToDatabase
}