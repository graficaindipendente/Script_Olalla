// Script Adobe Illustrator per selezionare tutti gli oggetti nel livello chiamato "fustella"

// Ottieni il documento attivo
var doc = app.activeDocument;

// Nome del livello da cercare
var targetLayerName = "fustella";

// Trova il livello con il nome specificato
function findLayerByName(name) {
    for (var i = 0; i < doc.layers.length; i++) {
        if (doc.layers[i].name.toLowerCase() === name.toLowerCase()) {
            return doc.layers[i];
        }
    }
    return null;
}

// Seleziona tutti gli oggetti nel livello specificato
function selectAllObjectsInLayer(layer) {
    for (var j = 0; j < layer.pageItems.length; j++) {
        layer.pageItems[j].selected = true;
    }
}

// Esegui la selezione
var targetLayer = findLayerByName(targetLayerName);
if (targetLayer !== null) {
    selectAllObjectsInLayer(targetLayer);
    alert("Selezione completata nel livello '" + targetLayerName + "'.");
} else {
    alert("Livello '" + targetLayerName + "' non trovato.");
}
