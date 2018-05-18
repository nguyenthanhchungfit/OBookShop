var express = require("express");

var router = express.Router();

var bookController = require("../controllers/booksController")
var authorController = require("../controllers/authorsController");
var publisherController = require("../controllers/publisherController");
var cardController = require("../controllers/cartController")

router.use("/catalog", require(__dirname + "/catalog.js"));
router.use("/customer", require(__dirname + "/customer.js"));
router.use("/staff", require(__dirname + "/staff.js"));
router.use("/manager", require(__dirname + "/manager.js"));

router.get("/", function(req, res){
    res.json({message : "index"});
});

router.get("/Sach/:id", bookController.getBookbyID)
router.get("/Author/:id", authorController.GetAuthorbyID)
router.get("/Publisher/:Name", publisherController.getPublisherByName)
// Đường dẫn đến giỏ hàng
router.get("/Cart", cardController.getDetailCard)
router.get("/Pay", cardController.GetPayPage)
router.post("/Pay", cardController.GetPostPay)

router.get("/Cart/Delete/:id", cardController.deleteCartbyIDBook)
router.post("/Sach/Cart/:id", bookController.AddToCart)

module.exports = router;