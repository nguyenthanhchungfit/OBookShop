var cartModel = require("../models/cartModel")
var cartDetail = require("../controllers/cart")
var bookModel = require("../models/bookModel")

exports.getDetailCard = function(req, res){
    var GioHang = cartDetail.GetCart(req, res)
    var TongTienPhaiTra = cartDetail.GetSumMoney(req, res)

    var result = {
        GioHang: GioHang,
        TongTienPhaiTra: TongTienPhaiTra
    }
    res.render("detail_card", {data: result});
}

exports.deleteCartbyIDBook = function(req, res){
    var idBook = req.params.id
    cartDetail.deleteCartbyIDBook(idBook, req, res)

    var GioHang = cartDetail.GetCart(req, res)
    var TongTienPhaiTra = cartDetail.GetSumMoney(req, res)

    var result = {
        GioHang: GioHang,
        TongTienPhaiTra: TongTienPhaiTra
    }
    
    res.redirect("/cart");
}

exports.GetPayPage = function(req, res){
    res.render("pay", {data: {}})
}

exports.GetPostPay = function(req, res){
    var NguoiNhan = req.body.nguoinhan
    var NguoiGui = req.body.nguoigui
    var SDT = req.body.sdt
    var DiaChi = req.body.diachi
    var Now = new Date()

    if(NguoiNhan != "" && NguoiGui != "" && SDT != "" && DiaChi != ""){
        var SoLuongGioHang = cartModel.getNumberCart()
        SoLuongGioHang.then(function(so_luong){
        // Tạo mã đơn hàng
        var Ma_Don_Hang = so_luong + 1
        
        // Tạo đối tượng ghi vào đơn hàng
        var resultCart = {
            ma_don_hang: Ma_Don_Hang,
            nguoi_nhan: NguoiNhan,
            nguoi_gui: NguoiGui,
            dia_chi: DiaChi,
            so_dien_thoai: SDT,
            ngay_mua: Now,
            trang_thai: 0
        }
        cartModel.AddCartToDatabase(resultCart)

        // Tạo đối tượng ghi vào chi tiết đơn hàng
        var Detail_Cart = cartDetail.GetCart(req, res)
        var len = Detail_Cart.length

        for(var i = 0; i < len; ++i){
            var resultDetail_Cart = {
                ma_don_hang: Ma_Don_Hang,
                id_sach: Detail_Cart[i].sach.id_sach,
                ten_sach: Detail_Cart[i].sach.ten_sach,
                don_gia: Detail_Cart[i].sach.gia,
                so_luong: Detail_Cart[i].SoLuong,
                thanh_tien: Detail_Cart[i].TongTien
            }
            cartModel.AddDetailCartToDatabase(resultDetail_Cart)
        }

        // Xóa danh sách đơn hàng khỏi cookie
        res.clearCookie("Detail_Cart")
        // Render
        res.render("pay", {data: {success: "Chúng tôi sẽ giao hàng đến địa chỉ sớm nhất"}})
        }) 
    }
    else{
        res.render("pay", {data: {error: "Chưa nhập đủ thông tin"}})
    }
    
}

exports.UpdateCartPage = function(req, res){
    var listCart = cartModel.GetCart()
    listCart.then(function(don_hang){
        res.render("update_cartPage", {data: don_hang})
    })
}

exports.UpDateCart = function(req, res){
    var DonHang = cartModel.getCartByID(req.params.id)
    DonHang.then(function(don_hang){
        donhang = don_hang[0]
        var result = {
            ma_don_hang: donhang.ma_don_hang,
            nguoi_gui: donhang.nguoi_gui,
            nguoi_nhan: donhang.nguoi_nhan,
            so_dien_thoai: donhang.so_dien_thoai,
            dia_chi: donhang.dia_chi,
            ngay_mua: donhang.ngay_mua,
            trang_thai: donhang.trang_thai
        }
        res.render("update_cart", {data: result})
    })
}

exports.UpdateCartToDB = function(req, res){
    var NguoiNhan = req.body.nguoinhan
    var NguoiGui = req.body.nguoigui
    var SoDienThoai = req.body.sdt
    var DiaChi = req.body.diachi
    var NgayMua = req.body.ngaymua
    var Gender = req.body.gender
    var TrangThai = 0

    if(NguoiGui != "" && NguoiNhan != "" && SoDienThoai != "" && DiaChi != "" && NgayMua != ""){
        if(Gender == "XNDG"){
            TrangThai = 0
        }
        else if(Gender == "LHTK"){
            TrangThai = 1
        }
        else if(Gender == "BDGH"){
            TrangThai = 2
        }
        else{
            TrangThai = 3
        }
        var result = {
            ma_don_hang: req.params.id,
            nguoi_gui: NguoiGui,
            nguoi_nhan: NguoiNhan,
            so_dien_thoai: SoDienThoai,
            dia_chi: DiaChi,
            ngay_mua: NgayMua,
            trang_thai: TrangThai
        }
        cartModel.UpdateCartToDatabase(result)
        res.redirect("/updatecart")
    }
    else{
        var DonHang = cartModel.getCartByID(req.params.id)
        DonHang.then(function(don_hang){
            donhang = don_hang[0]
            var result = {
                ma_don_hang: donhang.ma_don_hang,
                nguoi_gui: donhang.nguoi_gui,
                nguoi_nhan: donhang.nguoi_nhan,
                so_dien_thoai: donhang.so_dien_thoai,
                dia_chi: donhang.dia_chi,
                ngay_mua: donhang.ngay_mua,
                trang_thai: donhang.trang_thai,
                error: "Không được để thông tin trống"
            }
            res.render("update_cart", {data: result})
        })
    }
    

}
