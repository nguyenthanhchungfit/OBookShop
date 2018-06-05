$("#bang_ban_chay").on("click","button", function () {
    var id_sach = this.id;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#danh_sach_dac_biet').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/book/delete_selling" + "/?id_sach=" + id_sach, true);
    xhttp.send();
 });

 $("#bang_vote_cao").on("click","button", function () {
    var id_sach = this.id;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#danh_sach_dac_biet').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/book/delete_vote" + "/?id_sach=" + id_sach, true);
    xhttp.send();
 });

 $("#bang_giam_gia").on("click","button", function () {
    var id_sach = this.id;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#danh_sach_dac_biet').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/book/delete_sale" + "/?id_sach=" + id_sach, true);
    xhttp.send();
 });

 $("#bang_moi_phat_hanh").on("click","button", function () {
    var id_sach = this.id;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#danh_sach_dac_biet').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/book/delete_newbook" + "/?id_sach=" + id_sach, true);
    xhttp.send();
 });



$("#them_ban_chay").on("click","button", function () {
    var id_sach = document.getElementById("id_sach_ban_chay").value
    var so_luong = document.getElementById("so_luong_ban_chay").value

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#danh_sach_dac_biet').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/book/specail_list/" + id_sach + "/?add_selling=" + so_luong, true);
    xhttp.send();
 });

 $("#them_binh_chon").on("click","button", function () {
    var id_sach = document.getElementById("id_sach_binh_chon").value
    var binh_chon = document.getElementById("binh_chon").value

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#danh_sach_dac_biet').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/book/specail_list/" + id_sach + "/?add_vote=" + binh_chon, true);
    xhttp.send();
 });

 $("#them_giam_gia").on("click","button", function () {
    var id_sach = document.getElementById("id_sach_giam_gia").value
    var giam_gia = document.getElementById("giam_gia").value

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#danh_sach_dac_biet').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/book/specail_list/" + id_sach + "/?add_sale=" + giam_gia, true);
    xhttp.send();
 });

 $("#them_moi_phat_hanh").on("click","button", function () {
    var id_sach = document.getElementById("id_sach_moi_phat_hanh").value
    var ngay_phat_hanh = document.getElementById("ngay_phat_hanh").value

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#danh_sach_dac_biet').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/book/specail_list/" + id_sach + "/?add_new=" + ngay_phat_hanh, true);
    xhttp.send();
 });