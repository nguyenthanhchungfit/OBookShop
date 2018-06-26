var db = require("../common/database");
var q = require("q");
var conn = db.getConnection();

const tableDonHang = "don_hang";
const tableChiTiet = "chi_tiet_don_hang"


function getDataFrom2DB(username){
    var defer = q.defer();
    var sql = `SELECT dh.ma_don_hang, dh.ngay_mua, ct.thanh_tien, dh.trang_thai, ct.ten_sach from don_hang as dh JOIN chi_tiet_don_hang as ct
        ON dh.ma_don_hang = ct.ma_don_hang AND dh.nguoi_gui = '${username}';`;
    var arr = [];
    var query = conn.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        result.forEach(element =>{
            arr.push({ma_don_hang : element.ma_don_hang, ngay_mua : element.ngay_mua, thanh_tien : element.thanh_tien,
                trang_thai : element.trang_thai, ten_sach : element.ten_sach});
        });
        defer.resolve(arr);
    });
    return defer.promise;
}
function top10Book() {
    var defer = q.defer();
    var sql = `SELECT id_sach, SUM(so_luong) so_luong_sach, thanh_tien FROM ${tableChiTiet} GROUP BY id_sach ORDER BY so_luong_sach DESC LIMIT 10;`;
    var arr = [];
    var query = conn.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        result.forEach(element =>{
            arr.push({id_sach : element.id_sach, so_luong_sach : element.so_luong_sach, thanh_tien : element.thanh_tien});
        });
        defer.resolve({arr});
    });
    return defer.promise;
}
function statisticsYear(year) {
    var defer = q.defer();
    var sql = `SELECT SUM(thanh_tien) tong_nam FROM ${tableDonHang} dh JOIN ${tableChiTiet} ct ON dh.ma_don_hang = ct.ma_don_hang WHERE YEAR(ngay_mua) = ${year};`;
    var arr = [];
    var query = conn.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        result.forEach(element =>{
            arr.push({tong_nam : element.tong_nam});
        });
        defer.resolve({arr});
    });
    return defer.promise;
}

function statisticsMonth(month, year) {
    var defer = q.defer();
    var sql = `SELECT SUM(thanh_tien) tong_thang FROM ${tableDonHang} dh JOIN ${tableChiTiet} ct ON dh.ma_don_hang = ct.ma_don_hang WHERE MONTH(ngay_mua) = ${month} AND YEAR(ngay_mua) = ${year};`;
    var arr = [];
    var query = conn.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        result.forEach(element =>{  
            arr.push({tong_thang : element.tong_thang});
        });
        defer.resolve({arr});
    });
    return defer.promise;
}
function statisticsDay(date) {
    var defer = q.defer();
    var sql = `SELECT SUM(thanh_tien) tong_ngay FROM ${tableDonHang} dh JOIN ${tableChiTiet} ct ON dh.ma_don_hang = ct.ma_don_hang WHERE DATE(ngay_mua) = '${date}';`;
    var arr = [];
    var query = conn.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        result.forEach(element =>{  
            arr.push({tong_ngay : element.tong_ngay});
        });
        defer.resolve({arr});
    });
    return defer.promise;
}
function statisticsWeek(week, year) {
    var defer = q.defer();
    var sql = `SELECT SUM(thanh_tien) tong_tuan FROM ${tableDonHang} dh JOIN ${tableChiTiet} ct ON dh.ma_don_hang = ct.ma_don_hang WHERE WEEK(ngay_mua) = ${week} AND YEAR(ngay_mua) = ${year};`;
    var arr = [];
    var query = conn.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        result.forEach(element =>{  
            arr.push({tong_tuan : element.tong_tuan});
        });
        defer.resolve({arr});
    });
    return defer.promise;
}
// Quý: nhận 1,2,3,4
function statisticsTrimester(trimester, year) {
    var defer = q.defer();
    // Tháng cuối của quý 3 6 9 12 
    var max = trimester * 3;
    var min = max - 2;
    var sql = `SELECT SUM(thanh_tien) tong_quy FROM ${tableDonHang} dh JOIN ${tableChiTiet} ct ON dh.ma_don_hang = ct.ma_don_hang WHERE MONTH(ngay_mua) >= ${min} AND MONTH(ngay_mua) <= ${max};`;
    var arr = [];
    var query = conn.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        result.forEach(element =>{  
            arr.push({tong_quy : element.tong_quy});
        });
        defer.resolve({arr});
    });
    return defer.promise;
}
function returnData(username){
    var result = [];
    var flag;
    var element;
    var ele;
    getDataFrom2DB(username).then(function(data){
        for(var i = 0; i < data.length; i++){
            flag = false;
            element = data[i];
            for(var j = 0; j < result.length; j++){
                ele = result[j];
                if(element.ma_don_hang == ele.ma_don_hang){
                    ele.thanh_tien += element.thanh_tien;
                    ele.ten_sach += " - " + element.ten_sach; 
                    flag = true;
                    break;
                }
            }
            if(flag == false){
                if(element.trang_thai == 0){
                    element.trang_thai = "Xác nhận đóng gói";
                }else if(element.trang_thai == 1){
                    element.trang_thai = "Lấy hàng từ kho";
                }else if(element.trang_thai == 2){
                    element.trang_thai = "Bắt đầu giao hàng";
                }else if(element.trang_thai == 3){
                    element.trang_thai = "Hoàn tất giao hàng";
                }
                result.push(element);
            }
        };
        return result;
    });

}
module.exports = {
    getDataFrom2DB : getDataFrom2DB,
    returnData : returnData,
    top10Book : top10Book,
    statisticsYear : statisticsYear,
    statisticsMonth : statisticsMonth,
    statisticsDay : statisticsDay,
    statisticsWeek : statisticsWeek,
    statisticsTrimester : statisticsTrimester
};