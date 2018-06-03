var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser")
var session = require("express-session");

var app = express();


// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


// cookie-parser
app.use(cookieParser());

app.set('trust proxy', 1);
app.use(session({
    secret : config.get("secret_key"),
    resave : false,
    saveUninitialized : true,
    cookie : {secure : false}
}));

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

app.listen(process.env.PORT || port, host, function(){
    console.log("Server is running on port", port);
})

