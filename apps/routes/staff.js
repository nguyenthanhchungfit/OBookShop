var express = require("express");
var router = express.Router();

const staffController = require("../controllers/staffController");


router.get("/", staffController.index);

module.exports = router;