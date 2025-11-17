// Navegación móvil
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Efecto de scroll en la navegación
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Modal para imágenes de las tarjetas de modelos
const modelImages = document.querySelectorAll('.model-image img');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');

modelImages.forEach(item => {
    item.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = item.src;
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

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

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animación
const animateElements = document.querySelectorAll('.model-card, .about-content, .portfolio-content, .contact-content, .catalog-footer');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Smooth scroll para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Actualizar número de WhatsApp (reemplazar con el número real)
function updateWhatsAppLink() {
    const whatsappLink = document.querySelector('.btn-whatsapp');
    const floatingWhatsapp = document.querySelector('.floating-whatsapp');
    // Reemplazar '1234567890' con el número real (formato: código país + número sin espacios ni símbolos)
    // Ejemplo: +521234567890 para México
    const phoneNumber = '573239484452'; // Número de WhatsApp
    const message = encodeURIComponent('Hola, me interesa trabajar contigo');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    if (whatsappLink) {
        whatsappLink.href = whatsappUrl;
    }
    if (floatingWhatsapp) {
        floatingWhatsapp.href = whatsappUrl;
    }
}

// Llamar a la función al cargar
updateWhatsAppLink();

// Lazy loading para imágenes (si el navegador lo soporta)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback para navegadores que no soportan lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}



