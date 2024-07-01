// Mostra le coordinate assolute di un oggetto selezionato in Adobe Illustrator
#target "illustrator"

// Funzione principale
function main() {
    // Controlla se c'è almeno un oggetto selezionato
    if (app.selection.length == 0) {
        alert("Seleziona un oggetto prima di eseguire lo script.");
        return;
    }
    
    // Ottieni l'oggetto selezionato (primo oggetto nella selezione)
    var selectedObject = app.selection[0];
    
    // Ottieni le coordinate del bounding box
    var bounds = selectedObject.geometricBounds;
    var x1 = bounds[0]; // X della sinistra
    var y1 = bounds[1]; // Y dell'alto
    var x2 = bounds[2]; // X della destra
    var y2 = bounds[3]; // Y del basso
    
    // Calcola la posizione
    var width = x2 - x1;
    var height = y1 - y2;
    var centerX = x1 + width / 2;
    var centerY = y1 - height / 2;
    
    // Mostra le coordinate
    var message = "Coordinate Assolute dell'Oggetto Selezionato:\n" +
                  "X: " + centerX.toFixed(2) + "\n" +
                  "Y: " + centerY.toFixed(2) + "\n" +
                  "Larghezza: " + width.toFixed(2) + "\n" +
                  "Altezza: " + height.toFixed(2);
    alert(message);
}

// Esegui lo script
main();
