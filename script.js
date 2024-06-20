document.addEventListener('DOMContentLoaded', function() {
    const checkButton = document.querySelector('#checkButton');
    const resultContainer = document.querySelector('#result');
    const apiUrl = 'https://aareguru.existenz.ch/v2018/current?city=bern';

    checkButton.addEventListener('click', async function() {
        checkButton.style.display = 'none';
        resultContainer.innerHTML = '';

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const date = new Date().toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            const isGoodDay = data.aare.temperature > 16;

            const dayStatusBox = document.createElement('div');
            dayStatusBox.style.backgroundColor = isGoodDay ? '#ffcc00' : '#007691';
            dayStatusBox.style.color = 'white';
            dayStatusBox.style.padding = '20px';
            dayStatusBox.style.borderRadius = '10px';
            dayStatusBox.style.margin = '10px 10px';
            dayStatusBox.innerHTML = `Heute, ${date}, ist ${isGoodDay ? '<b style="color: white;">ein guter Tag</b>' : '<b style="color: white;">kein guter Tag</b>'} zum Schwimmen in der Aare.`;

            const infoBox = document.createElement('div');
            infoBox.style.backgroundColor = 'white';
            infoBox.style.color = '#ff7139';
            infoBox.style.padding = '20px';
            infoBox.style.margin = '10px 10px';
            infoBox.style.borderRadius = '10px';
            infoBox.innerHTML = `<p>Wassertemperatur: ${data.aare.temperature}°C</p><p>Fließgeschwindigkeit: ${data.aare.flow} m³/s</p>`;

            resultContainer.appendChild(dayStatusBox);
            resultContainer.appendChild(infoBox);
            resultContainer.style.display = 'block';
        } catch (error) {
            console.error('Fehler beim Abrufen der Aare-Daten:', error);
            resultContainer.innerHTML = 'Leider konnten die Daten nicht geladen werden. 😞';
            checkYButton.style.display = 'block';
        }
    });

    });
    