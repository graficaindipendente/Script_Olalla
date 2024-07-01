// Script JSX per Adobe Illustrator per visualizzare e modificare i metadati del documento

// Funzione per visualizzare e modificare i metadati
function editDocumentMetadata() {
    if (app.documents.length > 0) {
        var doc = app.activeDocument;
        
        // Ottieni i metadati esistenti
        var title = doc.info.title || "";
        var author = doc.info.author || "";
        var description = doc.info.description || "";
        var keywords = doc.info.keywords || "";

        // Crea una finestra di dialogo per visualizzare e modificare i metadati
        var dialog = new Window('dialog', 'Modifica Metadati Documento');
        dialog.orientation = 'column';
        
        // Campo Titolo
        dialog.add('statictext', undefined, 'Titolo:');
        var titleInput = dialog.add('edittext', undefined, title);
        titleInput.characters = 30;
        
        // Campo Autore
        dialog.add('statictext', undefined, 'Autore:');
        var authorInput = dialog.add('edittext', undefined, author);
        authorInput.characters = 30;
        
        // Campo Descrizione
        dialog.add('statictext', undefined, 'Descrizione:');
        var descriptionInput = dialog.add('edittext', undefined, description);
        descriptionInput.characters = 30;
        
        // Campo Parole Chiave
        dialog.add('statictext', undefined, 'Parole Chiave:');
        var keywordsInput = dialog.add('edittext', undefined, keywords);
        keywordsInput.characters = 30;
        
        // Pulsante OK
        var okButton = dialog.add('button', undefined, 'OK');
        okButton.onClick = function() {
            // Imposta i metadati nel documento
            doc.info.title = titleInput.text;
            doc.info.author = authorInput.text;
            doc.info.description = descriptionInput.text;
            doc.info.keywords = keywordsInput.text;

            dialog.close();
        };
        
        // Mostra la finestra di dialogo
        dialog.show();
    } else {
        alert("Non ci sono documenti aperti.");
    }
}

// Esegui la funzione
editDocumentMetadata();
