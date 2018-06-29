/*price range*/

var old_pos = 1;

if ($.fn.slider) {
    $('#sl2').slider();
}

var RGBChange = function () {
    $('#RGB').css('background', 'rgb(' + r.getValue() + ',' + g.getValue() + ',' + b.getValue() + ')')
};

/*scroll to top*/

$(document).ready(function () {
    $(function () {
        $.scrollUp({
            scrollName: 'scrollUp', // Element ID
            scrollDistance: 300, // Distance from top/bottom before showing element (px)
            scrollFrom: 'top', // 'top' or 'bottom'
            scrollSpeed: 300, // Speed back to top (ms)
            easingType: 'linear', // Scroll to top easing (see http://easings.net/)
            animation: 'fade', // Fade, slide, none
            animationSpeed: 200, // Animation in speed (ms)
            scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
            //scrollTarget: false, // Set a custom target element for scrolling to the top
            scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
            scrollTitle: false, // Set a custom <a> title if required.
            scrollImg: false, // Set true to use image
            activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
            zIndex: 2147483647 // Z-Index for the overlay
        });
    });

    $(function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#accordian').html(this.responseText);
        }
        };
        xhttp.open("GET", "/category", true);
        xhttp.send();
    });

    $(function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#sanpham').html(this.responseText);
        }
        };
        xhttp.open("GET", "/books?step=0", true);
        xhttp.send();
    });

    // Get danh sách publisher
    $(function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#NXB').html(this.responseText);
        }
        };
        xhttp.open("GET", "/getPublishers", true);
        xhttp.send();
    });

    $(function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#optionNXB').html(this.responseText);
        }
        };
        xhttp.open("GET", "/optionNXB", true);
        xhttp.send();
    })

    $(function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#optionTheLoai').html(this.responseText);
        }
        };
        xhttp.open("GET", "/optionTheLoai", true);
        xhttp.send();
    })

    $(function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#optionGia').html(this.responseText);
        }
        };
        xhttp.open("GET", "/optionGia", true);
        xhttp.send();
    })
});

$("#accordian").on("click","h4", function () {
    var itemID = $(this).attr('id'); // or var clickedBtnID = this.id
    var query = "/category" + "/?the_loai=" + itemID;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        $('#sanpham').html(this.responseText);
    }
    };
    xhttp.open("GET", query, true);
    xhttp.send();
 });

 $("#NXB").on("click", "h5", function(){
    var ten_nxb = $(this).text();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#sanpham').html(this.responseText);
        }
    };
    var linkRequest = "/getPublishers?ten_nxb=" + ten_nxb;
    xhttp.open("GET", linkRequest, true);
    xhttp.send();
 });

 $("#sanpham").on('click', "a", function(){
     $li = $(this).parent();
     var classNameAc = liClassName + " active";
     $li.attr("class", classNameAc);
     var classNameDi = liClassName;
     $li.siblings().attr('class', classNameDi);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#sanpham').html(this.responseText);
        }
    };
    var step = $li.text() - 1;
    var linkRequest = "/books?step=" + step;
    xhttp.open("GET", linkRequest, true);
    xhttp.send();
 });

 const liClassName = "page-item";

 $("#sanpham").on('click', "button", function(){
    var btnName = $(this).text();
    if(btnName == "Add to cart"){
        var id = $(this).parent().prev().children().attr("id");
        var xhttp = new XMLHttpRequest();
        var linkRequest = "/book/" + id + "?so_luong=1"
        xhttp.open("GET", linkRequest, true);
        xhttp.send();
    }
});

$("#btnSearch").on('click', function(){
    var textSearch = $("#search_name").val();
    var NXB = $("#optionNXB option:selected").val();
    if(NXB == "Tất cả"){
        NXB = 0;
    }
    var TheLoai = $("#optionTheLoai option:selected").val();
    var Gia = $("#optionGia option:selected").val();


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#sanpham').html(this.responseText);
        }
    };
    var linkRequest = `/booksearch?ten_sach=${textSearch}&nxb=${NXB}&the_loai=${TheLoai}&gia=${Gia}`
    xhttp.open("GET", linkRequest, true);
    xhttp.send();


})

