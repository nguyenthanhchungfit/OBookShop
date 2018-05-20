var express = require("express");
var router = express.Router();


var homeController = require("../controllers/homeController");
var bookController = require("../controllers/booksController");
var authorController = require("../controllers/authorsController");
var publisherController = require("../controllers/publisherController");

router.use("/category", require(__dirname + "/category.js"));
router.use("/customer", require(__dirname + "/customer.js"));
router.use("/staff", require(__dirname + "/staff.js"));
router.use("/manager", require(__dirname + "/manager.js"));

router.get("/", homeController.index);

router.get("/signup", homeController.get_signup);

router.post("/signup", homeController.post_signup);

router.get("/books", bookController.index);
// Chi tiết sách, thêm sách vào giỏ hàng
router.get("/book/:id", bookController.getBookbyID);
router.post("/book/:id", bookController.AddToCart);
// chi tiết tác giả, nxb
router.get("/author/:id", authorController.GetAuthorbyID);
router.get("/publisher/:Name", publisherController.getPublisherByName);

module.exports = router;