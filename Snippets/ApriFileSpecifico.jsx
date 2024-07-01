#target illustrator

// Percorso completo del file da aprire
var filePath = '/Users/alessandropiovan/Downloads/123.ai';

// Funzione per aprire il file
function openFile(filePath) {
    var fileToOpen = new File(filePath);
    if (fileToOpen.exists) {
        app.open(fileToOpen);
        alert('File aperto con successo: ' + filePath);
    } else {
        alert('File non trovato: ' + filePath);
    }
}

// Apri il file
openFile(filePath);
