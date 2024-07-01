#target illustrator

// Funzione per sbloccare tutti i livelli bloccati
function unlockLockedLayers(doc) {
    for (var i = 0; i < doc.layers.length; i++) {
        var layer = doc.layers[i];
        if (layer.locked) {
            layer.locked = false;
            // Se desideri anche sbloccare gli oggetti bloccati all'interno di questo livello, usa il codice seguente:
            unlockLockedItems(layer);
        }
    }
}

// Funzione ricorsiva per sbloccare gli oggetti bloccati all'interno di un livello
function unlockLockedItems(parent) {
    for (var i = 0; i < parent.pageItems.length; i++) {
        var item = parent.pageItems[i];
        if (item.locked) {
            item.locked = false;
        }
    }
    for (var j = 0; j < parent.layers.length; j++) {
        unlockLockedItems(parent.layers[j]);
    }
}

// Verifica che ci sia un documento aperto
if (app.documents.length > 0) {
    var doc = app.activeDocument;
    unlockLockedLayers(doc);
    alert("Tutti i livelli e oggetti bloccati sono stati sbloccati.");
} else {
    alert("Nessun documento aperto. Apri un documento e riprova.");
}
