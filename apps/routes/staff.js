var express = require("express");
var router = express.Router();

const staffController = require("../controllers/staffController");
const authorsController = require("../controllers/authorsController")
const categoryController = require("../controllers/categoryController")
router.get("/", staffController.index);

router.get("/create_author", authorsController.get_create_author);

router.post("/create_author", authorsController.post_create_author);

router.get("/create_publisher", staffController.get_create_publisher);

router.post("/create_publisher", staffController.post_create_publisher);

router.get("/update_author", authorsController.get_update_author);

router.post("/update_author", authorsController.post_update_author);

router.get("/update_category", categoryController.get_update_category);

router.post("/update_category", categoryController.post_update_category);

module.exports = router;