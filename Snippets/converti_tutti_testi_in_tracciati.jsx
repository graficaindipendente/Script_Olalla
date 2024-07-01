#target illustrator

// Funzione per selezionare tutto e convertire i testi in tracciati
function convertAllTextToOutlines(doc) {
    // Deseleziona tutto
    app.selection = null;

    // Seleziona tutti i textFrames
    for (var i = 0; i < doc.textFrames.length; i++) {
        doc.textFrames[i].selected = true;
    }

    // Converti i textFrames selezionati in tracciati
    app.executeMenuCommand('outline');
}

// Verifica che ci sia un documento aperto
if (app.documents.length > 0) {
    var doc = app.activeDocument;
    convertAllTextToOutlines(doc);
    alert("Testo convertito in tracciati.");
} else {
    alert("Nessun documento aperto. Apri un documento e riprova.");
}
