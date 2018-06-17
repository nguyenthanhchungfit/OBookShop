var id_trang_thai = ""
var trang_thai = 0
$("#don_hang").on("click","p", function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        $('#main_view').html(this.responseText);
    }
    };
    xhttp.open("GET", "/staff/cart_manager", true);
    xhttp.send();
 });

 $("#ds_dac_biet").on("click","p", function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        $('#main_view').html(this.responseText);
    }
    };
    xhttp.open("GET", "/staff/book/specail_list", true);
    xhttp.send();
 });

 $("#cap_nhat_don_hang").on("click","button", function () {
    var id_don_hang = this.id
    if(id_don_hang == id_trang_thai){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                
                alert(this.responseText);
            }
        };
        xhttp.open("GET", "/staff/update_cart/"+ id_don_hang + "/?trang_thai=" + trang_thai, true);
        xhttp.send();
        alert("Cập nhật thành công")
    }
 });

 $("#cap_nhat_don_hang").on("click","select", function () {
     if(this.value == "Xác nhận đóng gói"){
        trang_thai = 0;
     }
     else if(this.value == "Lấy hàng từ kho"){
         trang_thai = 1;
     }
     else if(this.value == "Bắt đầu giao hàng"){
         trang_thai = 2;
     }
     else if(this.value == "Hoàn tất giao hàng"){
         trang_thai = 3;
     }
    id_trang_thai = this.id;
 });