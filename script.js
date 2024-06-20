document.addEventListener('DOMContentLoaded', function() {
    // Wählt den Check-Button und den Result-Container aus
    const checkButton = document.querySelector('#checkButton');
    const resultContainer = document.querySelector('#result');
    const apiUrl = 'https://aareguru.existenz.ch/v2018/current?city=bern';

    // Fügt einen Klick-Eventlistener zum Check-Button hinzu
    checkButton.addEventListener('click', async function() {
        checkButton.style.display = 'none'; // Versteckt den Button beim Klicken
        resultContainer.innerHTML = ''; // Löscht vorherige Inhalte im Result-Container

        try {
            const response = await fetch(apiUrl); // Ruft die Daten von der API ab
            const data = await response.json(); // Parst die JSON-Daten
            const date = new Date().toLocaleDateString('de-DE', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            }); // Formatiert das Datum
            const isGoodDay = data.aare.temperature > 18; // Prüft, ob es ein guter Tag zum Schwimmen ist

            // Erstelle eine Box für das Hauptergebnis
            const dayStatusBox = document.createElement('div');
            dayStatusBox.style.backgroundColor = isGoodDay ? '#ffcc00' : '#007691'; // Setzt die Hintergrundfarbe basierend auf isGoodDay
            dayStatusBox.style.color = 'white'; // Setzt die Schriftfarbe
            dayStatusBox.style.padding = '20px'; // Fügt Polsterung hinzu
            dayStatusBox.style.borderRadius = '10px'; // Fügt abgerundete Ecken hinzu
            dayStatusBox.style.margin = '10px 10px'; // Fügt Aussenabstand hinzu
            dayStatusBox.innerHTML = `Heute, ${date}, ist ${isGoodDay ? '<b style="color: white;">ein guter Tag</b>' : '<b style="color: white;">kein guter Tag</b>'} zum Schwimmen in der Aare.`;

            // Erstelle eine Box für zusätzliche Informationen
            const infoBox = document.createElement('div');
            infoBox.style.backgroundColor = 'white'; // Setzt die Hintergrundfarbe
            infoBox.style.color = '#ff7139'; // Setzt die Schriftfarbe
            infoBox.style.padding = '20px'; // Fügt Polsterung hinzu
            infoBox.style.margin = '10px 10px'; // Fügt Aussenabstand hinzu
            infoBox.style.borderRadius = '10px'; // Fügt abgerundete Ecken hinzu
            infoBox.innerHTML = `<p>Wassertemperatur: ${data.aare.temperature}°C</p><p>Fliessgeschwindigkeit: ${data.aare.flow} m³/s</p>`;

            // Fügt die Boxen in den Result-Container ein
            resultContainer.appendChild(dayStatusBox);
            resultContainer.appendChild(infoBox);
            resultContainer.style.display = 'block'; // Zeigt den Result-Container an
        } catch (error) {
            console.error('Fehler beim Abrufen der Aare-Daten:', error); // Gibt einen Fehler aus, wenn die Daten nicht abgerufen werden konnten
            resultContainer.innerHTML = 'Leider konnten die Daten nicht geladen werden. 😞'; // Zeigt eine Fehlermeldung an
            checkButton.style.display = 'block'; // Zeigt den Button wieder an, wenn ein Fehler auftritt
        }
    });

    // Hier könnte zusätzlicher JavaScript-Code eingefügt werden
});
