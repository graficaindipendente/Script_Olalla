#target illustrator

function selectObjectsWithGraphicStyle(styleName) {
    var doc = app.activeDocument;
    doc.selection = null;

    for (var i = 0; i < doc.pageItems.length; i++) {
        var item = doc.pageItems[i];
        
        try {
            if (item.graphicStyles.length > 0 && item.graphicStyles[0].name === styleName) {
                item.selected = true;
            }
        } catch (e) {
            // Ignore errors related to items without graphic styles
        }
    }

    if (doc.selection.length > 0) {
        alert(doc.selection.length + " oggetto(i) con stile grafico '" + styleName + "' selezionato(i).");
    } else {
        alert("Nessun oggetto con stile grafico '" + styleName + "' trovato.");
    }
}

// Nome dello stile grafico
var graphicStyleName = "fustella";
selectObjectsWithGraphicStyle(graphicStyleName);
