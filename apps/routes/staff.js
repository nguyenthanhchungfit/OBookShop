var express = require("express");
var router = express.Router();

const staffController = require("../controllers/staffController");
var cartController = require("../controllers/cartController");

const authorsController = require("../controllers/authorsController")
const categoryController = require("../controllers/categoryController")
const booksController = require("../controllers/booksController")
const publisherController = require("../controllers/publisherController");
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


// Cập nhật thông tin đơn hàng
// router.get("/updatecart", cartController.UpdateCartPage)
// router.get("/updatecart/:id", cartController.UpDateCart)
// router.post("/updatecart/:id", cartController.UpdateCartToDB)

router.get("/cart_manager", cartController.GetUpdateCart)
router.get("/update_cart/:id", cartController.UpDateStateCart)
router.get("/book/specail_list", booksController.SpecailList)
router.get("/book/specail_list/:id", booksController.AddToSpecailList)

// Xóa sách thuộc danh sách đặc biệt
router.get("/book/delete_selling", booksController.DeleteBookSelling)
router.get("/book/delete_vote", booksController.DeleteVote)
router.get("/book/delete_sale", booksController.DeleteSale)
router.get("/book/delete_newbook", booksController.DeleteNewBook)

module.exports = router;