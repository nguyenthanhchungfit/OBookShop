var cartModel = require("../models/cartModel")
var cartDetail = require("../controllers/cart")
var bookModel = require("../models/bookModel")
var customerModel = require("../models/customerModel");

exports.getDetailCardPage = function(req, res){
    res.render("detail_cart");
}

exports.getDetailCartItems = function(req, res){
    if(req.query.id){
        var ID = req.query.id
        cartDetail.deleteCartbyIDBook(ID, req, res)
    }

    var GioHang = cartDetail.GetCart(req, res)
    var TongTienPhaiTra = cartDetail.GetSumMoney(req, res)

    var result = {
        GioHang: GioHang,
        TongTienPhaiTra: TongTienPhaiTra
    }

    res.render("detail_cart_items", {data: result});
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
    
    res.redirect("/customer/cart");
}

exports.GetPayPage = function(req, res){
    res.render("pay", {data: {}})
}

exports.GetPostPay = function(req, res){
    var NguoiGui;
    if(req.session.user != null){
        NguoiGui = req.session.user.username;
    }
    else{
        NguoiGui = req.body.nguoigui
    }
    var NguoiNhan = req.body.nguoinhan
    var SDT = req.body.sdt
    var DiaChi = req.body.diachi
    var Ma_Don_Hang;

    if(NguoiNhan != "" && NguoiGui != "" && SDT != "" && DiaChi != ""){
        var GioHangCuoi = cartModel.getFinalCart()
        GioHangCuoi.then(function(data){
        // Tạo mã đơn hàng
        if(data != null){
            Ma_Don_Hang = parseInt(data.ma_don_hang) + 1;
        }
        else{
            Ma_Don_Hang = 1;
        }
        var now = new Date()
        var ngayMua = now.getDay() + "-" + now.getMonth()  + "-" + now.getFullYear()

        // Tạo đối tượng ghi vào đơn hàng
        var resultCart = {
            ma_don_hang: Ma_Don_Hang,
            nguoi_nhan: NguoiNhan,
            nguoi_gui: NguoiGui,
            dia_chi: DiaChi,
            so_dien_thoai: SDT,
            ngay_mua: new Date(),
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
        // Giảm số lượng sách ở database
        for(var i = 0; i < len; ++i){
            var k = 0;
            var Sach = bookModel.getBookbyID(Detail_Cart[i].sach.id_sach);
            Sach.then(function(data){
                sach = data[0];
                var SoLuongMoi = sach.so_luong_ton -  Detail_Cart[k].SoLuong;
                bookModel.UpdateNumberBook(sach.id_sach, SoLuongMoi);
                k++;
            })
        }

        // Xóa danh sách đơn hàng khỏi cookie
        res.clearCookie("Detail_Cart")
        // Render
        res.render("pay", {data: {success: "Thanh toán thành công: Chúng tôi sẽ giao hàng đến địa chỉ sớm nhất"}})
        }) 
    }
    else{
        res.render("pay", {data: {error: "Chưa nhập đủ thông tin"}})
    }
    
}

exports.GetUpdateCart = function(req, res){
    var listCart = cartModel.GetCart()
    listCart.then(function(don_hang){
        res.render("update_cartPage", {data: don_hang})
    })
}

exports.UpDateStateCart = function(req, res){
    var id_don_hang = req.params.id;
    if(req.query.trang_thai){
        
        var DonHang = cartModel.getCartByID(id_don_hang);
        DonHang.then(function(data){
            var don_hang = data[0];
            if(don_hang.trang_thai == 3){
                res.send("Không thể cập nhật đơn hàng đã giao");
            }
            else{
                cartModel.UpdateCartToDatabase(id_don_hang, req.query.trang_thai);
                if(req.query.trang_thai == 3){
                    if(customerModel.checkUserIsExisted(don_hang.nguoi_gui)){
                        var ChiTietDH = cartModel.GetDeTailCartsByID(id_don_hang);
                        ChiTietDH.then(function(data){
                            var len = data.length;
                            var TongTien = 0;
                            for(var i = 0; i < len; ++i){
                                TongTien += data[i].thanh_tien;
                            }
                            console.log(TongTien);
                            var DiemThuong = TongTien/10000;
                            console.log("--> Diem thuong: " + DiemThuong);
                            
                           
                            var Khach_hang = customerModel.GetCustomerByUsername(don_hang.nguoi_gui);
                            Khach_hang.then(function(data){
                                var diem = data[0].diem_tich_luy;
                                diem += DiemThuong;
                                customerModel.UpdatePoint(don_hang.nguoi_gui, diem);
                            })
                        });
                    }
                }
                res.send("Cập nhật thành công");
            }
        });
        
    }
}