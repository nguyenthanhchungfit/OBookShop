var express = require("express");
var router = express.Router();

const customerController = require("../controllers/customerController");
var cartController = require("../controllers/cartController");

router.get("/", customerController.index);

router.get("/logout", customerController.logout);

// Giỏ hàng
router.get("/cart", cartController.getDetailCard);
// Xóa một sản phẩm trong giỏ hàng
router.get("/cart/delete/:id", cartController.deleteCartbyIDBook);
// Thanh toán
router.get("/pay", cartController.GetPayPage);
router.post("/pay", cartController.GetPostPay);

module.exports = router;