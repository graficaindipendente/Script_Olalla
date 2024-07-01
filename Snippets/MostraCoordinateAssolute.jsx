// Salva il contenuto del file come `MostraCoordinateAssolute.jsx`
#target "illustrator"

function main() {
    if (app.selection.length == 0) {
        alert("Seleziona un oggetto prima di eseguire lo script.");
        return;
    }

    var selectedObject = app.selection[0];
    var bounds = selectedObject.geometricBounds;
    var x1 = bounds[0];
    var y1 = bounds[1];
    var x2 = bounds[2];
    var y2 = bounds[3];
    var width = x2 - x1;
    var height = y1 - y2;
    var centerX = x1 + width / 2;
    var centerY = y1 - height / 2;
    
    var message = "Coordinate Assolute dell'Oggetto Selezionato:\n" +
                  "X: " + centerX.toFixed(2) + "\n" +
                  "Y: " + centerY.toFixed(2) + "\n" +
                  "Larghezza: " + width.toFixed(2) + "\n" +
                  "Altezza: " + height.toFixed(2);
    alert(message);
}

main();
