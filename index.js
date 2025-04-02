

let currentIndex = 0;

function slideImages() {
    const carousel = document.querySelector('.carousel-images');
    const totalImages = carousel.children.length;
    
    // Incrementamos en 1 porque estamos mostrando dos imágenes a la vez
    currentIndex += 2;
    if (currentIndex >= totalImages) {
        currentIndex = 0; // Regresar al inicio si superamos el total de imágenes
    }

    // Mover el carrusel al nuevo índice
    carousel.style.transform = `translateX(-${currentIndex * 50}%)`;
}

// Botón de avanzar (next)
document.querySelector('.next').addEventListener('click', () => {
    const carousel = document.querySelector('.carousel-images');
    const totalImages = carousel.children.length;

    currentIndex += 2; // Avanzamos dos imágenes
    if (currentIndex >= totalImages) {
        currentIndex = 0; // Si llegamos al final, volvemos al principio
    }
    carousel.style.transform = `translateX(-${currentIndex * 50}%)`;
});

// Botón de retroceder (prev)
document.querySelector('.prev').addEventListener('click', () => {
    const carousel = document.querySelector('.carousel-images');
    const totalImages = carousel.children.length;

    currentIndex -= 2; // Retrocedemos dos imágenes
    if (currentIndex < 0) {
        currentIndex = totalImages - 2; // Si llegamos al principio, vamos al final
    }
    carousel.style.transform = `translateX(-${currentIndex * 50}%)`;
});

// Deslizar automáticamente cada 3 segundos
setInterval(slideImages, 3000);
