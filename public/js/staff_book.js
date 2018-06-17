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