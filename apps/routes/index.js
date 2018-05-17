var express = require("express");

var router = express.Router();

var bookController = require("../controllers/booksController")
var authorController = require("../controllers/authorsController");
var publisherController = require("../controllers/publisherController");

router.use("/catalog", require(__dirname + "/catalog.js"));
router.use("/customer", require(__dirname + "/customer.js"));
router.use("/staff", require(__dirname + "/staff.js"));
router.use("/manager", require(__dirname + "/manager.js"));

router.get("/", function(req, res){
    res.json({message : "index"});
});

router.get("/Sach/:id", bookController.getBookbyID)
router.get("/Author/:id", authorController.GetAuthorbyID)
router.get("/Publisher/:Name", publisherController.getPublisherByName)

module.exports = router;