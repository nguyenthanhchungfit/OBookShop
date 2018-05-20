var config = require("config");
var mysql = require("mysql");

var connection;

function handleDisconnect(){
    connection = mysql.createConnection({
        host : config.get("mysql.host"),
        user : config.get("mysql.user"),
        password : config.get("mysql.password"),
        database : config.get("mysql.database"),
        port : config.get("mysql.port")
    });

    connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
          console.log('error when connecting to db:', err);
          setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
      });  

    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
          handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
          throw err;                                  // server variable configures this)
        }
    });
}


handleDisconnect();

function getConnection(){
    if(!connection){
        handleDisconnect();
    }
    return connection;
}



module.exports = {
    getConnection : getConnection
}