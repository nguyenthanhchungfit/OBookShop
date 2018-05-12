var express = require("express");

var router = express.Router();
var homeController = require("../controllers/homeController");

router.use("/catalog", require(__dirname + "/catalog.js"));
router.use("/customer", require(__dirname + "/customer.js"));
router.use("/staff", require(__dirname + "/staff.js"));
router.use("/manager", require(__dirname + "/manager.js"));

router.get("/", function(req, res){
    res.json({message : "index"});
});

router.get("/signup", homeController.get_signup);

router.post("/signup", homeController.post_signup);

module.exports = router;