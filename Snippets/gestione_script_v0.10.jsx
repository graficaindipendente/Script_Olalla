#target illustrator

// Lista di script da eseguire
var scripts = [
    {
        name: "Salva Documento in PDF Qualità Tipografica",
        description: "Salva il documento corrente come PDF con qualità tipografica.",
        func: saveAsPDFWithHighQuality
    },
    {
        name: "Sblocca Tutti i Livelli",
        description: "Sblocca tutti i livelli bloccati nel documento.",
        func: unlockAllLayers
    },
    {
        name: "Cancella Livelli Vuoti",
        description: "Cancella tutti i livelli vuoti nel documento.",
        func: deleteEmptyLayers
    },
    {
        name: "Cancella Elementi Fuori Tavola",
        description: "Cancella tutti gli elementi fuori dalla tavola da disegno.",
        func: deleteElementsOutsideArtboard
    }
];

// Funzione per salvare il documento in PDF con Qualità Tipografica
function saveAsPDFWithHighQuality() {
    try {
        var networkPath = "//192.168.0.10/NAS/Gra/Xe";
        var doc = app.activeDocument;
        var fileName = doc.name.replace(/\.ai$/i, ""); // Rimuovi l'estensione .ai se presente
        var pdfFile = new File(networkPath + "/" + fileName + ".pdf");
        var pdfSaveOptions = new PDFSaveOptions();
        pdfSaveOptions.compatibility = PDFCompatibility.ACROBAT5;
        pdfSaveOptions.preserveEditability = false;
        pdfSaveOptions.compressionType = CompressionQuality.JPEGMAXIMUM;
        pdfSaveOptions.optimizeForFastWebView = false;
        pdfSaveOptions.generateThumbnails = true;
        doc.saveAs(pdfFile, pdfSaveOptions);
        alert("Documento salvato come PDF in: " + pdfFile.fullName);
    } catch (e) {
        alert("Errore durante il salvataggio del documento in PDF: " + e);
    }
}

// Funzione per sbloccare tutti i livelli bloccati
function unlockAllLayers() {
    try {
        var doc = app.activeDocument;
        for (var i = 0; i < doc.layers.length; i++) {
            doc.layers[i].locked = false;
        }
        alert("Tutti i livelli sono stati sbloccati.");
    } catch (e) {
        alert("Errore durante lo sblocco dei livelli: " + e);
    }
}

// Funzione per cancellare tutti i livelli vuoti
function deleteEmptyLayers() {
    try {
        var doc = app.activeDocument;
        for (var i = doc.layers.length - 1; i >= 0; i--) {
            var layer = doc.layers[i];
            if (layer.pageItems.length == 0) {
                layer.remove();
            }
        }
        alert("Tutti i livelli vuoti sono stati cancellati.");
    } catch (e) {
        alert("Errore durante la cancellazione dei livelli vuoti: " + e);
    }
}

// Funzione per cancellare tutti gli elementi fuori dalla tavola da disegno
function deleteElementsOutsideArtboard() {
    try {
        var doc = app.activeDocument;
        var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()].artboardRect;
        for (var i = doc.pageItems.length - 1; i >= 0; i--) {
            var item = doc.pageItems[i];
            if (item.visibleBounds[2] < artboard[0] || item.visibleBounds[0] > artboard[2] ||
                item.visibleBounds[3] < artboard[1] || item.visibleBounds[1] > artboard[3]) {
                item.remove();
            }
        }
        alert("Tutti gli elementi fuori dalla tavola da disegno sono stati cancellati.");
    } catch (e) {
        alert("Errore durante la cancellazione degli elementi fuori dalla tavola da disegno: " + e);
    }
}

// Crea una finestra di dialogo
var dialog = new Window("dialog", "Esecuzione Script");

// Aggiunge un pannello di script con caselle di controllo
var scriptPanel = dialog.add("panel", undefined, "Seleziona Script da Eseguire:");
scriptPanel.orientation = "column";

var checkboxes = [];
for (var i = 0; i < scripts.length; i++) {
    var checkbox = scriptPanel.add("checkbox", undefined, scripts[i].name + " - " + scripts[i].description);
    checkboxes.push(checkbox);
}

// Aggiunge pulsanti OK e Annulla
var buttonGroup = dialog.add("group");
buttonGroup.orientation = "row";
var okButton = buttonGroup.add("button", undefined, "Esegui Script");
var cancelButton = buttonGroup.add("button", undefined, "Annulla");

// Gestione del clic su OK
okButton.onClick = function () {
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].value) {
            scripts[i].func(); // Esegue la funzione associata
        }
    }
    dialog.close();
};

// Gestione del clic su Annulla
cancelButton.onClick = function () {
    dialog.close();
};

// Mostra la finestra di dialogo
dialog.show();
