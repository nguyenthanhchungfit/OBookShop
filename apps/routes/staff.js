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

// Xóa sách
router.get("/book/delete_book/:id", booksController.Delete_Book);


// Xóa tác giả
router.get("/author/delete_author/:id", authorsController.delete_author);


//router.get("/update_delete_book", booksController.update_delete_book);

router.get("/update_delete_author", authorsController.update_delete_author);

router.get("/update_delete_publisher", publisherController.update_delete_publisher);

// router.get("/update_delete_book/update/:id")
// Danh sách đặc biệt
router.get("/top_selling", booksController.Top_Selling_Book);
router.get("/add_top_selling/:id", booksController.Add_Selling);
router.get("/delete_selling/:id", booksController.Delete_Selling);

router.get("/top_vote", booksController.Top_Vote_Book);
router.get("/add_top_vote/:id", booksController.Add_Vote);
router.get("/delete_vote/:id", booksController.Delete_Vote);

router.get("/top_sale", booksController.Top_Sale_Book);
router.get("/add_top_sale/:id", booksController.Add_Sale);
router.get("/delete_sale/:id", booksController.Delete_Sale);

router.get("/top_new", booksController.Top_New_Book);
router.get("/add_top_new/:id", booksController.Add_New);
router.get("/delete_new/:id", booksController.Delete_New);

// Xóa sách
router.get("/delete_book/:id", booksController.delete_book); 
router.get("/delete_author/:id", authorsController.delete_author)
router.get("/delete_publisher/:Name", publisherController.delete_publisher)

// Cập nhật thông tin đơn hàng
// router.get("/updatecart", cartController.UpdateCartPage)
//router.get("/updatecart/:id", cartController.UpDateCart)
//router.post("/updatecart/:id", cartController.UpdateCartToDB)
router.get("/cart_manager", cartController.GetUpdateCart)
router.get("/update_cart/:id", cartController.UpDateStateCart)
//router.get("/book/specail_list", booksController.SpecailList)
//router.get("/book/specail_list/:id", booksController.AddToSpecailList)

// Xóa sách thuộc danh sách đặc biệt

// router.get("/book/delete_vote", booksController.DeleteVote)
// router.get("/book/delete_sale", booksController.DeleteSale)
// router.get("/book/delete_newbook", booksController.DeleteNewBook)

module.exports = router;