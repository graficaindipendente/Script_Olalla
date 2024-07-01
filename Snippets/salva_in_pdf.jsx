#target illustrator

// Funzione per salvare il documento in PDF con Qualità Tipografica
function saveAsPDFWithHighQuality(doc, networkPath2) {
    try {
        // Estrai il nome del file senza estensione
        var fileName = doc.name.replace(/\.ai$/i, ""); // Rimuovi l'estensione .ai se presente
        var pdfFile = new File(networkPath2 + "/" + fileName + ".pdf");

        // Imposta le opzioni di salvataggio per il PDF
        var pdfSaveOptions = new PDFSaveOptions();
        pdfSaveOptions.compatibility = PDFCompatibility.ACROBAT5; // Compatibilità Acrobat 5 (PDF 1.4)
        pdfSaveOptions.preserveEditability = false; // Non preservare l'editabilità
        pdfSaveOptions.colorConversionID = ColorConversion.COLORCONVERSIONNONE;
        pdfSaveOptions.colorDestinationID = ColorDestination.COLORDONOTMANAGE;
        pdfSaveOptions.colorProfileID = ColorProfile.COLORPROFILECUSTOM;
        pdfSaveOptions.compressionType = CompressionQuality.JPEGMAXIMUM; // Massima qualità di compressione JPEG
        pdfSaveOptions.pdfXStandard = PDFXStandard.PDFXNONE;
        pdfSaveOptions.optimizeForFastWebView = false;
        pdfSaveOptions.generateThumbnails = true;

        // Salva il documento come PDF
        doc.saveAs(pdfFile, pdfSaveOptions);
        alert("Documento salvato come PDF in: " + pdfFile.fullName);
    } catch (e) {
        alert("Errore durante il salvataggio del documento in PDF: " + e);
    }
}

// Verifica che ci sia un documento aperto
if (app.documents.length > 0) {
    var doc = app.activeDocument;

    // Percorso di rete
    var networkPath2 = "//192.168.0.10/NAS/Gra/Xe";

    // Salva il documento in PDF con Qualità Tipografica
    saveAsPDFWithHighQuality(doc, networkPath2);

} else {
    alert("Nessun documento aperto. Apri un documento e riprova.");
}
