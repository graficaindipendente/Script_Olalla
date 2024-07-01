#target illustrator

// Funzione per convertire tutto il testo in tracciati
function convertTextToOutlines(doc) {
    for (var i = 0; i < doc.textFrames.length; i++) {
        var textFrame = doc.textFrames[i];
        // Controlla se il testo è già convertito in tracciato
        if (!textFrame.convertedToOutlines) {
            textFrame.createOutline();
        }
    }
}

// Funzione per adattare la tavola da disegno al contenuto
function fitArtboardToContentAndResize(doc) {
    var abIndex = doc.artboards.getActiveArtboardIndex();
    var artboard = doc.artboards[abIndex];
    
    // Seleziona tutto il contenuto per adattare la tavola
    doc.selection = null; // Deseleziona tutto
    doc.selectObjectsOnActiveArtboard(); // Seleziona tutto sulla tavola da disegno
    
    // Adatta la tavola al contenuto selezionato
    var contentBounds = doc.visibleBounds; // [x1, y1, x2, y2] in punti
    var contentWidth = contentBounds[2] - contentBounds[0];
    var contentHeight = contentBounds[1] - contentBounds[3];
    
    // Modifica la larghezza della tavola a 430mm mantenendo la posizione originale
    var newWidth = 430; // Larghezza desiderata in millimetri
    var newWidthPoints = newWidth * 2.83464567; // Conversione mm a punti
    var newArtboardRect = [
        contentBounds[0], // x1 (sinistra)
        contentBounds[1], // y1 (sopra)
        contentBounds[0] + newWidthPoints, // x2 (destra)
        contentBounds[1] - contentHeight // y2 (sotto)
    ];
    
    artboard.artboardRect = newArtboardRect;
    doc.selection = null; // Deseleziona tutto
}

// Verifica che ci sia un documento aperto
if (app.documents.length > 0) {
    var doc = app.activeDocument;

    // Converte tutto il testo in tracciati
    convertTextToOutlines(doc);

    // Adatta la tavola da disegno al contenuto e modifica la larghezza a 430mm
    fitArtboardToContentAndResize(doc);

    alert("Testo convertito in tracciati e tavola da disegno adattata e ridimensionata a 430mm di larghezza.");
} else {
    alert("Nessun documento aperto. Apri un documento e riprova.");
}
