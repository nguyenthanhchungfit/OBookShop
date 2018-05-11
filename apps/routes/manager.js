var express = require("express");
var router = express.Router();

const managerController =require("../controllers/managerController");

router.get("/", managerController.index);

module.exports = router;