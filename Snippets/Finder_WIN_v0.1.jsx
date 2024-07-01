#target illustrator

// Funzione per ottenere il contenuto della cartella
function getFolderContents(folderPath) {
    var folder = new Folder(folderPath);
    if (!folder.exists) {
        alert("La cartella non esiste: " + folderPath);
        return null;
    }
    return folder.getFiles();
}

// Funzione per creare una finestra di dialogo per la selezione del file
function selectFile(files) {
    var dialog = new Window('dialog', 'Seleziona un file');
    dialog.orientation = 'column';

    var listBox = dialog.add('listbox', undefined, files);
    listBox.size = [300, 150];
    
    var buttonGroup = dialog.add('group');
    buttonGroup.orientation = 'row';
    buttonGroup.alignment = 'center';
    
    var okButton = buttonGroup.add('button', undefined, 'Apri', {name: 'ok'});
    var cancelButton = buttonGroup.add('button', undefined, 'Annulla', {name: 'cancel'});

    okButton.onClick = function() {
        dialog.close(1);
    }

    cancelButton.onClick = function() {
        dialog.close(0);
    }

    if (dialog.show() == 1) {
        return listBox.selection ? listBox.selection.text : null;
    }
    return null;
}

// Percorso della cartella condivisa
var folderPath = '\\\\olallanas\\Condivisa Olalla.it\\Alessandro\\ASSETs';

// Ottieni i file nella cartella
var files = getFolderContents(folderPath);
if (files) {
    var fileNames = [];
    for (var i = 0; i < files.length; i++) {
        if (files[i] instanceof File) {
            fileNames.push(decodeURIComponent(files[i].name));
        }
    }

    // Apri la finestra di dialogo per la selezione del file
    var selectedFileName = selectFile(fileNames);
    if (selectedFileName) {
        var fileToOpen = new File(folderPath + '\\' + selectedFileName);
        if (fileToOpen.exists) {
            app.open(fileToOpen);
        } else {
            alert("File non trovato: " + selectedFileName);
        }
    }
}
