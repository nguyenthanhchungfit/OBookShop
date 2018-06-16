var db = require("../common/database");
var q = require("q");
var pw_encrypt = require("../helpers/password_encryption");
var conn = db.getConnection();

const tableName = "nhan_vien";

var staffDataCaching;

function getStaffDataFromDB(){
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

function updatestaffDataCaching(){
    staffDataCaching = [];
    getStaffDataFromDB().then(function(data){       
        staffDataCaching = data;
    }).catch(function(err){
        console.log("StaffModels: ", err);
    });
}

updatestaffDataCaching();

// validator
function checkEmailIsExisted(email){
    var flag = false;
    if(email){
        if(staffDataCaching.length == 0){
            updatestaffDataCaching();
        }
        staffDataCaching.forEach(element => {
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
        if(staffDataCaching.length == 0){
            updatestaffDataCaching();
        }
        staffDataCaching.forEach(element => {
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
        if(staffDataCaching.length == 0){
            updatestaffDataCaching();
        }
        staffDataCaching.forEach(element => {
            if(element.so_dien_thoai === phone){
                flag = true;
                return;
            }
        });    
    }
    return flag;
}


function getPasswordByUsername(username){
    if(username){
        var defer = q.defer();
        var sql = `SELECT password FROM ${tableName} WHERE username='${username}'`;
        conn.query(sql, function(err, result, fields){
            if(err) defer.reject(err);
            var password = "";
            if(result.length > 0){
                password = result[0].password;
            }
            defer.resolve(password);
        });
        return defer.promise;
    }
}

function isValidAccount(username, password){
    var defer = q.defer();
    if(username && password){
        if(checkUserIsExisted(username)){
            console.log("done username");
            getPasswordByUsername(username).then(function(data){
                console.log("flag", data);
                defer.resolve(pw_encrypt.comparePassword(password, data));
            }).catch(function(err){
                console.log("customer - isValidAccount: ", err);
                defer.reject(err);
            });
        }else{
            defer.resolve(false);
        }
    }
    return defer.promise; 
}

function getInforDanhSachNhanvien(){
    var defer = q.defer();
    var sql = `SELECT * FROM ${tableName}`;
    var arr = [];
    var query = conn.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        result.forEach(element =>{
            arr.push({username : element.username, email : element.email, so_dien_thoai : element.so_dien_thoai,
                ho_ten: element.ho_ten, dia_chi : element.dia_chi
            });
        });
        defer.resolve({arr});
    });
    return defer.promise;
}

// Insert
function addNewStaff(staff){
    if(staff){
        staff.password = pw_encrypt.encrypt_password(staff.password);
        var defer = q.defer();
        var sql = `INSERT INTO ${tableName} SET ?`;
        var query = conn.query(sql, staff, function(err, result){
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
    addNewStaff : addNewStaff,
    isValidAccount : isValidAccount,
    getInforDanhSachNhanvien : getInforDanhSachNhanvien
}