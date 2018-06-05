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
    var radios = document.getElementsByName("gender");
    var ID = $(this).attr("id");
 });