$(function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        $('#chi_tiet_gio_hang').html(this.responseText);
    }
    };
    xhttp.open("GET", "/customer/detail_cart", true);
    xhttp.send();
});

$("#chi_tiet_gio_hang").on("click","input", function () {
    var ID = this.id;
    var query = "/customer/detail_cart" + "/?id=" + ID;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        $('#chi_tiet_gio_hang').html(this.responseText);
    }
    };
    xhttp.open("GET", query, true);
    xhttp.send();
 });

 $("#chi_tiet_gio_hang").on("click","button", function () {
    var ID = this.id;
    var Name = this.name;
    
    query = "/customer/add_number_book/" + ID + "/?loai=" + Name;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        $('#chi_tiet_gio_hang').html(this.responseText);
    }
    };
    xhttp.open("GET", query, true);
    xhttp.send();
 });

// <%= data.GioHang[i].sach.id_sach%>
//  function SetNumber(){
//      var soluong = document.getElementById("so_luong").name;
//      alert(soluong)

//  }