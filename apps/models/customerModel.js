var db = require("../common/database");
var q = require("q");
var conn = db.getConnection();
var pw_encrypt = require("../helpers/password_encryption");

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

function GetCustomerByUsername(user){
    if(user){
        var defer = q.defer();
        
        var query = conn.query("SELECT * FROM khach_hang WHERE ?",{username: user}, function(err, result){
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

function checkEmailIsExistedWithUsername(username, email){
    var flag = false;
    if(email && username){
        if(customerDataCaching.length == 0){
            updateCustomerDataCaching();
        }
        customerDataCaching.forEach(element => {
            if(element.email === email && username != element.username){
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

function checkPhoneNumberIsExistedWithUsername(username, phone){
    var flag = false;
    if(phone && username){
        if(customerDataCaching.length == 0){
            updateCustomerDataCaching();
        }
        customerDataCaching.forEach(element => {
            if(element.so_dien_thoai === phone && element.username != username){
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
        var sql = `SELECT * FROM ${tableName} WHERE username='${username}'`;
        //var sql = `SELECT * FROM khach_hang`;
        conn.query(sql, function(err, result, fields){
            if(err) defer.reject(err);
            var password = "";
            console.log(result);
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
                defer.resolve(pw_encrypt.comparePassword(password, data));
            }).catch(function(err){
                defer.reject(err);
            });
        }else{
            defer.resolve(false);
        }
    }
    return defer.promise; 
}

function getInforDanhSachNguoiDung(){
    var defer = q.defer();
    var sql = `SELECT * FROM ${tableName}`;
    var arr = [];
    var query = conn.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        result.forEach(element =>{
            arr.push({username : element.username, email : element.email, so_dien_thoai : element.so_dien_thoai,
                ho_ten: element.ho_ten, dia_chi : element.dia_chi, gioi_tinh : element.gioi_tinh
            });
        });
        defer.resolve({arr});
    });
    return defer.promise;
}

function getInforCustomerByUsername(username){
    var defer = q.defer();
    var user;
    var sql = `SELECT * FROM ${tableName} WHERE username = '${username}'`;
    var query = conn.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        result.forEach(element =>{
            user = element;
        });
        defer.resolve({user});
    });
    return defer.promise;
}

function getImageUrlByUsername(username){
    var defer = q.defer();
    var user;
    var sql = `SELECT image_url FROM ${tableName} WHERE username = '${username}'`;
    var query = conn.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        result.forEach(element =>{
            user = element;
        });
        defer.resolve({user});
    });
    return defer.promise;
}


// Insert
function addNewCustomerToCaching(customer){
    var customerCache = {username: customer.username, email : customer.email, so_dien_thoai : customer.so_dien_thoai};
    if(customerDataCaching){
        customerDataCaching.push(customerCache);
    }
}

function addNewCustomer(customer){
    if(customer){
        customer.password = pw_encrypt.encrypt_password(customer.password);
        var defer = q.defer();
        var sql = `INSERT INTO ${tableName} SET ?`;
        var query = conn.query(sql, customer, function(err, result){
            if(err){
                defer.reject(err);
            }else{
                addNewCustomerToCaching(customer);
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
}

// Update
function updateNewPassword(username, password){
    var defer = q.defer();
    if(username && password){
        var en_password = pw_encrypt.encrypt_password(password);
        var sql = `UPDATE ${tableName} SET password='${en_password}' WHERE username='${username}'`;
        conn.query(sql, function(err, result, fields){
            if(err) defer.reject(err);
            if(result.affectedRows == 1){
                defer.resolve(true);
            }else{
                defer.resolve(false);
            } 
        });
        return defer.promise;
    }else{
        return false;
    }
}
function UpdatePoint(user, diem){
    var query = conn.query("UPDATE khach_hang SET diem_tich_luy = ? WHERE username = ?", [diem, user], (err) => {
        if(err) {
            throw err;
        }
    })
}

function updateNewInformation(username, new_user){
    var defer = q.defer();
    if(username && new_user){
        var sql = `UPDATE ${tableName} SET email='${new_user.email}', ho_ten=n'${new_user.ho_ten}', gioi_tinh=${new_user.gioi_tinh}, so_dien_thoai='${new_user.so_dien_thoai}', dia_chi=n'${new_user.dia_chi}'  WHERE username='${username}'`;
        conn.query(sql, function(err, result, fields){
            if(err) defer.reject(err);
            if(result.affectedRows == 1){
                defer.resolve(true);
                updateCustomerDataCaching();
            }else{
                defer.resolve(false);
            } 
        });
        return defer.promise;
    }else{
        return false;
    }
}

// Delete

module.exports = {
    checkEmailIsExisted : checkEmailIsExisted,
    checkPhoneNumberIsExisted : checkPhoneNumberIsExisted,
    checkUserIsExisted : checkUserIsExisted,
    addNewCustomer : addNewCustomer,
    isValidAccount : isValidAccount,
    getInforDanhSachNguoiDung : getInforDanhSachNguoiDung,
    getInforCustomerByUsername : getInforCustomerByUsername,
    updateNewPassword : updateNewPassword,
    getImageUrlByUsername : getImageUrlByUsername,
    checkEmailIsExistedWithUsername : checkEmailIsExistedWithUsername,
    checkPhoneNumberIsExistedWithUsername : checkPhoneNumberIsExistedWithUsername,
    updateNewInformation : updateNewInformation,
    GetCustomerByUsername: GetCustomerByUsername,
    UpdatePoint: UpdatePoint

}