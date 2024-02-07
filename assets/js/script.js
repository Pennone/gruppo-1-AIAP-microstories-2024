$(document).ready(function () {

    $("#menu-toggle").click(function () {
        $("#offcanvas").animate({ top: '0' });
        setTimeout(function() {
            $("#menu-toggle").hide();
        $("#close-btn").show();
        }, 1000);
       
    });

    $("#close-btn").click(function () {
        $("#offcanvas").animate({ top: '-100%' });
        setTimeout(function() {
            $("#menu-toggle").show();
        $("#close-btn").hide();
        }, 1000);
        
    });


});