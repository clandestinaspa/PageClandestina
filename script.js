// Navegación móvil
const mobileNavToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navDropdown = document.querySelector('.nav-dropdown');
const dropdownLink = navDropdown ? navDropdown.querySelector('a') : null;

// Toggle del menú principal
if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        mobileNavToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        
        // Cerrar dropdown cuando se cierra el menú
        if (!navMenu.classList.contains('active') && navDropdown) {
            navDropdown.classList.remove('active');
        }
    });
}

// Toggle del dropdown en móvil
if (dropdownLink && navDropdown) {
    dropdownLink.addEventListener('click', (e) => {
        // Solo en móvil
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            navDropdown.classList.toggle('active');
        }
    });
    
    // También manejar el resize para cerrar dropdown si se cambia a desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navDropdown) {
            navDropdown.classList.remove('active');
        }
    });
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (navMenu && mobileNavToggle && !navMenu.contains(e.target) && !mobileNavToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileNavToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Cerrar dropdown también
        if (navDropdown) {
            navDropdown.classList.remove('active');
        }
    }
});

// Cerrar menú al hacer clic en un enlace del menú (excepto el dropdown)
if (navMenu) {
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // No cerrar si es el enlace del dropdown en móvil
            if (window.innerWidth <= 768 && navDropdown && navDropdown.contains(link) && link === dropdownLink) {
                return; // Ya se maneja en el evento del dropdown
            }
            
            // Cerrar menú móvil después de un pequeño delay para permitir la navegación
            setTimeout(() => {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    mobileNavToggle.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    if (navDropdown) {
                        navDropdown.classList.remove('active');
                    }
                }
            }, 100);
        });
    });
}

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

// ============================================
// GOOGLE ANALYTICS EVENT TRACKING
// ============================================

// Función helper para enviar eventos a Google Analytics
function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
        console.log('Event tracked:', eventName, eventParams);
    }
}

// Función para obtener el nombre del modelo desde la URL o el elemento
function getModelName(element) {
    // Intentar obtener del href
    const href = element.getAttribute('href') || '';
    const modelMatch = href.match(/modelo-(\w+)\.html/);
    if (modelMatch) {
        return modelMatch[1].charAt(0).toUpperCase() + modelMatch[1].slice(1);
    }
    
    // Intentar obtener del texto o atributos data
    const modelName = element.getAttribute('data-model') || 
                     element.closest('.model-card')?.querySelector('.model-name')?.textContent?.trim() ||
                     element.textContent?.trim();
    return modelName || 'Unknown';
}

// Función para obtener la página actual
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('modelo-')) {
        const match = path.match(/modelo-(\w+)\.html/);
        return match ? `Modelo: ${match[1].charAt(0).toUpperCase() + match[1].slice(1)}` : path;
    }
    return path === '/' || path.includes('index.html') ? 'Home' : path.replace('.html', '').replace('/', '');
}

// 1. TRACKING DE CLICS EN MODELOS (Catálogo y Slider)
document.addEventListener('DOMContentLoaded', () => {
    // Clics en botones "Ver Perfil" del catálogo
    const modelButtons = document.querySelectorAll('.btn-model-elegant, .btn-view-profile');
    modelButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modelName = getModelName(button);
            trackEvent('view_model_profile', {
                'model_name': modelName,
                'page_location': getCurrentPage(),
                'button_type': button.classList.contains('btn-model-elegant') ? 'catalog_button' : 'overlay_button',
                'event_category': 'Model Interaction',
                'event_label': `View ${modelName} Profile`
            });
        });
    });

    // Clics en cards de modelos
    const modelCards = document.querySelectorAll('.model-card');
    modelCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Solo si no es un clic directo en un botón (ya se rastrea arriba)
            if (!e.target.closest('a')) {
                const modelName = card.querySelector('.model-name')?.textContent?.trim();
                if (modelName) {
                    trackEvent('model_card_click', {
                        'model_name': modelName,
                        'page_location': getCurrentPage(),
                        'event_category': 'Model Interaction',
                        'event_label': `Click ${modelName} Card`
                    });
                }
            }
        });
    });

    // Tracking de modelos vistos en el slider
    const sliderCards = document.querySelectorAll('.model-slide-card');
    if (sliderCards.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Cuando el 50% del card es visible
        };

        const modelViewObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const modelName = card.querySelector('.model-slide-info h3')?.textContent?.trim();
                    if (modelName) {
                        trackEvent('model_viewed_slider', {
                            'model_name': modelName,
                            'page_location': getCurrentPage(),
                            'event_category': 'Model View',
                            'event_label': `Viewed ${modelName} in Slider`
                        });
                    }
                }
            });
        }, observerOptions);

        sliderCards.forEach(card => {
            modelViewObserver.observe(card);
        });
    }
});

// 2. TRACKING DE BOTONES DE WHATSAPP
document.addEventListener('DOMContentLoaded', () => {
    // Botones de WhatsApp en páginas de modelos
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp-model, .floating-whatsapp');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href') || '';
            const isReserve = button.classList.contains('btn-whatsapp-reserve') || 
                            button.textContent?.includes('Reservar');
            const isFloating = button.classList.contains('floating-whatsapp');
            
            // Obtener nombre del modelo desde la URL o la página
            let modelName = 'General';
            if (window.location.pathname.includes('modelo-')) {
                const match = window.location.pathname.match(/modelo-(\w+)\.html/);
                if (match) {
                    modelName = match[1].charAt(0).toUpperCase() + match[1].slice(1);
                }
            }
            
            trackEvent('whatsapp_click', {
                'model_name': modelName,
                'button_type': isReserve ? 'reserve' : (isFloating ? 'floating' : 'contact'),
                'page_location': getCurrentPage(),
                'event_category': 'Contact',
                'event_label': `${isReserve ? 'Reserve' : 'Contact'} ${modelName} via WhatsApp`
            });
        });
    });

    // Botón "TRABAJA CON NOSOTRAS"
    const workWithUsButton = document.querySelector('.btn-top-bar');
    if (workWithUsButton) {
        workWithUsButton.addEventListener('click', () => {
            trackEvent('work_with_us_click', {
                'page_location': getCurrentPage(),
                'event_category': 'Recruitment',
                'event_label': 'Work With Us Button Clicked'
            });
        });
    }
});

// 3. TRACKING DE TIEMPO EN PÁGINA
let pageStartTime = Date.now();
let timeTrackingInterval;

document.addEventListener('DOMContentLoaded', () => {
    // Enviar tiempo cada 30 segundos
    timeTrackingInterval = setInterval(() => {
        const timeSpent = Math.floor((Date.now() - pageStartTime) / 1000);
        trackEvent('time_on_page', {
            'time_seconds': timeSpent,
            'page_location': getCurrentPage(),
            'event_category': 'Engagement',
            'event_label': `${timeSpent}s on ${getCurrentPage()}`
        });
    }, 30000); // Cada 30 segundos

    // Enviar tiempo al salir de la página
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.floor((Date.now() - pageStartTime) / 1000);
        trackEvent('page_exit', {
            'time_seconds': timeSpent,
            'page_location': getCurrentPage(),
            'event_category': 'Engagement',
            'event_label': `Exited ${getCurrentPage()} after ${timeSpent}s`
        });
    });
});

// 4. TRACKING DE SCROLL DEPTH
let scrollDepthTracked = {
    25: false,
    50: false,
    75: false,
    100: false
};

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

    // Rastrear hitos de scroll
    [25, 50, 75, 100].forEach(depth => {
        if (scrollPercent >= depth && !scrollDepthTracked[depth]) {
            scrollDepthTracked[depth] = true;
            trackEvent('scroll_depth', {
                'scroll_depth': depth,
                'page_location': getCurrentPage(),
                'event_category': 'Engagement',
                'event_label': `Scrolled ${depth}% of ${getCurrentPage()}`
            });
        }
    });
}, { passive: true });

// 5. TRACKING DE NAVEGACIÓN
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-menu a, .nav-dropdown a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const linkText = link.textContent?.trim();
            const linkHref = link.getAttribute('href');
            trackEvent('navigation_click', {
                'link_text': linkText,
                'link_url': linkHref,
                'page_location': getCurrentPage(),
                'event_category': 'Navigation',
                'event_label': `Clicked ${linkText}`
            });
        });
    });
});

// 6. TRACKING DE INTERACCIONES CON EL SLIDER
document.addEventListener('DOMContentLoaded', () => {
    // Botones prev/next del slider
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    
    if (sliderPrev) {
        sliderPrev.addEventListener('click', () => {
            trackEvent('slider_navigation', {
                'direction': 'prev',
                'page_location': getCurrentPage(),
                'event_category': 'Slider Interaction',
                'event_label': 'Previous Button Clicked'
            });
        });
    }
    
    if (sliderNext) {
        sliderNext.addEventListener('click', () => {
            trackEvent('slider_navigation', {
                'direction': 'next',
                'page_location': getCurrentPage(),
                'event_category': 'Slider Interaction',
                'event_label': 'Next Button Clicked'
            });
        });
    }

    // Dots del slider (móvil)
    const sliderDots = document.querySelectorAll('.slider-dot');
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            trackEvent('slider_dot_click', {
                'dot_index': index + 1,
                'page_location': getCurrentPage(),
                'event_category': 'Slider Interaction',
                'event_label': `Clicked Dot ${index + 1}`
            });
        });
    });
});

// 7. TRACKING DE VISUALIZACIÓN DE IMÁGENES EN GALERÍA
document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.model-gallery img, .gallery-item img');
    if (galleryImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const modelName = getCurrentPage();
                    const imageSrc = img.getAttribute('src') || '';
                    
                    trackEvent('gallery_image_view', {
                        'model_name': modelName,
                        'image_src': imageSrc.split('/').pop(),
                        'page_location': getCurrentPage(),
                        'event_category': 'Gallery View',
                        'event_label': `Viewed image in ${modelName} gallery`
                    });
                    
                    // Dejar de observar después de rastrear
                    imageObserver.unobserve(img);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });

        galleryImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// 8. TRACKING DE PÁGINA VISTA (Page View mejorado)
document.addEventListener('DOMContentLoaded', () => {
    // Enviar evento personalizado de página vista después de un pequeño delay
    setTimeout(() => {
        trackEvent('page_view_enhanced', {
            'page_location': getCurrentPage(),
            'page_title': document.title,
            'page_path': window.location.pathname,
            'event_category': 'Page View',
            'event_label': `Viewed ${getCurrentPage()}`
        });
    }, 1000);
});

// 9. TRACKING DE BOTONES "VISÍTAME" EN EL SLIDER
document.addEventListener('DOMContentLoaded', () => {
    const visitButtons = document.querySelectorAll('.btn-visit-model');
    visitButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modelName = getModelName(button);
            trackEvent('visit_model_click', {
                'model_name': modelName,
                'page_location': getCurrentPage(),
                'button_location': 'slider',
                'event_category': 'Model Interaction',
                'event_label': `Visit ${modelName} from Slider`
            });
        });
    });
});

// 10. TRACKING DE RESIZE DE VENTANA (útil para saber si es móvil/desktop)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const isMobile = window.innerWidth <= 768;
        trackEvent('window_resize', {
            'window_width': window.innerWidth,
            'window_height': window.innerHeight,
            'device_type': isMobile ? 'mobile' : 'desktop',
            'page_location': getCurrentPage(),
            'event_category': 'Technical',
            'event_label': `Window resized to ${window.innerWidth}x${window.innerHeight}`
        });
    }, 500);
});
