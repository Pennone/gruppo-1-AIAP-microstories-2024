$(document).ready(function () {

    $("#menu-toggle").click(function () {
        $("#offcanvas").animate({ top: '0' });
        setTimeout(function () {
            $("#menu-toggle").hide();
            $("#close-btn").show();
        }, 1000);

    });

    $("#close-btn").click(function () {
        $("#offcanvas").animate({ top: '-100%' });
        setTimeout(function () {
            $("#menu-toggle").show();
            $("#close-btn").hide();
        }, 1000);

    });

});

var navigazione = "home";

function naviga() {

    if (navigazione == "home") {
        $("#sceltapercorso > div").hide();
        $("#sceltapercorso").css("flex-basis", "40%");
        $("#sceltapercorso2").css("flex-basis", "60%");

        $("#filtri").animate({ bottom: '-100%' });
        
        $("#menudestro > h3").text("Explore freely");
        $("#menudestro > img").addClass("ruota180");


        setTimeout(function () {
            $("#sceltapercorso").addClass("bordo-lf");
        }, 50);
        navigazione = "menù";
        setTimeout(function () {
            $("#sceltapercorso > div").show();
        }, 500);
    } else if (navigazione == "menù") {
        $("#sceltapercorso > div").hide();
        $("#sceltapercorso").css("flex-basis", "0%");
        $("#sceltapercorso2").css("flex-basis", "100%");

        $("#filtri").animate({ bottom: '0%' });

        $("#menudestro > h3").text("Explore a route");
        $("#menudestro > img").removeClass("ruota180");

        setTimeout(function () {
            $("#sceltapercorso").removeClass("bordo-lf");
        }, 500);
        navigazione = "home";
    }
};