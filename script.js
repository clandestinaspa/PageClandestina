// Navegación móvil
const mobileNavToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileNavToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (navMenu && mobileNavToggle && !navMenu.contains(e.target) && !mobileNavToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileNavToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Ocultar top-bar al hacer scroll SOLO en móvil (solo al inicio)
let lastScroll = 0;
const topBar = document.querySelector('.top-bar');
const navbar = document.querySelector('.navbar');
let topBarHidden = false; // Flag para saber si ya se ocultó

function handleScroll() {
    const currentScroll = window.pageYOffset;
    const isMobile = window.innerWidth <= 768;
    
    // Solo aplicar en móvil
    if (isMobile && topBar) {
        // Solo mostrar si está en la parte superior (primeros 50px)
        if (currentScroll <= 50) {
            topBar.classList.remove('hidden');
            topBarHidden = false;
        } else {
            // Ocultar cuando se hace scroll hacia abajo y aún no se ha ocultado
            if (!topBarHidden && currentScroll > lastScroll) {
                topBar.classList.add('hidden');
                topBarHidden = true;
            }
        }
    } else {
        // En PC, asegurar que siempre esté visible
        if (topBar) {
            topBar.classList.remove('hidden');
        }
    }
    
    lastScroll = currentScroll;
}

// Throttle para mejorar rendimiento
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Resetear cuando se recarga la página
window.addEventListener('load', () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile && window.pageYOffset <= 50) {
        topBarHidden = false;
        if (topBar) {
            topBar.classList.remove('hidden');
        }
    } else if (!isMobile && topBar) {
        // En PC, asegurar que esté visible
        topBar.classList.remove('hidden');
    }
});

// Asegurar que en PC siempre esté visible al cambiar el tamaño de ventana
window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile && topBar) {
        topBar.classList.remove('hidden');
        topBarHidden = false;
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
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Cerrar menú móvil si está abierto
            if (navMenu) navMenu.classList.remove('active');
            if (mobileNavToggle) mobileNavToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Galería de imágenes/videos en páginas de modelo
document.addEventListener('DOMContentLoaded', () => {
    // Cambiar imagen principal al hacer clic en miniatura
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    const mainImage = document.getElementById('mainGalleryImage');
    const mainVideo = document.getElementById('mainGalleryVideo');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const imageSrc = thumbnail.getAttribute('data-image');
            if (imageSrc && mainImage) {
                mainImage.src = imageSrc;
                thumbnails.forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
            }
        });
    });

    // Selector de tipo de galería (imágenes/videos)
    const galleryTypeBtns = document.querySelectorAll('.gallery-type-btn');
    const galleryContents = document.querySelectorAll('.gallery-content');

    galleryTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetType = btn.getAttribute('data-type');
            
            // Actualizar botones
            galleryTypeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Mostrar contenido correspondiente
            galleryContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('data-type') === targetType) {
                    content.classList.add('active');
                    
                    // Si es video, reproducir automáticamente
                    if (targetType === 'videos') {
                        const videos = content.querySelectorAll('video');
                        videos.forEach(video => {
                            video.play().catch(e => console.log('Error al reproducir video:', e));
                        });
                    }
                }
            });
        });
    });

    // Autoplay para video principal cuando se selecciona
    if (mainVideo) {
        const videoObserver = new MutationObserver(() => {
            if (mainVideo.closest('.gallery-content').classList.contains('active')) {
                mainVideo.play().catch(e => console.log('Error al reproducir video:', e));
            }
        });
        
        if (mainVideo.parentElement) {
            videoObserver.observe(mainVideo.parentElement, { attributes: true, attributeFilter: ['class'] });
        }
    }

    // Actualizar enlace de WhatsApp con información del modelo
    function updateWhatsAppLink() {
        const modelName = document.querySelector('.model-profile-name')?.textContent.trim();
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        
        whatsappLinks.forEach(link => {
            const currentHref = link.getAttribute('href');
            if (currentHref && modelName) {
                const url = new URL(currentHref);
                const currentText = url.searchParams.get('text') || '';
                
                // Actualizar solo si no tiene información del modelo
                if (!currentText.includes('Modelo:')) {
                    const newText = currentText ? 
                        `${currentText} Modelo: ${modelName}` : 
                        `Hola, me interesa conocer más sobre ${modelName}. Modelo: ${modelName}`;
                    url.searchParams.set('text', newText);
                    link.setAttribute('href', url.toString());
                }
            }
        });
    }

    // Llamar a la función al cargar
    updateWhatsAppLink();

    // Lazy loading para imágenes (si el navegador lo soporta)
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src; // Trigger loading for images with lazy attribute
        });
    } else {
        // Fallback para navegadores que no soportan lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // Lazy loading para imágenes de fondo usando Intersection Observer
    const backgroundImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const bgImage = element.dataset.bgImage;
                if (bgImage && !element.classList.contains('bg-loaded')) {
                    element.style.backgroundImage = `url(${bgImage})`;
                    element.classList.add('bg-loaded');
                }
            }
        });
    }, {
        rootMargin: '50px'
    });

    // Observar elementos con imágenes de fondo
    document.querySelectorAll('[data-bg-image]').forEach(el => {
        backgroundImageObserver.observe(el);
    });

    // Optimización: Cargar videos solo cuando están visibles o cuando se activa la pestaña de videos
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                // Solo cargar si el video tiene preload="none" y está visible
                if (video.preload === 'none' && video.querySelector('source')) {
                    const source = video.querySelector('source');
                    if (source.src) {
                        // El video se cargará cuando sea necesario (al hacer play o cuando esté visible)
                        video.load();
                    }
                }
            }
        });
    }, {
        rootMargin: '200px'
    });

    // Observar videos con preload="none" que están ocultos inicialmente
    document.querySelectorAll('video[preload="none"]').forEach(video => {
        // Solo observar videos que no están en la pestaña activa
        const parentContent = video.closest('.gallery-content');
        if (parentContent && !parentContent.classList.contains('active')) {
            videoObserver.observe(video);
        }
    });

    // Slider simple de modelos
    initModelsSlider();
});

// Slider simple desde cero
function initModelsSlider() {
    const wrappers = document.querySelectorAll('.models-slider-wrapper');
    
    wrappers.forEach(wrapper => {
        const track = wrapper.querySelector('.models-slider-track');
        const prevBtn = wrapper.querySelector('.slider-prev');
        const nextBtn = wrapper.querySelector('.slider-next');
        const cards = Array.from(track.querySelectorAll('.model-slide-card'));
        
        if (!track || cards.length === 0) return;
        
        const isMobile = window.innerWidth <= 768;
        const originalCardsCount = cards.length;
        
        // Crear contenedor de dots solo en móvil
        let dotsContainer = null;
        let dots = [];
        if (isMobile) {
            dotsContainer = document.createElement('div');
            dotsContainer.className = 'slider-dots-container';
            wrapper.appendChild(dotsContainer);
            
            // Crear dots
            for (let i = 0; i < originalCardsCount; i++) {
                const dot = document.createElement('button');
                dot.className = 'slider-dot';
                dot.setAttribute('aria-label', `Ir a slide ${i + 1}`);
                if (i === 0) dot.classList.add('active');
                dotsContainer.appendChild(dot);
                dots.push(dot);
            }
        }
        
        // Duplicar para bucle infinito solo en desktop
        if (!isMobile) {
            cards.forEach(c => track.appendChild(c.cloneNode(true)));
            cards.forEach(c => track.insertBefore(c.cloneNode(true), track.firstChild));
        }
        
        let currentIndex = isMobile ? 0 : originalCardsCount;
        let isDragging = false;
        
        function updateDots() {
            if (!isMobile || !dots.length) return;
            const realIndex = isMobile ? currentIndex : (currentIndex % originalCardsCount);
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === realIndex);
            });
        }
        
        function move() {
            if (isMobile) {
                // En móvil: el scroll-snap maneja el movimiento
                // Solo actualizar dots
                updateDots();
                return;
            }
            
            // Desktop: usar transform
            const container = track.parentElement;
            if (!container) return;
            
            const containerRect = container.getBoundingClientRect();
            const width = containerRect.width;
            
            if (!width || width <= 0) {
                requestAnimationFrame(() => move());
                return;
            }
            
            track.style.transition = isDragging ? 'none' : 'transform 0.4s ease';
            track.style.transform = `translateX(-${currentIndex * width}px)`;
            
            // Resetear posición para bucle infinito
            if (currentIndex >= originalCardsCount * 2) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    currentIndex = originalCardsCount;
                    track.style.transform = `translateX(-${currentIndex * width}px)`;
                    setTimeout(() => {
                        track.style.transition = 'transform 0.4s ease';
                    }, 50);
                }, 400);
            } else if (currentIndex < originalCardsCount) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    currentIndex = originalCardsCount * 2 - 1;
                    track.style.transform = `translateX(-${currentIndex * width}px)`;
                    setTimeout(() => {
                        track.style.transition = 'transform 0.4s ease';
                    }, 50);
                }, 400);
            }
            
            updateDots();
        }
        
        // Botones solo en desktop
        if (prevBtn && nextBtn && !isMobile) {
            prevBtn.onclick = () => {
                currentIndex--;
                if (currentIndex < originalCardsCount) currentIndex = originalCardsCount * 2 - 1;
                move();
            };
            
            nextBtn.onclick = () => {
                currentIndex++;
                if (currentIndex >= originalCardsCount * 2) currentIndex = originalCardsCount;
                move();
            };
        }
        
        // Para móvil: usar scroll-snap nativo + actualizar dots
        if (isMobile) {
            const container = track.parentElement;
            
            // Actualizar dots cuando se hace scroll
            container.addEventListener('scroll', () => {
                const scrollLeft = container.scrollLeft;
                const cardWidth = window.innerWidth; // 100vw
                const newIndex = Math.round(scrollLeft / cardWidth);
                
                if (newIndex !== currentIndex && newIndex >= 0 && newIndex < originalCardsCount) {
                    currentIndex = newIndex;
                    updateDots();
                }
            }, { passive: true });
            
            // Click en dots - hacer scroll al card correspondiente
            dots.forEach((dot, i) => {
                dot.addEventListener('click', () => {
                    const cardWidth = window.innerWidth;
                    container.scrollTo({
                        left: i * cardWidth,
                        behavior: 'smooth'
                    });
                    currentIndex = i;
                    updateDots();
                });
            });
            
            // Inicializar posición de scroll
            container.scrollLeft = 0;
        }
        
        // Inicializar posición
        move();
        
        // Recalcular en resize para móvil (asegurar que siempre esté centrado)
        if (isMobile) {
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    // Forzar recálculo del ancho
                    move();
                }, 250);
            });
            
        }
    });
}
