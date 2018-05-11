var express = require("express");
var router = express.Router();

const customerController = require("../controllers/customerController");

router.get("/", customerController.index);


module.exports = router;