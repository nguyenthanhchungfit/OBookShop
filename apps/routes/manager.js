var express = require("express");
var router = express.Router();

const managerController =require("../controllers/managerController");

router.get("/", managerController.index);

router.get("/account_staff", managerController.getDanhSachNhanVien);

router.get("/account_customer", managerController.getDanhSachKhachHang);

router.get("/edit_customer_information", managerController.edit_customer_information);

router.post("/edit_customer_information", managerController.edit_customer_information_post);

router.get("/top_10_book", managerController.getTop10Book);

router.get("/statistics_year", managerController.getStatisticsYear);

router.get("/statistics_month", managerController.getStatisticsMonth);

router.get("/statistics_day", managerController.getStatisticsDay);

router.get("/statistics_week", managerController.getStatisticsWeek);

router.get("/statistics_trimester", managerController.getStatisticsTrimester);
module.exports = router;