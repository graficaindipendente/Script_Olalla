// Script Adobe Illustrator per selezionare oggetti con note contenenti la parola "fustella"

// Ottieni il documento attivo
var doc = app.activeDocument;

// Funzione per verificare se una stringa contiene una sottostringa
function containsSubstring(str, substring) {
    return str.indexOf(substring) !== -1;
}

// Funzione principale per selezionare oggetti con note specifiche
function selectObjectsByNote() {
    // Itera attraverso tutti i livelli
    for (var i = 0; i < doc.layers.length; i++) {
        var layer = doc.layers[i];
        processLayer(layer);
    }
}

// Funzione ricorsiva per processare i layer
function processLayer(layer) {
    // Itera attraverso tutti gli oggetti del layer
    for (var j = 0; j < layer.pageItems.length; j++) {
        var item = layer.pageItems[j];
        if (item.note && containsSubstring(item.note.toLowerCase(), "fustella")) {
            item.selected = true;
        }
    }
    
    // Itera attraverso i sottolivelli
    for (var k = 0; k < layer.layers.length; k++) {
        var subLayer = layer.layers[k];
        processLayer(subLayer);
    }
}

// Esegui la funzione principale
selectObjectsByNote();

alert("Selezione completata.");
