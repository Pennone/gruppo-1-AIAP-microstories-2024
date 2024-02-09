var navigazione = "home";
var home_id;
var database;
var elementoTrovato;

$(document).ready(function () {

    // Lettura database

    $.getJSON('assets/data/data.json', function (data) {
        console.log("Database letto!");

        database = data;
        saveToSessionStorage("database", database);
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
            var soloNumero = home_hover_id.replace("img_", '');
            var soloNumero = parseInt(soloNumero, 10);

            var elementoTrovato = trovaElementoPerId(database, soloNumero);

            var popoverHtml = '<div class="popover-content padding-10">';
            popoverHtml += '<span class="pill flex maiuscola">' + elementoTrovato.animal + '</span>';
            popoverHtml += '<div class="flex padding-10"><img src="' + elementoTrovato.img + '" alt="' + elementoTrovato.title + '" class="centra"></div>';
            popoverHtml += '<h4>' + elementoTrovato.title + '</h4>';
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

        var home_id = $(this).attr("id");
        var soloNumero = home_id.replace("img_", '');
        var soloNumero = parseInt(soloNumero, 10);

        var database = getFromSessionStorage("database");

        var elementoTrovato = trovaElementoPerId(database, soloNumero);
        saveToSessionStorage("artefatto_temp", elementoTrovato);

        if (navigazione == "home" || navigazione == "info-home2") {
            navigazione = "info-home";
            naviga(home_id);
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
    return null;
}

// Menu

function naviga(id) {

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

        $("#XXXinterpretation").addClass("nascosto");
        $("#XXXpictografic").addClass("nascosto");
        $("#XXXrealistic").addClass("nascosto");
        $("#XXXsurreal").addClass("nascosto");
        $("#XXXartifacts").addClass("nascosto");
        $("#XXXrecord_cover").addClass("nascosto");
        $("#XXXposter").addClass("nascosto");
        $("#XXXpackaging").addClass("nascosto");
        $("#XXXdrawing").addClass("nascosto");
        $("#XXXcomic").addClass("nascosto");
        $("#XXXmagazine").addClass("nascosto");
        $("#XXXbook_cover").addClass("nascosto");
        $("#XXXtechnique").addClass("nascosto");
        $("#XXXillustration").addClass("nascosto");
        $("#XXXphotographic").addClass("nascosto");
        $("#XXXmixed_media").addClass("nascosto");

        navigazione = "menù";

    } else if (navigazione == "info-home") {
        $("#sceltapercorso > div").html(" "); //Svuota div
        removeFromSessionStorage("tab_temp");
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
        const $randomOuterElements = $allOuterElements.sort(() => Math.random() - 0.5).slice(0, 30); // Seleziona 30 elementi
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
            $("#sceltapercorso > div").load("assets/data/scope.html");
            navigazione = "route";
            $("#menudestro > h3").text("Explore other routes");
            break;
        case "route-interpretazione":
            $("#sceltapercorso > div").load("assets/data/interpretation.html");
            navigazione = "route";
            $("#menudestro > h3").text("Explore other routes");
            break;
    }
}

function caricamento_tab(tab) {
    switch (tab) {
        case "3tab_home":
            $("#contenuto-tab").load("assets/data/3home.html");

            $("#3tab_home").addClass("active");
            $("#3tab_surreal").removeClass("active");
            $("#3tab_pictographic").removeClass("active");
            $("#3tab_realistic").removeClass("active");

            $("#XXXpictografic").removeClass("nascosto");
            $("#XXXrealistic").removeClass("nascosto");
            $("#XXXsurreal").removeClass("nascosto");

            break;
        case "3tab_surreal":
            $("#contenuto-tab").load("assets/data/surreal.html");

            $("#3tab_home").removeClass("active");
            $("#3tab_surreal").addClass("active");
            $("#3tab_pictographic").removeClass("active");
            $("#3tab_realistic").removeClass("active");

            $("#XXXpictografic").addClass("nascosto");
            $("#XXXrealistic").addClass("nascosto");
            $("#XXXsurreal").removeClass("nascosto");

            break;
        case "3tab_pictographic":
            $("#contenuto-tab").load("assets/data/pictographic.html");

            $("#3tab_home").removeClass("active");
            $("#3tab_surreal").removeClass("active");
            $("#3tab_pictographic").addClass("active");
            $("#3tab_realistic").removeClass("active");

            $("#XXXpictografic").removeClass("nascosto");
            $("#XXXrealistic").addClass("nascosto");
            $("#XXXsurreal").addClass("nascosto");

            break;
        case "3tab_realistic":
            $("#contenuto-tab").load("assets/data/realistic.html");

            $("#3tab_home").removeClass("active");
            $("#3tab_surreal").removeClass("active");
            $("#3tab_pictographic").removeClass("active");
            $("#3tab_realistic").addClass("active");

            $("#XXXpictografic").addClass("nascosto");
            $("#XXXrealistic").removeClass("nascosto");
            $("#XXXsurreal").addClass("nascosto");

            break;
    }
    saveToSessionStorage("tab_temp", tab);
}

//filtri

var database = getFromSessionStorage("database");

function getUniqueAndSortedAuthors(database) {
    var authors = [];
    $.each(database, function (index, item) {
      if ($.inArray(item.author, authors) === -1) {
        authors.push(item.author);
      }
    });
    // Ordina gli autori in ordine alfabetico
    authors.sort();
    return authors;
  }

// Funzione per popolare il select con i valori degli autori
function populateAuthorSelect(authors) {
    var select = $("#autore");
    $.each(authors, function (index, author) {
      // Se l'autore è "sconosciuto", visualizza la stringa appropriata
      var displayText = (author === "unknown") ? "Sconosciuto" : author;
      select.append("<option value='" + author + "'>" + displayText + "</option>");
    });
  }

function getUniqueAndSortedYears(database) {
    var years = [];
    $.each(database, function (index, item) {
      if ($.inArray(item.year, years) === -1) {
        years.push(item.year);
      }
    });
    // Ordina gli anni in modo cronologico
    years.sort(function (a, b) {
      return a - b;
    });
    return years;
  }

// Funzione per popolare il select con i valori degli anni
function populateYearSelect(years) {
    var select = $("#data");
    $.each(years, function (index, year) {
      // Se l'anno è 0, visualizza "sconosciuto", altrimenti visualizza l'anno
      var displayText = (year === 0) ? "Sconosciuto" : year;
      select.append("<option value='" + year + "'>" + displayText + "</option>");
    });
  }




// Salvare dati in sessionStorage

function saveToSessionStorage(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
}

// Recuperare dati da sessionStorage

function getFromSessionStorage(key) {
    try {
        return JSON.parse(sessionStorage.getItem(key));
    } catch {
        return undefined;
    }
}

// Rimuovere dati da sessionStorage

function removeFromSessionStorage(key) {
    sessionStorage.removeItem(key);
}