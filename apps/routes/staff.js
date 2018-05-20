var express = require("express");
var router = express.Router();

const staffController = require("../controllers/staffController");
var cartController = require("../controllers/cartController");

router.get("/", staffController.index);


// Cập nhật thông tin đơn hàng
router.get("/updatecart", cartController.UpdateCartPage)
router.get("/updatecart/:id", cartController.UpDateCart)
router.post("/updatecart/:id", cartController.UpdateCartToDB)


module.exports = router;