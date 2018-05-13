var express = require("express");

var router = express.Router();
var homeController = require("../controllers/homeController");
var bookController = require("../controllers/booksController");

router.use("/category", require(__dirname + "/category.js"));
router.use("/customer", require(__dirname + "/customer.js"));
router.use("/staff", require(__dirname + "/staff.js"));
router.use("/manager", require(__dirname + "/manager.js"));

router.get("/", homeController.index);

router.get("/signup", homeController.get_signup);

router.post("/signup", homeController.post_signup);

router.get("/books", bookController.index);

router.get("/Sach/:id", bookController.getBookbyID)

module.exports = router;