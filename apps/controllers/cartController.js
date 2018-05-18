var cartDetail = require("../controllers/cart")

exports.getDetailCard = function(req, res){
    var GioHang = cartDetail.GetCart()
    var TongTienPhaiTra = cartDetail.GetSumMoney()

    var result = {
        GioHang: GioHang,
        TongTienPhaiTra: TongTienPhaiTra
    }
    res.render("detail_card", {data: result});
}

exports.deleteCartbyIDBook = function(req, res){
    var idBook = req.params.id
    cartDetail.deleteCartbyIDBook(idBook)

    var GioHang = cartDetail.GetCart()
    var TongTienPhaiTra = cartDetail.GetSumMoney()

    var result = {
        GioHang: GioHang,
        TongTienPhaiTra: TongTienPhaiTra
    }
    res.render("detail_card", {data: result});
}