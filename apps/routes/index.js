var express = require("express");

var router = express.Router();

router.use("/catalog", require(__dirname + "/catalog.js"));
router.use("/customer", require(__dirname + "/customer.js"));
router.use("/staff", require(__dirname + "/staff.js"));
router.use("/manager", require(__dirname + "/manager.js"));

router.get("/", function(req, res){
    res.json({message : "index"});
});

module.exports = router;