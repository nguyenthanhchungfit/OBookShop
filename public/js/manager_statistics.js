$(document).ready(function(){
    $("#btn_year").click(function(){
        var year = $("select[name='year_year']").val();
        $.post("/manager/statistics_year",
        {
          nam : year
        },
        function(data,status){
            $("#p_year").html(data);
        });
    });
});