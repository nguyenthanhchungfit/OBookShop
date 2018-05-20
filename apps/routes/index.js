var express = require("express");
var router = express.Router();


var homeController = require("../controllers/homeController");
var bookController = require("../controllers/booksController");
var authorController = require("../controllers/authorsController");
var publisherController = require("../controllers/publisherController");
var cartController = require("../controllers/cartController");

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
// Giỏ hàng
router.get("/cart", cartController.getDetailCard);
// Thanh toán
router.get("/pay", cartController.GetPayPage);
router.post("/pay", cartController.GetPostPay);
// Xóa một sản phẩm trong giỏ hàng
router.get("/cart/delete/:id", cartController.deleteCartbyIDBook);
// Cập nhật thông tin đơn hàng
router.get("/updatecart", cartController.UpdateCartPage)
router.get("/updatecart/:id", cartController.UpDateCart)
router.post("/updatecart/:id", cartController.UpdateCartToDB)

module.exports = router;