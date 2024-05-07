document.getElementById('magicLamp').addEventListener('click', function() {
    const glitter = document.getElementById('glitter');
    glitter.style.display = 'block';
    glitter.style.opacity = '0.5'; // Setzt die Transparenz des Glitzers

    setTimeout(() => {
        glitter.style.opacity = '0';
        setTimeout(() => {
            glitter.style.display = 'none';
            fetchResults();
        }, 1000); // Kürzere Zeit für das Verschwinden des Glitzers
    }, 1000); // Kurze Sichtbarkeit des Glitzers
});

function fetchResults() {
    fetch('https://aareguru.existenz.ch/v2018/current?city=bern')
        .then(response => response.json())
        .then(data => {
            const result = document.getElementById('result');
            const date = new Date().toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            const isGoodDay = data.aare.temperature > 20;
            result.innerHTML = `<h2>Ist heute, ${date}, ein guter Tag zum Aare-Schwimmen?</h2> <h3>${isGoodDay ? 'Yeah, pack deine Badesachen! 😊' : 'Nope, heute wird das wohl nichts.😟'}</h3>`;
            result.innerHTML += `<p>Wassertemperatur: ${data.aare.temperature}°C</p>`;
            result.innerHTML += `<p>Wasserstand: ${data.aare.level} cm</p>`;
            result.innerHTML += `<p>Fließgeschwindigkeit: ${data.aare.flow} m³/s</p>`;
            result.innerHTML += `<p>Gewässerzustand: ${data.aare.text}</p>`;
            result.className = isGoodDay ? 'good-day' : 'bad-day';
            result.style.display = 'block';
            setTimeout(() => result.style.opacity = 1, 100);
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Aare-Daten:', error);
            document.getElementById('result').innerHTML = `<p>Leider konnten die Daten nicht geladen werden. 😞</p>`;
        });
}
