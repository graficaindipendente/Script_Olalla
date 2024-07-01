#target illustrator

// Funzione principale
function deleteObjectsWithColor(hexColor) {
    // Converti il colore HEX in un oggetto RGB
    var rgbColor = hexToRgb(hexColor);
    if (!rgbColor) {
        alert("Colore HEX non valido.");
        return;
    }

    // Ottieni il documento attivo
    var doc = app.activeDocument;

    // Itera su tutti gli oggetti nel documento
    for (var i = doc.pageItems.length - 1; i >= 0; i--) {
        var item = doc.pageItems[i];
        
        // Controlla il tipo di oggetto
        if (item.typename === "PathItem" || item.typename === "CompoundPathItem" || item.typename === "TextFrame") {
            // Controlla se l'oggetto ha un riempimento con il colore specificato
            if (item.filled && colorsMatch(item.fillColor, rgbColor)) {
                item.remove();
            }
            // Controlla se l'oggetto ha un contorno con il colore specificato
            if (item.stroked && colorsMatch(item.strokeColor, rgbColor)) {
                item.remove();
            }
        }
    }

    alert("Oggetti con colore " + hexColor + " rimossi.");
}

// Funzione per convertire HEX in RGB
function hexToRgb(hex) {
    // Rimuovi il simbolo #
    hex = hex.replace("#", "");
    if (hex.length !== 6) {
        return null;
    }

    // Converti in numeri interi
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return {red: r, green: g, blue: b};
}

// Funzione per confrontare i colori
function colorsMatch(aiColor, rgbColor) {
    if (aiColor.typename === "RGBColor") {
        return aiColor.red === rgbColor.red && aiColor.green === rgbColor.green && aiColor.blue === rgbColor.blue;
    }
    return false;
}

// Colore HEX specificato
var targetColor = "#009B3E";

// Esegui la funzione principale
deleteObjectsWithColor(targetColor);
