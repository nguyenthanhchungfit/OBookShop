var bookModel = require("../models/bookModel")

var Cart = []
function AddToCart(detail_book, req, res){
    setCartFromCookie(req, res)
    var len = Cart.length;
    var dem = 0;
    if(len != 0){
        for(var i = 0; i < len; ++i){
            if(Cart[i].sach.id_sach == detail_book.sach.id_sach){
                Cart[i].SoLuong = Cart[i].SoLuong + detail_book.SoLuong
                Cart[i].TongTien = Cart[i].TongTien + detail_book.TongTien
            }
            else
                dem++;
        }
    }
    if(dem == len){
        Cart.push(detail_book)
    }    
    // Ghi lại vào trong cookie
    res.cookie("Detail_Cart", Cart)
}

function ModifyCartNumber(req, res){
    setCartFromCookie(req, res)
    var len = Cart.length;
    
    for(var i = 0; i < len; ++i){
        if(Cart[i].sach.id_sach == req.params.id){
            if(req.query.loai == "them"){
                Cart[i].SoLuong++;
                Cart[i].TongTien = Cart[i].SoLuong * Cart[i].sach.gia;
            }
            else if(req. query.loai == "tru"){
                Cart[i].SoLuong--;
                Cart[i].TongTien = Cart[i].SoLuong * Cart[i].sach.gia;
            }
        }
    }
    // Ghi lại vào trong cookie
    res.cookie("Detail_Cart", Cart)
}

function deleteCartbyIDBook(ID, req, res){
    setCartFromCookie(req, res)
    var len = Cart.length;
    var Cart2 = []
    for(var i = 0; i < len; ++i){
        if(Cart[i].sach.id_sach == ID){
            for(var j = 0; j < len; ++j){
                if(Cart[j] != Cart[i])
                    Cart2.push(Cart[j])
            }
            Cart = Cart2
            // Ghi lại vào trong cookie
            res.cookie("Detail_Cart", Cart)
            break;
        }       
    }
}

function GetSumMoney(req, res){
    setCartFromCookie(req, res)
    var len = Cart.length;
    var TongTienPhaiTra = 0
    for(var i = 0; i < len; ++i){
        TongTienPhaiTra = TongTienPhaiTra + Cart[i].TongTien
    }
    return TongTienPhaiTra
}

function setCartFromCookie(req, res){
    Cart = []
    cartCookie = req.cookies.Detail_Cart
    if(cartCookie != null){
        for(var i = 0; i < cartCookie.length; ++i){
            Cart.push(cartCookie[i])
        }
    }
}

function GetCart(req, res){
    setCartFromCookie(req, res)
    return Cart;
}

module.exports = {
    AddToCart: AddToCart,
    GetCart: GetCart,
    GetSumMoney: GetSumMoney,
    deleteCartbyIDBook: deleteCartbyIDBook,
    setCartFromCookie: setCartFromCookie,
    ModifyCartNumber: ModifyCartNumber
}

