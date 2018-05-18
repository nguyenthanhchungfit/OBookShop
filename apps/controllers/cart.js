
var Cart = []
function AddToCart(detail_book){
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
}

function deleteCartbyIDBook(ID){
    var len = Cart.length;
    var Cart2 = []
    for(var i = 0; i < len; ++i){
        if(Cart[i].sach.id_sach == ID){
            for(var j = 0; j < len; ++j){
                if(Cart[j] != Cart[i])
                    Cart2.push(Cart[j])
            }
            Cart = Cart2
            break;
        }       
    }
}

function GetSumMoney(){
    var len = Cart.length;
    var TongTienPhaiTra = 0
    for(var i = 0; i < len; ++i){
        TongTienPhaiTra = TongTienPhaiTra + Cart[i].TongTien
    }
    return TongTienPhaiTra
}

function GetCart(){
    return Cart;
}

module.exports = {
    AddToCart: AddToCart,
    GetCart: GetCart,
    GetSumMoney: GetSumMoney,
    deleteCartbyIDBook: deleteCartbyIDBook
}

