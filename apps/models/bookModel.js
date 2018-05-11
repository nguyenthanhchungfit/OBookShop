var q = require("q");
var db = require("../common/database");

var connection = db.getConnection();

function getInfor(){
    console.log("Helo");
    var sql = "SELECT * FROM sach";
    var query = connection.query(sql, function(err, result, fields){
        if(err) throw err;
        console.log(fields);
    });
}

module.exports = {
    getInfor : getInfor
}