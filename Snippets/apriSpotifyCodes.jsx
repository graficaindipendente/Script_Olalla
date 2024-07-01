#target illustrator

// Funzione per aprire un URL nel browser predefinito
function openWebPage(url) {
    // Controlla il sistema operativo
    if ($.os.match(/Windows/i)) {
        var cmd = 'cmd /c start "" "' + url + '"';
    } else {
        var cmd = 'open "' + url + '"';
    }
    system.callSystem(cmd);
}

// URL della pagina da aprire
var spotifyCodesURL = "https://www.spotifycodes.com/#create";

// Apri la pagina web
openWebPage(spotifyCodesURL);
