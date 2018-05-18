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

exports.GetPayPage = function(req, res){
    res.render("pay", {data: {}})
}

exports.GetPostPay = function(req, res){
    var NguoiNhan = req.body.nguoinhan
    var NguoiGui = req.body.nguoigui
    var SDT = req.body.sdt
    var TinhTP = req.body.tinhTP
    var QuanHuyen = req.body.quanhuyen
    var PhuongXa = req.body.phuongxa
    var DiaChi = req.body.diachi

    if(NguoiNhan != "" && NguoiGui != "" && SDT != "" && TinhTP != "" &&
        QuanHuyen != "" && PhuongXa != "" && DiaChi != ""){
        res.render("pay", {data: {success: "Chúng tôi sẽ giao hàng đến địa chỉ sớm nhất"}})
    }
    else{
        res.render("pay", {data: {error: "Chưa nhập đủ thông tin"}})
    }

}