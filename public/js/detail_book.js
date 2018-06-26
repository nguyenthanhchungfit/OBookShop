$("#them_gio_hang").on("click","button", function () {
    var id_sach = $("#comments").attr('name');
    var soluong = document.getElementById("SoLuongSach").value

    var query = "/book/" + id_sach + "/?so_luong=" + soluong;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        $('#ThongBao').html(this.responseText);
    }
    };
    xhttp.open("GET", query, true);
    xhttp.send();
 });

$(function(){
    var xhttp = new XMLHttpRequest();
    var id_sach = $("#comments").attr('name');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#comments').html(this.responseText);
        }
    };
    xhttp.open("GET", "/book/comment/" + id_sach, true);
    xhttp.send();
});

$("#write_comment").on("click","button", function () {
    var id_sach = $("#comments").attr('name');
    var comment = document.getElementById("binh_luan").value
    var query = "/book/comment/" + id_sach + "/?binh_luan=" + comment;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        $('#comments').html(this.responseText);
    }
    };
    xhttp.open("GET", query, true);
    xhttp.send();
 });

 $("#write_comment_noUser").on("click","button", function () {
    var id_sach = $("#comments").attr('name');
    var ten_cmt = document.getElementById("ten_binh_luan").value;
    var comment = document.getElementById("binh_luan").value;

    if(ten_cmt != "" && comment != ""){
        var query = "/book/comment/" + id_sach + "/?binh_luan=" + comment + "&ten_cmt=" + ten_cmt;
    
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#comments').html(this.responseText);
        }
        };
        xhttp.open("GET", query, true);
        xhttp.send();
    }
 });