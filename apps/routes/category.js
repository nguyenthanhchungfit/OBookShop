var express = require("express");
var router = express.Router();

// Require controllers modules
var book_controller = require("../controllers/booksController");
var author_controller = require("../controllers/authorsController");
var category_controller = require("../controllers/categoryController");

router.get("/", category_controller.getBooksForHomeByCategory);

module.exports = router;