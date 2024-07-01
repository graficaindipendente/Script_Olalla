#target illustrator

// Funzione principale
function selectObjectsWithColorInRange(targetColor, tolerance) {
    var doc = app.activeDocument;

    // Deseleziona tutti gli oggetti prima di iniziare
    doc.selection = null;

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
    for (var i = 0; i < doc.pageItems.length; i++) {
        var item = doc.pageItems[i];

        // Controlla il tipo di oggetto
        if (item.typename === "PathItem" || item.typename === "CompoundPathItem" || item.typename === "TextFrame") {
            // Controlla se l'oggetto ha un riempimento con il colore specificato entro la tolleranza
            if (item.filled && colorsMatch(item.fillColor, targetColor, tolerance)) {
                item.selected = true;
            }
            // Controlla se l'oggetto ha un contorno con il colore specificato entro la tolleranza
            if (item.stroked && colorsMatch(item.strokeColor, targetColor, tolerance)) {
                item.selected = true;
            }
        }
    }
}

// Colore RGB specificato
var targetColor = {red: 0, green: 155, blue: 62};
// Tolleranza di colore
var tolerance = 10;

// Esegui la funzione principale
selectObjectsWithColorInRange(targetColor, tolerance);

// Messaggio di conferma
alert("Oggetti con colore simile a RGB(" + targetColor.red + ", " + targetColor.green + ", " + targetColor.blue + ") selezionati.");
