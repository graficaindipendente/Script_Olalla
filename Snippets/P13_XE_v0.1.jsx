#target illustrator

// Funzione per sbloccare tutti i livelli
function unlockAllLayers(doc) {
    for (var i = 0; i < doc.layers.length; i++) {
        doc.layers[i].locked = false;
    }
}

// Funzione per cancellare tutti i livelli vuoti
function deleteEmptyLayers(doc) {
    for (var i = doc.layers.length - 1; i >= 0; i--) {
        var layer = doc.layers[i];
        if (layer.pageItems.length === 0) {
            layer.remove();
        }
    }
}

// Funzione per cancellare tutti gli elementi fuori dalla tavola da disegno
function deleteItemsOutsideArtboard(doc) {
    var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
    var artboardRect = artboard.artboardRect; // [x1, y1, x2, y2] in punti

    for (var i = doc.pageItems.length - 1; i >= 0; i--) {
        var item = doc.pageItems[i];
        if (!isItemInsideArtboard(item, artboardRect)) {
            item.remove();
        }
    }
}

// Funzione per verificare se un elemento è dentro la tavola da disegno
function isItemInsideArtboard(item, artboardRect) {
    var itemBounds = item.visibleBounds; // [x1, y1, x2, y2] in punti

    // Verifica se l'elemento è interamente o parzialmente dentro la tavola
    return !(itemBounds[2] < artboardRect[0] || itemBounds[0] > artboardRect[2] || 
             itemBounds[1] > artboardRect[1] || itemBounds[3] < artboardRect[3]);
}


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

    app.executeMenuCommand('unlockAll'); // Sblocca tutti i livelli ed elementi
    deleteEmptyLayers(doc);
    deleteItemsOutsideArtboard(doc);
        convertTextToOutlines(doc);

    // Adatta la tavola da disegno al contenuto e modifica la larghezza a 430mm
    fitArtboardToContentAndResize(doc);

    alert("P13js for XE: Operazioni completate.");
} else {
    alert("Nessun documento aperto. Apri un documento e riprova.");
}
