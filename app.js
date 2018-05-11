var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");

var app = express();

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// set template view
app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");

// static folder
app.use("/static", express.static(__dirname + "/public"));

// router
var route = require(__dirname + "/apps/routes/index");
app.use('/', route);

// config
var host = config.get("server.host");
var port = config.get("server.port");

app.listen(port, host, function(){
    console.log("Server is running on port", port);
})

