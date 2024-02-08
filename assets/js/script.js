$(document).ready(function () {

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
            var content = $(this).data('content');
            var imageUrl = $(this).data('image');
            var animal = $(this).data('animal');
    
            // Creazione del nuovo popover in un div separato
            var popoverHtml = '<div class="popover-content padding-10">';
            popoverHtml += '<img src="' + imageUrl + '" alt="Artifact" class="spazio-10">';
            popoverHtml += '<h4 class="spazio-10">' + content + '</h4>';
            popoverHtml += '<span class="pill">' + animal + '</span>';
            popoverHtml += '</div>';
    
            // Inserisci il popover nell'HTML
            $('body').append(popoverHtml);
    
            // Posiziona il popover
            var objectPosition = $(this).offset();
            var popoverHeight = $('.popover-content').outerHeight();
            var windowWidth = $(window).width();
            var windowHeight = $(window).height();
    
            var topPosition = objectPosition.top - popoverHeight - 10;
            var leftPosition = objectPosition.left;
    
            // Verifica se c'è spazio sufficiente sopra l'oggetto per il popover
            if (topPosition < 0) {
                topPosition = objectPosition.top + $(this).outerHeight() + 10;
            }
    
            // Verifica se c'è spazio sufficiente a destra dell'oggetto per il popover
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

});

// Menu

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
            $("#sceltapercorso > div").load("assets/data/chose-route.html"); console.log("Caricato");
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
        }, 10); // Pausa di 3 secondi prima di riavviare la vibrazione
    }

    mainInterval = setInterval(selectRandomElements, Math.random() * 500 + 500);
    // Resetta e metti in pausa ogni 5 secondi
    setInterval(resetAndPause, 5000);
}
