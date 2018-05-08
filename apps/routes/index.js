var express = require("express");

var router = express.Router();

router.use("/catalog", require(__dirname + "/catalog.js"));

router.get("/", function(req, res){
    res.json({message : "index"});
});

module.exports = router;