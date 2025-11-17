// Funcionalidad para páginas de perfil de modelo

// Cambio de tabs (Imágenes/Videos)
const contentTabs = document.querySelectorAll('.content-tab');
const contentSections = document.querySelectorAll('.model-content-section');

contentTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        
        // Remover active de todos los tabs
        contentTabs.forEach(t => t.classList.remove('active'));
        // Agregar active al tab clickeado
        tab.classList.add('active');
        
        // Ocultar todas las secciones
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Mostrar la sección correspondiente
        const targetSection = document.getElementById(`${targetTab}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// Cambiar imagen principal al hacer clic en galería
const galleryItems = document.querySelectorAll('.gallery-item');
const mainModelImage = document.getElementById('mainModelImage');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imageSrc = item.getAttribute('data-image');
        if (mainModelImage && imageSrc) {
            mainModelImage.src = imageSrc;
            // Scroll suave hacia arriba
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});

// Modal para imágenes de la galería
const galleryImages = document.querySelectorAll('.gallery-item img');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');

if (galleryImages.length > 0 && modal) {
    galleryImages.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que cambie la imagen principal
            modal.style.display = 'block';
            modalImg.src = item.src;
            document.body.style.overflow = 'hidden';
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

