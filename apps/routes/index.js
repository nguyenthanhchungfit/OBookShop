var express = require("express");
var router = express.Router();


var homeController = require("../controllers/homeController");
var bookController = require("../controllers/booksController");
var authorController = require("../controllers/authorsController");
var publisherController = require("../controllers/publisherController");
var cardController = require("../controllers/cartController");

router.use("/category", require(__dirname + "/category.js"));
router.use("/customer", require(__dirname + "/customer.js"));
router.use("/staff", require(__dirname + "/staff.js"));
router.use("/manager", require(__dirname + "/manager.js"));

router.get("/", homeController.index);

router.get("/signup", homeController.get_signup);

router.post("/signup", homeController.post_signup);

router.get("/login", homeController.get_login);

router.post("/login", homeController.post_login);

router.get("/books", bookController.index);
// Chi tiết sách, thêm sách vào giỏ hàng
router.get("/book/:id", bookController.getBookbyID);
router.post("/book/:id", bookController.AddToCart);
// chi tiết tác giả, nxb
router.get("/author/:id", authorController.GetAuthorbyID);

router.get("/publisher/:Name", publisherController.getPublisherByName);

// Đường dẫn đến giỏ hàng
router.get("/cart", cardController.getDetailCard);
router.get("/pay", cardController.GetPayPage);
router.post("/pay", cardController.GetPostPay);

router.get("/cart/delete/:id", cardController.deleteCartbyIDBook);
router.post("/book/cart/:id", bookController.AddToCart);


module.exports = router;