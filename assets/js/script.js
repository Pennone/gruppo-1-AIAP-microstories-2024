var navigazione = "home";
var home_id;
var database;

$(document).ready(function () {

    $.getJSON('assets/data/data.json', function(database) {
        console.log("Database letto!");

        /*$.each(database, function(index, item) {
            console.log('ID:', item.id);
            console.log('URL:', item.url);
            console.log('Titolo:', item.title);*/
        });
   

    // About

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


    // Popover

    $('.popover').hover(
        function () {

            var home_hover_id = $(this).attr("id");

            console.log(home_hover_id);

            /*
            var content = $(this).data('content');
            var imageUrl = $(this).data('image');
            var animal = $(this).data('animal');

            // Creazione del popover
            var popoverHtml = '<div class="popover-content padding-10">';
            popoverHtml += '<div class="spazio-10">';
            popoverHtml += '<span class="pill flex">' + animal + '</span>';
            popoverHtml += '</div>';
            popoverHtml += '<div class="flex spazio-10"><img src="' + imageUrl + '" alt="Artifact" class="spazio-10 centra"></div>';
            popoverHtml += '<h4>' + content + '</h4>';
            popoverHtml += '</div>';*/




            var popoverHtml = '<div class="popover-content padding-10">';
            popoverHtml += '<div class="spazio-10">';
            popoverHtml += '<span class="pill flex">' + animal + '</span>';
            popoverHtml += '</div>';
            popoverHtml += '<div class="flex spazio-10"><img src="' + imageUrl + '" alt="Artifact" class="spazio-10 centra"></div>';
            popoverHtml += '<h4>' + content + '</h4>';
            popoverHtml += '</div>';





            $('body').append(popoverHtml);

            // Posiziona il popover
            var objectPosition = $(this).offset();
            var popoverHeight = $('.popover-content').outerHeight();
            var windowWidth = $(window).width();
            var windowHeight = $(window).height();

            var topPosition = objectPosition.top - popoverHeight - 10;
            var leftPosition = objectPosition.left - 65;

            // Verifica se c'è spazio sufficiente sopra l'oggetto
            if (topPosition < 0) {
                topPosition = objectPosition.top + $(this).outerHeight() + 10;
            }

            // Verifica se c'è spazio sufficiente a destra dell'oggetto
            if (leftPosition + $('.popover-content').outerWidth() > windowWidth) {
                leftPosition = windowWidth - $('.popover-content').outerWidth();
            }

            $('.popover-content').css({
                top: topPosition,
                left: leftPosition
            });

            // Mostra il popover
            $('.popover-content').fadeIn();
        },
        function () {
            // Rimuovi il popover quando il mouse esce
            $('.popover-content').fadeOut(function () {
                $(this).remove();
            });
        }
    );

    $(".popover").click(function () {
        // ID dell'elemento cliccato
        home_id = $(this).attr("id");

        if (navigazione == "home") {
            navigazione = "info-home";
            naviga();
        }
    });

});

// Ricerca nell'array

function trovaElementoPerId(array, idDaCercare) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].id === idDaCercare) {
            return array[i];
        }
    }
    // Se non viene trovato nessun elemento con l'id corrispondente
    return null;
}

// Menu

function naviga() {

    if (navigazione == "home") {
        $("#sceltapercorso > div").html(" "); //Svuota div
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
            $("#sceltapercorso > div").load("assets/data/chose-route.html");
            $("#sceltapercorso > div").show();
        }, 500);
    } else if (navigazione == "menù") {
        $("#sceltapercorso > div").html(" "); //Svuota div
        $("#sceltapercorso").css("flex-basis", "0%");
        $("#sceltapercorso2").css("flex-basis", "100%");

        $("#filtri").animate({ bottom: '0%' });

        $("#menudestro > h3").text("Explore a route");
        $("#menudestro > img").removeClass("ruota180");

        setTimeout(function () {
            $("#sceltapercorso").removeClass("bordo-lf");
        }, 500);
        navigazione = "home";
    } else if (navigazione == "route") {
        $("#sceltapercorso > div").load("assets/data/chose-route.html");
        navigazione = "menù";

    } else if (navigazione == "info-home") {
        $("#sceltapercorso > div").html(" "); //Svuota div
        $("#sceltapercorso").css("flex-basis", "40%");
        $("#sceltapercorso2").css("flex-basis", "60%");

        $("#filtri").animate({ bottom: '-100%' });

        setTimeout(function () {
            $("#sceltapercorso").addClass("bordo-lf");
        }, 50);
        setTimeout(function () {
            $("#sceltapercorso > div").load("assets/data/home-info.html");
        }, 500);
        navigazione = "info-home2";
    } else if (navigazione == "info-home2") {
        $("#sceltapercorso > div").load("assets/data/chose-route.html");

        $("#menudestro > h3").text("Explore freely");
        $("#menudestro > img").addClass("ruota180");
        navigazione = "menù";

    }
};

// Vibrazione pallini

function vibrateRandomElements() {
    let isPaused = false;
    let mainInterval;

    function vibrateElement($element) {
        let translateX = 0;
        let direction = 1;

        function animate() {
            if (isPaused) return;
            translateX += direction * 0.15; // Regola la velocità del movimento
            $element.attr('transform', 'translate(' + translateX + ', 0)');
            if (Math.abs(translateX) >= 2) {
                direction *= -1;
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    function selectRandomElements() {
        const $outerGElements = $('#grafico_home > g > g');
        const $allOuterElements = $outerGElements.toArray();
        $allOuterElements.forEach((outerElement) => {
            $(outerElement).removeClass('animated');
        });
        const $randomOuterElements = $allOuterElements.sort(() => Math.random() - 0.5).slice(0, 20); // Seleziona 20 elementi
        $randomOuterElements.forEach((outerElement) => {
            $(outerElement).addClass('animated');
            const $innerGElement = $(outerElement).find('> g').eq(Math.floor(Math.random() * $(outerElement).find('> g').length));
            vibrateElement($innerGElement);
        });
    }

    function resetAndPause() {
        isPaused = true;

        setTimeout(() => {
            isPaused = false;
            selectRandomElements();
        }, 10); // Pausa prima di riavviare la vibrazione
    }

    mainInterval = setInterval(selectRandomElements, Math.random() * 500 + 500);
    setInterval(resetAndPause, 5000); // Resetta e metti in pausa ogni
}


function caricamento_pag(elemento) {
    switch (elemento) {
        case "route-tecniche":
            $("#sceltapercorso > div").load("assets/data/techniques.html");
            navigazione = "route";
            $("#menudestro > h3").text("Explore other routes");
            break;
        case "route-scopo":
            //$("#sceltapercorso > div").load("assets/data/techniques.html");
            break;
        case "route-interpretazione":
            //$("#sceltapercorso > div").load("assets/data/techniques.html");
            break;
    }
}