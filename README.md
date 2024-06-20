    // Bild-Hover-Effekte für die Teammitglieder
    document.querySelectorAll('.team-image').forEach(img => {
        const originalSrc = img.src;
        const illustratedSrc = img.src.replace('.jpg', '_illustrated.jpg');

        img.addEventListener('mouseover', () => img.src = illustratedSrc);
        img.addEventListener('mouseout', () => img.src = originalSrc);
    });