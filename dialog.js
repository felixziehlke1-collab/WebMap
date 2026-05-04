// 1. Funktionen zum Verwalten der Cookies
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    // path=/ sorgt dafür, dass der Cookie auf der ganzen Webseite gültig ist
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
    console.log("Cookie gesetzt: " + name);
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// 2. Die Logik beim Laden der Seite
document.addEventListener("DOMContentLoaded", () => {
    const okmap = document.getElementById('okmap');
    const mydialog = document.getElementById('mydialog');

    // PRÜFUNG: Ist der Cookie vorhanden?
    if (getCookie("warning_accepted") === "true") {
        console.log("Cookie erkannt. Lade Karte direkt...");
        if (typeof loadMap === "function") {
            loadMap();
        }
        // Der Dialog wird hier NICHT geöffnet (bleibt unsichtbar)
    } else {
        console.log("Kein Cookie gefunden. Zeige Warnhinweis.");
        if (mydialog) {
            mydialog.show(); // Oder showModal(), falls alles andere gesperrt sein soll
        }
    }

    // 3. Klick-Event für den Button
    if (okmap) {
        okmap.addEventListener("click", (event) => {
            // Cookie für 30 Tage speichern
            setCookie("warning_accepted", "true", 30);
            
            // Karte laden
            if (typeof loadMap === "function") {
                loadMap();
            }
            
            // Dialog schließen (falls er nicht durch form method="dialog" von selbst schließt)
            if (mydialog && typeof mydialog.close === "function") {
                mydialog.close();
            }
        });
    }
});