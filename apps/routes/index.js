var express = require("express");

var router = express.Router();

var bookController = require("../controllers/booksController")

router.use("/catalog", require(__dirname + "/catalog.js"));
router.use("/customer", require(__dirname + "/customer.js"));
router.use("/staff", require(__dirname + "/staff.js"));
router.use("/manager", require(__dirname + "/manager.js"));

router.get("/", function(req, res){
    res.json({message : "index"});
});

router.get("/Sach/:id", bookController.getBookbyID)

module.exports = router;