#target illustrator

// Funzione principale
function selectGreenObjects(tolerance) {
    var doc = app.activeDocument;

    // Deseleziona tutti gli oggetti prima di iniziare
    doc.selection = null;

    // Funzione per determinare se il colore è verde
    function isGreenColor(aiColor, tolerance) {
        if (aiColor.typename === "RGBColor") {
            // Definire il verde come un colore con una componente verde maggiore delle altre
            return (aiColor.green - aiColor.red > tolerance) && (aiColor.green - aiColor.blue > tolerance);
        }
        return false;
    }

    // Itera su tutti gli oggetti nel documento
    for (var i = 0; i < doc.pageItems.length; i++) {
        var item = doc.pageItems[i];

        // Controlla il tipo di oggetto
        if (item.typename === "PathItem" || item.typename === "CompoundPathItem" || item.typename === "TextFrame") {
            // Controlla se l'oggetto ha un riempimento verde
            if (item.filled && isGreenColor(item.fillColor, tolerance)) {
                item.selected = true;
            }
            // Controlla se l'oggetto ha un contorno verde
            if (item.stroked && isGreenColor(item.strokeColor, tolerance)) {
                item.selected = true;
            }
        }
    }
}

// Tolleranza per identificare il verde
var tolerance = 50; // puoi modificare questo valore per un controllo più preciso

// Esegui la funzione principale
selectGreenObjects(tolerance);

// Messaggio di conferma
alert("Oggetti di colore verde selezionati.");
