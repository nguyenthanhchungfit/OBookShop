<<<<<<< HEAD
// Sách bán chạy
$("#ban_chay").on("click","p", function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#main_view').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/top_selling", true);
    xhttp.send();
 });

 $("#them_ban_chay").on("click","button", function () {
    var id_sach = document.getElementById("id_sach_ban_chay").value
    var so_luong = document.getElementById("so_luong_ban_chay").value

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#main_view').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/add_top_selling/" + id_sach + "/?add_selling=" + so_luong, true);
    xhttp.send();
 });

 $("#delete_selling").on("click","button", function () {
    var id_sach = this.id;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#main_view').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/delete_selling/" + id_sach, true);
    xhttp.send();
 });

//-------------------------------------------------------------------------------------------------------------------

// Sách bình chọn cao nhất
$("#binh_chon_cao").on("click","p", function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#main_view').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/top_vote", true);
    xhttp.send();
 });

 $("#them_binh_chon").on("click","button", function () {
    var id_sach = document.getElementById("id_sach_ban_chay").value
    var so_luong = document.getElementById("so_sao").value

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#main_view').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/add_top_vote/" + id_sach + "/?add_vote=" + so_luong, true);
    xhttp.send();
 });

 $("#delete_vote").on("click","button", function () {
    var id_sach = this.id;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#main_view').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/delete_vote/" + id_sach, true);
    xhttp.send();
 });

 // Sách giảm giá ---------------------------------------------------------------------------------------
 $("#giam_gia").on("click","p", function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#main_view').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/top_sale", true);
    xhttp.send();
 });

 $("#them_giam_gia").on("click","button", function () {
    var id_sach = document.getElementById("id_sach_ban_chay").value
    var so_luong = document.getElementById("so_luong").value

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#main_view').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/add_top_sale/" + id_sach + "/?add_sale=" + so_luong, true);
    xhttp.send();
 });

 $("#delete_sale").on("click","button", function () {
    var id_sach = this.id;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#main_view').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/delete_sale/" + id_sach, true);
    xhttp.send();
 });

 // Sách mới phát hành ---------------------------------------------------------------------------------------
 $("#moi_phat_hanh").on("click","p", function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#main_view').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/top_new", true);
    xhttp.send();
 });

 $("#them_moi_phat_hanh").on("click","button", function () {
    var id_sach = document.getElementById("id_sach_ban_chay").value
    var ngay = document.getElementById("ngay_phat_hanh").value
    if(ngay == ""){
        alert("Hãy chọn ngày");
    }
    else{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                $('#main_view').html(this.responseText);
            }
        };
        xhttp.open("GET", "/staff/add_top_new/" + id_sach + "/?add_new=" + ngay, true);
        xhttp.send();
    }
 });

 $("#delete_new").on("click","button", function () {
    var id_sach = this.id;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#main_view').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/delete_new/" + id_sach, true);
    xhttp.send();
 });
||||||| merged common ancestors
=======
$("#xoa_sua_sach").on("click", "p", function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            $('#main_view').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/update_delete_book", true);
    xhttp.send();
});

$("#them_sach").on("click", "p", function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            $('#main_view').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/create_book", true);
    xhttp.send();
});

$("#them_tac_gia").on("click", "p", function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            $('#main_view').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/create_author", true);
    xhttp.send();
});

$("#them_nha_xuat_ban").on("click", "p", function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            $('#main_view').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/create_publisher", true);
    xhttp.send();
});

$("#xoa_sua_tac_gia").on("click", "p", function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            $('#main_view').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/update_delete_author", true);
    xhttp.send();
});

$("#xoa_sua_nha_xuat_ban").on("click", "p", function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            $('#main_view').html(this.responseText);
        }
    };
    xhttp.open("GET", "/staff/update_delete_publisher", true);
    xhttp.send();
});
//  $("#create_book").on("click","input", function () {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         $('#main_view').html(this.responseText);
//     }
//     };
//     xhttp.open("POST", "/staff/create_book", true);
//     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhttp.send();
//  });
>>>>>>> tanh
