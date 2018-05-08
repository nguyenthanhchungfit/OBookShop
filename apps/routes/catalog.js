var express = require("express");
var router = express.Router();

// Require controllers modules
var book_controller = require("../controllers/booksController");
var author_controller = require("../controllers/authorsController");

router.get("/", book_controller.index);

router.get("/author", author_controller.author_list);

module.exports = router;