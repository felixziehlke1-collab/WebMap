var map;
var marker;

function loadMap() {
    console.log("loadMap wird ausgeführt");
    
    // Falls die Map schon initialisiert wurde (um Fehler bei Mehrfachaufruf zu vermeiden)
    if (map) {
        return; 
    }

    // 1. Karte initialisieren
    map = L.map('mymap').setView([53.3026183, 9.2839423], 12);

    // 2. TileLayer (Kartenbilder) direkt hinzufügen
    // Hier nutzen wir den direkten Link, statt einer nicht definierten Variable
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 3. Polygon Krankenhaus Zeven hinzufügen
    L.polygon([
        [53.3033005, 9.2828412],
        [53.302554, 9.2822729],
        [53.3018481, 9.285222],
        [53.3026677, 9.2857964]
    ]).addTo(map).bindPopup("<h2>Krankenhaus Zeven</h2>");

    // WICHTIG: Erzwungene Neuberechnung der Größe, damit die Karte korrekt angezeigt wird
    setTimeout(() => { 
        map.invalidateSize(); 
    }, 200);
}

function removeMarker() {
    if (marker && map) {
        map.removeLayer(marker);
    }
}

function setMarker(lat, long, text) {
    if (!map) return;
    
    // Falls schon ein Marker da ist, entfernen wir ihn vorher
    removeMarker();
    
    marker = L.marker([lat, long]).addTo(map);
    marker.bindPopup(text).openPopup();
    map.panTo([lat, long]);
}