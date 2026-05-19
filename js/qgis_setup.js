var map = L.map('map', {
    zoomControl:false, maxZoom:28, minZoom:1
}).fitBounds([[52.2618956976695,13.011883311822812],[52.73034963236048,13.871181829676572]]);

map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});

// Hilfsfunktion für Popups
function removeEmptyRowsFromPopupContent(content, feature) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    var rows = tempDiv.querySelectorAll('tr');
    for (var i = 0; i < rows.length; i++) {
        var td = rows[i].querySelector('td.visible-with-data');
        var key = td ? td.id : '';
        if (td && td.classList.contains('visible-with-data') && feature.properties[key] == null) {
            rows[i].parentNode.removeChild(rows[i]);
        }
    }
    return tempDiv.innerHTML;
}

// 1. Die Styling-Funktion mit TRANSPARENZ 
function style_Ergebnis_1_0(feature) {
    var fillOpacityValue = 0.6; 
    var strokeColor = 'rgba(35,35,35,0.4)'; 

    if (feature.properties['Ergebnis'] >= 21.3 && feature.properties['Ergebnis'] <= 37.29 ) {
        return { color: strokeColor, fillOpacity: fillOpacityValue, fillColor: 'rgba(215,25,28,1.0)' };
    } else if (feature.properties['Ergebnis'] >= 37.3 && feature.properties['Ergebnis'] <= 40.99 ) {
        return { color: strokeColor, fillOpacity: fillOpacityValue, fillColor: 'rgba(234,100,63,1.0)' };
    } else if (feature.properties['Ergebnis'] >= 41.0 && feature.properties['Ergebnis'] <= 44.39 ) {
        return { color: strokeColor, fillOpacity: fillOpacityValue, fillColor: 'rgba(253,174,97,1.0)' };
    } else if (feature.properties['Ergebnis'] >= 44.4 && feature.properties['Ergebnis'] <= 47.19 ) {
        return { color: strokeColor, fillOpacity: fillOpacityValue, fillColor: 'rgba(254,224,139,1.0)' };
    } else if (feature.properties['Ergebnis'] >= 47.2 && feature.properties['Ergebnis'] <= 49.69 ) {
        return { color: strokeColor, fillOpacity: fillOpacityValue, fillColor: 'rgba(230,245,152,1.0)' };
    } else if (feature.properties['Ergebnis'] >= 49.7 && feature.properties['Ergebnis'] <= 53.29 ) {
        return { color: strokeColor, fillOpacity: fillOpacityValue, fillColor: 'rgba(171,221,164,1.0)' };
    } else if (feature.properties['Ergebnis'] >= 53.3 && feature.properties['Ergebnis'] <= 65.1 ) {
        return { color: strokeColor, fillOpacity: fillOpacityValue, fillColor: 'rgba(43,131,186,1.0)' };
    }
}

// 2. HTML-Layout für das Pop-up
var layer_Ergebnis_1 = new L.geoJson(json_Ergebnis_1, {
    style: style_Ergebnis_1_0,
    onEachFeature: function(feature, layer) {
        var props = feature.properties;
        
        // Wir nutzen Inline-Styles für die Abstände (padding), damit es luftiger wirkt
        var popupContent = '<div class="custom-popup" style="min-width: 200px;">' +
            '<div class="popup-header" style="background: #0056b3; color: white; padding: 10px; text-align: center; border-radius: 4px 4px 0 0;">' +
                '<strong>' + (props['Planungsraum'] || 'Unbekannt') + '</strong>' +
            '</div>' +
            '<div class="popup-body" style="padding: 12px;">' +
                '<table style="width: 100%; border-spacing: 0 6px; border-collapse: separate;">' +
                    '<tr style="color: #0056b3; font-weight: bold;">' +
                        '<td>Gesamt:</td>' +
                        '<td style="text-align: right;">' + (props['Ergebnis'] || '0') + '</td>' +
                    '</tr>' +
                    '<tr><td colspan="2" style="border-top: 1px solid #eee; padding: 4px 0;"></td></tr>' +
                    '<tr><td>Ökonomisch:</td><td style="text-align: right;">' + (props['Ökonomisch'] || '0') + '</td></tr>' +
                    '<tr><td>Sozial:</td><td style="text-align: right;">' + (props['Sozial'] || '0') + '</td></tr>' +
                    '<tr><td>Versorgung:</td><td style="text-align: right;">' + (props['Versorgung'] || '0') + '</td></tr>' +
                    '<tr><td>Physisch:</td><td style="text-align: right;">' + (props['Physisch'] || '0') + '</td></tr>' +
                '</table>' +
            '</div>' +
        '</div>';

        layer.bindPopup(popupContent, {
            maxWidth: 250,
            className: 'modern-popup' 
        });
    }
});
// 3. WICHTIG: Den Layer der Karte hinzufügen
layer_Ergebnis_1.addTo(map);
