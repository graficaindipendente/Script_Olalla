#target illustrator// Funzione per salvare il documento correntefunction saveDocument(doc) {    try {        // Salva il documento        doc.save();               alert("Documento salvato con successo.");    } catch (e) {        alert("Errore durante il salvataggio del documento: " + e);    }}// Sbloccare tutti i livelli bloccatifunction unlockLockedLayers(doc) {    for (var i = 0; i < doc.layers.length; i++) {        var layer = doc.layers[i];        if (layer.locked) {            layer.locked = false;            // Se desideri anche sbloccare gli oggetti bloccati all'interno di questo livello, usa il codice seguente:            unlockLockedItems(layer);        }    }}// Funzione ricorsiva per sbloccare gli oggetti bloccati all'interno di un livellofunction unlockLockedItems(parent) {    for (var i = 0; i < parent.pageItems.length; i++) {        var item = parent.pageItems[i];        if (item.locked) {            item.locked = false;        }    }    for (var j = 0; j < parent.layers.length; j++) {        unlockLockedItems(parent.layers[j]);    }}// Cancellare tutti i livelli vuotifunction deleteEmptyLayers(doc) {    for (var i = doc.layers.length - 1; i >= 0; i--) {        var layer = doc.layers[i];        if (layer.pageItems.length === 0) {            layer.remove();        }    }}// Cancellare tutti gli elementi fuori dalla tavola da disegnofunction deleteItemsOutsideArtboard(doc) {    var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];    var artboardRect = artboard.artboardRect; // [x1, y1, x2, y2] in punti    for (var i = doc.pageItems.length - 1; i >= 0; i--) {        var item = doc.pageItems[i];        if (!isItemInsideArtboard(item, artboardRect)) {            item.remove();        }    }}// Funzione per verificare se un elemento è dentro la tavola da disegnofunction isItemInsideArtboard(item, artboardRect) {    var itemBounds = item.visibleBounds; // [x1, y1, x2, y2] in punti    // Verifica se l'elemento è interamente o parzialmente dentro la tavola    return !(itemBounds[2] < artboardRect[0] || itemBounds[0] > artboardRect[2] ||              itemBounds[1] > artboardRect[1] || itemBounds[3] < artboardRect[3]);}// Funzione per selezionare tutto e convertire i testi in tracciatifunction convertAllTextToOutlines(doc) {    // Deseleziona tutto    app.selection = null;    // Seleziona tutti i textFrames    for (var i = 0; i < doc.textFrames.length; i++) {        doc.textFrames[i].selected = true;    }    // Converti i textFrames selezionati in tracciati    app.executeMenuCommand('outline');}// Funzione per adattare la tavola da disegno al contenutofunction fitArtboardToContentAndResize(doc) {    var abIndex = doc.artboards.getActiveArtboardIndex();    var artboard = doc.artboards[abIndex];        // Seleziona tutto il contenuto per adattare la tavola    doc.selection = null; // Deseleziona tutto    doc.selectObjectsOnActiveArtboard(); // Seleziona tutto sulla tavola da disegno        // Adatta la tavola al contenuto selezionatovar contentBounds = doc.visibleBounds; // [x1, y1, x2, y2] in puntivar contentWidth = contentBounds[2] - contentBounds[0];var contentHeight = contentBounds[1] - contentBounds[3];// Calcola il centro degli oggettivar centerX = contentBounds[0] + contentWidth / 2;var centerY = contentBounds[1] - contentHeight / 2;// Modifica la larghezza della tavola a 430mm mantenendo il centrovar newWidth = 430; // Larghezza desiderata in millimetrivar newWidthPoints = newWidth * 2.83464567; // Conversione mm a punti// Aggiungi 2 mm sopra e sottovar extraHeightMm = 2; // Altezza aggiuntiva sopra e sotto in millimetrivar extraHeightPoints = extraHeightMm * 2.83464567; // Conversione mm a puntivar newContentHeightPoints = contentHeight + (2 * extraHeightPoints);// Calcola le nuove coordinate della tavolavar newArtboardRect = [    centerX - newWidthPoints / 2,                 // x1 (sinistra)    centerY + newContentHeightPoints / 2,         // y1 (sopra)    centerX + newWidthPoints / 2,                 // x2 (destra)    centerY - newContentHeightPoints / 2          // y2 (sotto)];// Imposta la nuova tavola da disegnoartboard.artboardRect = newArtboardRect;doc.selection = null; // Deseleziona tutto}// Funzione per salvare una copia del documentofunction saveCopyToNetwork(doc, networkPath1) {    try {        // Prepara il file per il salvataggio        var fileName = doc.name; // Nome del documento        var copyFile = new File(networkPath1 + "/" + fileName);                // Imposta le opzioni di salvataggio per il file copia        var saveOptions = new IllustratorSaveOptions();        saveOptions.compatibility = Compatibility.ILLUSTRATOR17; // Illustrator CS3 (Modifica se necessario)                // Salva una copia del documento nel percorso di rete        doc.saveAs(copyFile, saveOptions);        alert("Copia del documento salvata con successo in: " + networkPath1);    } catch (e) {        alert("Errore durante il salvataggio della copia del documento: " + e);    }}// Funzione per salvare il documento in PDF con Qualità Tipograficafunction saveAsPDFWithHighQuality(doc, networkPath2) {    try {        // Estrai il nome del file senza estensione        var fileName = doc.name.replace(/\.ai$/i, ""); // Rimuovi l'estensione .ai se presente        var pdfFile = new File(networkPath2 + "/" + fileName + ".pdf");        // Imposta le opzioni di salvataggio per il PDF        var pdfSaveOptions = new PDFSaveOptions();        pdfSaveOptions.compatibility = PDFCompatibility.ACROBAT5; // Compatibilità Acrobat 5 (PDF 1.4)        pdfSaveOptions.preserveEditability = false; // Non preservare l'editabilità        pdfSaveOptions.colorConversionID = ColorConversion.COLORCONVERSIONNONE;        pdfSaveOptions.colorDestinationID = ColorDestination.COLORDONOTMANAGE;        pdfSaveOptions.colorProfileID = ColorProfile.COLORPROFILECUSTOM;        pdfSaveOptions.compressionType = CompressionQuality.JPEGMAXIMUM; // Massima qualità di compressione JPEG        pdfSaveOptions.pdfXStandard = PDFXStandard.PDFXNONE;        pdfSaveOptions.optimizeForFastWebView = false;        pdfSaveOptions.generateThumbnails = true;        // Salva il documento come PDF        doc.saveAs(pdfFile, pdfSaveOptions);        alert("Documento salvato come PDF in: " + pdfFile.fullName);    } catch (e) {        alert("Errore durante il salvataggio del documento in PDF: " + e);    }}// Esecuzione degli script in sequenzaif (app.documents.length > 0) {    var doc = app.activeDocument;            // Percorso di rete    var networkPath1 = "//192.168.1.139/Archivio/Grafica/Stampato";    var networkPath2 = "//192.168.0.10/NAS/Gra/Xe";            // Esegui script    saveDocument(doc);    unlockLockedLayers(doc);    deleteEmptyLayers(doc);    deleteItemsOutsideArtboard(doc);    convertAllTextToOutlines(doc);    fitArtboardToContentAndResize(doc);    saveCopyToNetwork(doc, networkPath1);    saveAsPDFWithHighQuality(doc, networkPath2);    alert("Operazioni completate.");} else {    alert("Nessun documento aperto. Apri un documento e riprova.");}