
var db = require("../common/database");
var q = require("q");
var conn = db.getConnection();

const tableName = "khach_hang";

var customerDataCaching;

function getCustomerDataFromDB(){
    var defer = q.defer();
    var sql = `SELECT * FROM ${tableName}`;
    var arr = [];
    var query = conn.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        result.forEach(element =>{
            arr.push({username : element.username, email : element.email, so_dien_thoai : element.so_dien_thoai});
        });
        defer.resolve(arr);
    });
    return defer.promise;
}

function updateCustomerDataCaching(){
    customerDataCaching = [];
    getCustomerDataFromDB().then(function(data){       
        customerDataCaching = data;
    }).catch(function(err){
        console.log("customerModels: ", err);
    });
}

updateCustomerDataCaching();

// validator
function checkEmailIsExisted(email){
    var flag = false;
    if(email){
        if(customerDataCaching.length == 0){
            updateCustomerDataCaching();
        }
        customerDataCaching.forEach(element => {
            if(element.email === email){
                flag = true;
                return;
            }
        });    
    }
    return flag;
}

function checkUserIsExisted(username){
    var flag = false;
    if(username){
        if(customerDataCaching.length == 0){
            updateCustomerDataCaching();
        }
        customerDataCaching.forEach(element => {
            if(element.username === username){
                flag = true;
                return;
            }
        });    
    } 
    return flag;
}

function checkPhoneNumberIsExisted(phone){
    var flag = false;
    if(phone){
        if(customerDataCaching.length == 0){
            updateCustomerDataCaching();
        }
        customerDataCaching.forEach(element => {
            if(element.so_dien_thoai === phone){
                flag = true;
                return;
            }
        });    
    }
    return flag;
}

// Insert
function addNewCustomer(customer){
    if(customer){
        var defer = q.defer();
        var sql = `INSERT INTO ${tableName} SET ?`;
        var query = conn.query(sql, customer, function(err, result){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
}

// Update


// Delete

module.exports = {
    checkEmailIsExisted : checkEmailIsExisted,
    checkPhoneNumberIsExisted : checkPhoneNumberIsExisted,
    checkUserIsExisted : checkUserIsExisted,
    addNewCustomer : addNewCustomer
}