// Script JSX per Adobe Illustrator per aggiungere una lista di numeri ai metadati del documento

function addNumbersToMetadata() {
    if (app.documents.length > 0) {
        var doc = app.activeDocument;

        // Crea una finestra di dialogo per inserire i numeri
        var dialog = new Window('dialog', 'Inserisci Numeri nei Metadati');
        dialog.orientation = 'column';
        dialog.alignChildren = 'left';

        // Istruzioni
        dialog.add('statictext', undefined, 'Inserisci numeri a 6 cifre separati da virgole:');
        
        // Campo di input per i numeri
        var numbersInput = dialog.add('edittext', undefined, '');
        numbersInput.characters = 50;
        numbersInput.active = true;

        // Aggiungi uno spazio
        dialog.add('panel', undefined, undefined);

        // Pulsante OK
        var okButton = dialog.add('button', undefined, 'OK', { name: 'ok' });
        okButton.onClick = function() {
            var input = numbersInput.text.trim();
            var numbersArray = input.split(',');

            // Valida i numeri
            var validNumbers = [];
            for (var i = 0; i < numbersArray.length; i++) {
                var number = numbersArray[i].trim();
                if (/^\d{6}$/.test(number)) {
                    validNumbers.push(number);
                } else {
                    alert("Numero non valido trovato: " + number);
                    return;
                }
            }

            // Aggiungi i numeri ai metadati
            var existingNumbers = doc.info.get("Numbers") || "";
            var updatedNumbers = existingNumbers + (existingNumbers ? "," : "") + validNumbers.join(",");
            doc.info.set("Numbers", updatedNumbers);

            dialog.close();
        };

        // Pulsante Annulla
        var cancelButton = dialog.add('button', undefined, 'Annulla', { name: 'cancel' });
        cancelButton.onClick = function() {
            dialog.close();
        };

        // Mostra la finestra di dialogo
        dialog.show();
    } else {
        alert("Non ci sono documenti aperti.");
    }
}

// Aggiungi la funzione per gestire i metadati personalizzati
DocumentInfo.prototype.get = function(key) {
    return this[key] || "";
};

DocumentInfo.prototype.set = function(key, value) {
    this[key] = value;
};

// Esegui la funzione
addNumbersToMetadata();
