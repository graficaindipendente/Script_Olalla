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

// Verifica che ci sia un documento aperto
if (app.documents.length > 0) {
    var doc = app.activeDocument;

    app.executeMenuCommand('unlockAll'); // Sblocca tutti i livelli ed elementi
    deleteEmptyLayers(doc);
    deleteItemsOutsideArtboard(doc);

    alert("Operazioni completate: Livelli sbloccati, livelli vuoti eliminati, e elementi fuori dalla tavola cancellati.");
} else {
    alert("Nessun documento aperto. Apri un documento e riprova.");
}
