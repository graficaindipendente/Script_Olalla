// Prompt user for a 6-digit number
var userInput = prompt("Inserisci un numero a 6 cifre:", "");

// Validate the input
if (userInput !== null && userInput.match(/^\d{6}$/)) {
    // Construct the URL
    var url = "https://www.olalla.it/wp-admin/post.php?post=" + userInput + "&action=edit";
    
    // Open the URL in the default browser
    openURLInBrowser(url);
} else {
    alert("Errore: Devi inserire un numero di 6 cifre.");
}

// Function to open URL in default browser
function openURLInBrowser(url) {
    if (File.fs === "Windows") {
        // On Windows, use the `cmd` to open the URL
        var command = "cmd.exe /c start \"\" \"" + url + "\"";
        app.system(command);
    } else if (File.fs === "Macintosh") {
        // On Mac, use `open` command
        var command = "open \"" + url + "\"";
        app.system(command);
    } else {
        alert("Sistema operativo non supportato.");
    }
}
