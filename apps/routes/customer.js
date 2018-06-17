var express = require("express");
var router = express.Router();

const customerController = require("../controllers/customerController");
var cartController = require("../controllers/cartController");

// Trang cho người dùng
router.get("/", customerController.index);

router.get("/dashboard", customerController.dashboard);

// Trang thông tin người dùng
router.get("/information", customerController.information);

// Chỉnh sửa thông tin người dùng
router.get("/edit_information", customerController.edit_information);

router.post("/edit_information", customerController.edit_information_post);

// Đổi mật khẩu người dùng
router.get("/change_password", customerController.change_password);

router.post("/change_password", customerController.change_password_post);

// Thông tin đơn hàng
router.get("/orders", customerController.orders);

router.get("/logout", customerController.logout);

// Giỏ hàng
router.get("/cart", cartController.getDetailCardPage);

router.get("/detail_cart", cartController.getDetailCartItems)
// Xóa một sản phẩm trong giỏ hàng
router.get("/cart/delete/:id", cartController.deleteCartbyIDBook);
// Thanh toán
router.get("/pay", cartController.GetPayPage);
router.post("/pay", cartController.GetPostPay);

module.exports = router;