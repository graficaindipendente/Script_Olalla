#target illustrator

// Funzione per aprire un documento e salvarlo con un nuovo nome
function openAndSaveTemplate() {
    try {
        // Percorsi di rete
        var templatePath = "//192.168.1.113/Nas/P13/Template/";
        var savePath = "//192.168.1.113/Nas/P13/";

        // Seleziona il file da aprire
        var templateFile = File.openDialog("Seleziona il file template da aprire", "*.ai", false);
        
        if (templateFile) {
            // Apri il documento
            var doc = app.open(templateFile);
            
            // Estrai il nome del file senza estensione
            var fileName = templateFile.name;
            var fileBaseName = fileName.replace(/\.ai$/i, ""); // Rimuovi l'estensione .ai
            
            // Ottieni la data odierna senza anno
            var date = new Date();
            var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mese (01-12)
            var day = date.getDate().toString().padStart(2, '0'); // Giorno (01-31)
            var dateSuffix = month + day; // Formato MMDD
            
            // Sostituisci "template" con la data odierna senza anno
            var newFileName = fileBaseName.replace(/template/i, dateSuffix);
            
            // Percorso completo per salvare il nuovo file
            var newFile = new File(savePath + newFileName + ".ai");
            
            // Imposta le opzioni di salvataggio
            var saveOptions = new IllustratorSaveOptions();
            saveOptions.compatibility = Compatibility.ILLUSTRATOR17; // Illustrator CS3 (modifica se necessario)
            
            // Salva il documento con il nuovo nome
            doc.saveAs(newFile, saveOptions);
            alert("Documento salvato come: " + newFile.fullName);
            
        } else {
            alert("Nessun file selezionato.");
        }
    } catch (e) {
        alert("Errore durante l'operazione: " + e);
    }
}

// Funzione per chiudere la finestra dello script
function closeScript() {
    alert("Chiusura della finestra dello script.");
}

// Chiedi all'utente cosa fare
var userChoice = confirm("Vuoi aprire un documento template? Se selezioni Annulla, verrà chiusa la finestra dello script.");

if (userChoice) {
    openAndSaveTemplate();
} else {
    closeScript();
}
