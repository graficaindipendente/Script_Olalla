#target illustrator

// Funzione principale
function deleteObjectsWithColorInRange(targetColor, tolerance) {
    var doc = app.activeDocument;
    
    // Funzione per confrontare i colori con tolleranza
    function colorsMatch(aiColor, targetColor, tolerance) {
        if (aiColor.typename === "RGBColor") {
            var diffR = Math.abs(aiColor.red - targetColor.red);
            var diffG = Math.abs(aiColor.green - targetColor.green);
            var diffB = Math.abs(aiColor.blue - targetColor.blue);
            return diffR <= tolerance && diffG <= tolerance && diffB <= tolerance;
        }
        return false;
    }

    // Itera su tutti gli oggetti nel documento
    for (var i = doc.pageItems.length - 1; i >= 0; i--) {
        var item = doc.pageItems[i];

        // Controlla il tipo di oggetto
        if (item.typename === "PathItem" || item.typename === "CompoundPathItem" || item.typename === "TextFrame") {
            // Controlla se l'oggetto ha un riempimento con il colore specificato entro la tolleranza
            if (item.filled && colorsMatch(item.fillColor, targetColor, tolerance)) {
                item.remove();
            }
            // Controlla se l'oggetto ha un contorno con il colore specificato entro la tolleranza
            if (item.stroked && colorsMatch(item.strokeColor, targetColor, tolerance)) {
                item.remove();
            }
        }
    }

    alert("Oggetti con colore simile a RGB(" + targetColor.red + ", " + targetColor.green + ", " + targetColor.blue + ") rimossi.");
}

// Colore RGB specificato
var targetColor = {red: 0, green: 155, blue: 62};
// Tolleranza di colore
var tolerance = 10;

// Esegui la funzione principale
deleteObjectsWithColorInRange(targetColor, tolerance);
