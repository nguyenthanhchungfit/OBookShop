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

// $("#them_sach").on("click", "p", function () {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             $('#main_view').html(this.responseText);
//         }
//     };
//     xhttp.open("GET", "/staff/create_book", true);
//     xhttp.send();
// });

// $("#them_tac_gia").on("click", "p", function () {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             $('#main_view').html(this.responseText);
//         }
//     };
//     xhttp.open("GET", "/staff/create_author", true);
//     xhttp.send();
// });

// $("#them_nha_xuat_ban").on("click", "p", function () {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             $('#main_view').html(this.responseText);
//         }
//     };
//     xhttp.open("GET", "/staff/create_publisher", true);
//     xhttp.send();
// });

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

// Xóa
$("#main_view").on("click", "a", function () {
    //alert(this.id);
    var id = this.id;
    if(this.name == "sach"){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                $('#main_view').html(this.responseText);
            }
        };
        xhttp.open("GET", "/staff/delete_book/" + id, true);
        xhttp.send();
    }
    if(this.name == "tac_gia"){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                $('#main_view').html(this.responseText);
            }
        };
        xhttp.open("GET", "/staff/delete_author/" + id, true);
        xhttp.send();
    }
    if(this.name == "nxb"){
        if(id == "Khác"){
            alert("Không thể xóa nhà xuất bản này !!");
        }
        else{
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    $('#main_view').html(this.responseText);
                }
            };
            xhttp.open("GET", "/staff/delete_publisher/" + id, true);
            xhttp.send();
        }
    }
});
// $("#main_view").on("click", "input", function () {
//     if (this.id == "create_book")
//     {
//         var id_sach = $("input[name='id_sach']").val();
//         var ten_sach = $("input[name='ten_sach']").val();
//         var the_loai = $("select[name='the_loai']").val();
//         var tac_gia = $("select[name='tac_gia']").val();
//         var nha_xuat_ban = $("select[name='nha_xuat_ban']").val();
//         var nam_xuat_ban = $("input[name='nam_xuat_ban']").val();
//         var khuyen_mai = $("input[name='khuyen_mai']").val();
//         var gia = $("input[name='gia']").val();
//         var so_luong_ton = $("input[name='so_luong_ton']").val();
//         var doc_truoc = $("input[name='doc_truoc']").val();
//         var file = $("input[name='file']").val();
        
//         var xhttp = new XMLHttpRequest();
//             xhttp.onreadystatechange = function () {
//                 if (this.readyState == 4 && this.status == 200) {
//                     $('#main_view').html(this.responseText);
//                 }
//             };
//             xhttp.open("GET", "/staff/delete_publisher" + "/?id_sach=", true);
//             xhttp.send();
//         // alert(file); khuc nay ko hieu lam :)) , post ở đây rồi có liên quan tới post đã viết ko? ko biết :v
//         // $.ajax({
//         //     type: 'post',
//         //     url: 'staff/create_book',
//         //     data: formData,
//         //     success: function(results) {
//         //       $('ul#response').html(results);
//         //     }
//         //   }); // end ajax
//     }
// });
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