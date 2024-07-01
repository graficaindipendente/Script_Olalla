#target illustrator

// Funzione per salvare il documento corrente
function saveDocument(doc) {
    try {
        // Salva il documento
        doc.save();
        alert("Documento salvato con successo.");
    } catch (e) {
        alert("Errore durante il salvataggio del documento: " + e);
    }
}

// Funzione per salvare una copia del documento
function saveCopyToNetwork(doc, networkPath) {
    try {
        // Prepara il file per il salvataggio
        var fileName = doc.name; // Nome del documento
        var copyFile = new File(networkPath + "/" + fileName);
        
        // Imposta le opzioni di salvataggio per il file copia
        var saveOptions = new IllustratorSaveOptions();
        saveOptions.compatibility = Compatibility.ILLUSTRATOR17; // Illustrator CS3 (Modifica se necessario)
        
        // Salva una copia del documento nel percorso di rete
        doc.saveAs(copyFile, saveOptions);
        alert("Copia del documento salvata con successo in: " + networkPath);
    } catch (e) {
        alert("Errore durante il salvataggio della copia del documento: " + e);
    }
}

// Verifica che ci sia un documento aperto
if (app.documents.length > 0) {
    var doc = app.activeDocument;

    // Percorso di rete
    var networkPath = "//192.168.1.139/Archivio/Grafica/Stampato";

    // Salva il documento corrente
    saveDocument(doc);

    // Salva una copia del documento nel percorso di rete
    saveCopyToNetwork(doc, networkPath);

} else {
    alert("Nessun documento aperto. Apri un documento e riprova.");
}
