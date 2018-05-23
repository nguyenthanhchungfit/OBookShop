var express = require("express");
var router = express.Router();
var multer = require("multer");
const staffController = require("../controllers/staffController");
var cartController = require("../controllers/cartController");

const authorsController = require("../controllers/authorsController")
const categoryController = require("../controllers/categoryController")
const booksController = require("../controllers/booksController")
const publisherController = require("../controllers/publisherController");
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./public/imgs/category/books")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

var upload = multer({storage: storage})
router.get("/", staffController.index);

router.get("/create_author", authorsController.get_create_author);


router.post("/create_author", authorsController.post_create_author);

router.get("/create_publisher", publisherController.get_create_publisher);

router.post("/create_publisher", publisherController.post_create_publisher);

router.get("/update_author", authorsController.get_update_author);

router.post("/update_author", authorsController.post_update_author);

router.get("/create_category", categoryController.get_create_category);

router.post("/create_category", categoryController.post_create_category);

router.get("/update_category", categoryController.get_update_category);

router.post("/update_category", categoryController.post_update_category);

router.get("/create_book", booksController.get_create_book);

router.post("/create_book", upload.single("file"), booksController.post_create_book);

router.get("/update_book", booksController.get_update_book);

router.post("/update_book", booksController.post_update_book);
// Cập nhật thông tin đơn hàng
router.get("/updatecart", cartController.UpdateCartPage)
router.get("/updatecart/:id", cartController.UpDateCart)
router.post("/updatecart/:id", cartController.UpdateCartToDB)


module.exports = router;