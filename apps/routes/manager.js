var express = require("express");
var router = express.Router();

const managerController =require("../controllers/managerController");

router.get("/", managerController.index);

router.get("/account_staff", managerController.getDanhSachNhanVien);

router.get("/account_customer", managerController.getDanhSachKhachHang);

module.exports = router;