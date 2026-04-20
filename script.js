// Gallery data with real images
const galleryData = [
    {
        id: 1,
        title: "Ride into Sunset",
        category: "scenery",
        description: "A breathtaking view of sea in golden evening light.",
        image: "https://raw.githubusercontent.com/sivadevireddy89-afk/rightdistractions.github.io/main/Images/WhatsApp%20Image%202026-03-24%20at%2011.22.43.jpeg"
        
    },
    {
        id: 2,
        title: "City Skyline", 
        category: "location",
        description: "London - Tower Bridge capturing the essence of modern city life.",
        image: "https://raw.githubusercontent.com/sivadevireddy89-afk/rightdistractions.github.io/main/Images/WhatsApp%20Image%202026-03-24%20at%2011.22.43%20(1).jpeg",
        video: "https://raw.githubusercontent.com/sivadevireddy89-afk/rightdistractions.github.io/c91d16ee95352cad71edd05964511d4e67fb1362/Videos/WhatsApp%20Video%202026-03-28%20at%2021.05.26.mp4"
    },
    {
        id: 3,
        title: "Clock Tower",
        category: "portrait", 
        description: "Time captured in a wonderful evening.",
        image: "https://raw.githubusercontent.com/sivadevireddy89-afk/rightdistractions.github.io/main/Images/WhatsApp%20Image%202026-03-24%20at%2011.22.43%20(2).jpeg"
    },
    {
        id: 4,
        title: "Bridie ",
        category: "portrait",
        description: "Vibrant colors of the setting brid.",
        image: "https://raw.githubusercontent.com/sivadevireddy89-afk/rightdistractions.github.io/main/Images/WhatsApp%20Image%202026-03-24%20at%2011.22.43%20(3).jpeg"
    },
    {
        id: 5,
        title: "Historic Town Square",
        category: "location",
        description: "Charming European town square with centuries of history.",
        image: "https://raw.githubusercontent.com/sivadevireddy89-afk/rightdistractions.github.io/main/Images/WhatsApp%20Image%202026-03-24%20at%2011.22.43%20(3).jpeg"
    },
    {
        id: 6,
        title: "Young Artist",
        category: "portrait",
        description: "Capturing the creative spirit and dreams of sky.",
        image: "https://raw.githubusercontent.com/sivadevireddy89-afk/rightdistractions.github.io/main/Images/WhatsApp%20Image%202026-03-24%20at%2011.22.43%20(4).jpeg"
    },
    {
        id: 7,
        title: "Forest Path",
        category: "scenery",
        description: "A mystical journey through an ancient woodland.",
        image: "https://raw.githubusercontent.com/sivadevireddy89-afk/rightdistractions.github.io/main/Images/WhatsApp%20Image%202026-03-24%20at%2011.22.43%20(5).jpeg"
    },
    {
        id: 8,
        title: "Venice Canals",
        category: "location",
        description: "Romantic waterways of the floating city.",
        image: "https://raw.githubusercontent.com/sivadevireddy89-afk/rightdistractions.github.io/main/Images/WhatsApp%20Image%202026-03-24%20at%2011.22.44%20(1).jpeg"
    },
    {
        id: 9,
        title: "Coastal Sunset",
        category: "portrait",
        description: "Vibrant colors of the setting sun over ocean waves.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop"
    },
    {
        id: 10,
        title: "Desert Landscape",
        category: "scenery",
        description: "The stark beauty of endless sand dunes.",
        image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop"
    },
    {
        id: 11,
        title: "Paris Street Cafe",
        category: "location",
        description: "The quintessential Parisian dining experience.",
        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&h=600&fit=crop"
    },
    {
        id: 12,
        title: "Musician at Work",
        category: "portrait",
        description: "The passion and concentration of a musical artist.",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop"
    }
];

// DOM elements
const galleryGrid = document.querySelector('.gallery-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('imageModal');
const modalMedia = document.getElementById('modalMedia');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Array of hero background images that load randomly on refresh
const heroBackgrounds = [
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1920&h=1080&fit=crop'
];

// Set random hero background on page load
function setRandomHeroBackground() {
    const randomIndex = Math.floor(Math.random() * heroBackgrounds.length);
    const selectedImage = heroBackgrounds[randomIndex];
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${selectedImage}')`;
    }
}
// Setup scrolling brush animation
function setupScrollingBrush() {
    const brush = document.getElementById('scrollBrush');
    if (!brush) return;
    
    let lastScrollPercent = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        
        // Move brush from left (-100px) to right (100vw + 100px) based on scroll
        const startPos = -100;
        const endPos = window.innerWidth + 100;
        const currentPos = startPos + (scrollPercent * (endPos - startPos));
        
        // Add some vertical wave motion
        const waveOffset = Math.sin(scrollPercent * Math.PI * 4) * 30;
        const baseY = window.innerHeight / 2;
        
        brush.style.transform = `translate(${currentPos}px, ${baseY + waveOffset - window.innerHeight/2}px)`;
        
        // Create paint stroke trail occasionally
        if (Math.abs(scrollPercent - lastScrollPercent) > 0.02) {
            createPaintStroke(currentPos, baseY + waveOffset);
            lastScrollPercent = scrollPercent;
        }
    });
}

// Create paint stroke trail
function createPaintStroke(x, y) {
    const stroke = document.createElement('div');
    stroke.className = 'paint-stroke';
    stroke.style.left = `${x - 50}px`;
    stroke.style.top = `${y + 35}px`;
    stroke.style.width = '100px';
    document.body.appendChild(stroke);
    
    // Fade out and remove
    setTimeout(() => {
        stroke.style.transition = 'opacity 1s ease-out';
        stroke.style.opacity = '0';
        setTimeout(() => stroke.remove(), 1000);
    }, 100);
}

// Initialize gallery
function initGallery() {
    renderGallery('all');
    setupEventListeners();
    setupScrollEffects();
}

// Render gallery items with smooth animations
function renderGallery(filter) {
    galleryGrid.innerHTML = '';
    
    const filteredData = filter === 'all' 
        ? galleryData 
        : galleryData.filter(item => item.category === filter);
    
    filteredData.forEach((item, index) => {
        const galleryItem = createGalleryItem(item);
        galleryItem.style.opacity = '0';
        galleryItem.style.transform = 'translateY(20px)';
        galleryGrid.appendChild(galleryItem);
        
        // Stagger animation
        setTimeout(() => {
            galleryItem.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            galleryItem.style.opacity = '1';
            galleryItem.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Create gallery item element
function createGalleryItem(item) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.dataset.category = item.category;
    
    div.innerHTML = `
        <div class="gallery-image" style="background-image: url('${item.image}'); background-size: cover; background-position: center;">
        </div>
        <div class="gallery-info">
            <h3 class="gallery-title">${item.title}</h3>
            <span class="gallery-category">${item.category}</span>
            <p class="gallery-description">${item.description}</p>
        </div>
    `;
    
    div.addEventListener('click', () => openModal(item));
    
    return div;
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons with smooth transitions
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Render filtered gallery
            renderGallery(filter);
        });
    });
    
    // Modal close
    closeModal.addEventListener('click', closeModalFunc);
    
    // Modal click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only prevent default for anchor links (internal page navigation)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 52;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }

            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunc();
        }
    });
}

// Setup scroll effects
function setupScrollEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const header = document.querySelector('.header');
        
        // Header background opacity
        if (currentScrollY > 50) {
            header.style.background = 'rgba(251, 251, 253, 0.95)';
        } else {
            header.style.background = 'rgba(251, 251, 253, 0.8)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Open modal with smooth animation - supports both images and videos
function openModal(item) {
    modal.style.display = 'block';
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';
    
    // Clear previous content
    modalMedia.innerHTML = '';
    modalMedia.style.backgroundImage = '';
    
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description;
    
    // Animate modal in
    setTimeout(() => {
        modal.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1)';
        
        // Load content after modal animation completes
        setTimeout(() => {
            loadModalContent(item);
        }, 400);
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

// Load content into modal (images or videos)
function loadModalContent(item) {
    modalMedia.innerHTML = '';
    modalMedia.style.backgroundImage = '';
    
    // Check if item has a video
    if (item.video) {
        // Check if it's an Instagram URL
        if (item.video.includes('instagram.com')) {
            // Create Instagram embed
            const embedContainer = document.createElement('div');
            embedContainer.style.width = '100%';
            embedContainer.style.height = '100%';
            embedContainer.style.display = 'flex';
            embedContainer.style.alignItems = 'center';
            embedContainer.style.justifyContent = 'center';
            
            const iframe = document.createElement('iframe');
            iframe.src = item.video.replace('/p/', '/p/embed/') + 'embed/';
            iframe.width = '400';
            iframe.height = '600';
            iframe.style.border = 'none';
            iframe.style.borderRadius = '8px';
            iframe.allowFullscreen = true;
            
            embedContainer.appendChild(iframe);
            modalMedia.appendChild(embedContainer);
        } else if (item.video.includes('youtube.com') || item.video.includes('youtu.be')) {
            // Create YouTube embed
            const embedContainer = document.createElement('div');
            embedContainer.style.width = '100%';
            embedContainer.style.height = '100%';
            embedContainer.style.minHeight = '400px';
            embedContainer.style.display = 'flex';
            embedContainer.style.alignItems = 'center';
            embedContainer.style.justifyContent = 'center';
            
            // Extract video ID from various YouTube URL formats
            let videoId = '';
            console.log('Processing video URL:', item.video);
            if (item.video.includes('youtube.com/shorts/')) {
                videoId = item.video.split('youtube.com/shorts/')[1].split('?')[0];
            } else if (item.video.includes('youtube.com/watch')) {
                const urlParams = new URLSearchParams(item.video.split('?')[1]);
                videoId = urlParams.get('v');
            } else if (item.video.includes('youtu.be/')) {
                videoId = item.video.split('youtu.be/')[1].split('?')[0];
            }
            console.log('Extracted video ID:', videoId);
            
            if (videoId) {
                console.log('Creating YouTube embed for ID:', videoId);
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`;
                iframe.width = '560';
                iframe.height = '315';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.minHeight = '400px';
                iframe.style.border = 'none';
                iframe.style.borderRadius = '8px';
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allowfullscreen', '');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
                iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
                iframe.title = item.title || 'YouTube video player';
                
                embedContainer.appendChild(iframe);
                modalMedia.appendChild(embedContainer);
                console.log('YouTube iframe added to modal');
            } else {
                console.error('Failed to extract video ID from URL:', item.video);
            }
        } else {
            // Regular video file
            const video = document.createElement('video');
            video.src = item.video;
            video.controls = true;
            video.autoplay = true;
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'contain';
            video.style.borderRadius = '8px';
            modalMedia.appendChild(video);
        }
    } else {
        // Show image
        modalMedia.style.backgroundImage = `url('${item.image}')`;
        modalMedia.style.backgroundSize = 'contain';
        modalMedia.style.backgroundPosition = 'center';
        modalMedia.style.backgroundRepeat = 'no-repeat';
    }
}

// Close modal with smooth animation
function closeModalFunc() {
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';
    
    // Stop any playing video
    const video = modalMedia.querySelector('video');
    if (video) {
        video.pause();
        video.src = '';
    }
    
    setTimeout(() => {
        modal.style.display = 'none';
        modalMedia.innerHTML = '';
        modalMedia.style.backgroundImage = '';
        document.body.style.overflow = 'auto';
    }, 400);
}



// Show notification with smooth animation
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#34c759' : '#ff3b30'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        font-size: 15px;
        font-weight: 400;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 3000);
}

// Setup animated slider
function setupAnimatedSlider() {
    console.log('Setting up animated slider...');
    
    const slider = document.querySelector('.visual-journey-slider .animated-slider');
    const slides = document.querySelectorAll('.visual-journey-slider .slide');
    const dots = document.querySelectorAll('.visual-journey-slider .dot');
    const prevBtn = document.querySelector('.visual-journey-slider .slider-prev');
    const nextBtn = document.querySelector('.visual-journey-slider .slider-next');
    const progressFill = document.querySelector('.visual-journey-slider .progress-fill');
    
    console.log('Found:', slides.length, 'slides,', dots.length, 'dots');
    console.log('Prev button:', prevBtn, 'Next button:', nextBtn);
    console.log('Progress fill:', progressFill);
    
    if (!slides.length) {
        console.log('No slides found, returning');
        return;
    }
    
    let currentSlide = 0;
    let autoplayInterval;
    const autoplayDelay = 5000; // 5 seconds
    
    function goToSlide(index) {
        console.log('Going to slide', index);
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
        });
        
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        currentSlide = index;
        
        // Reset and start progress
        if (progressFill) {
            progressFill.style.transition = 'none';
            progressFill.style.width = '0%';
            setTimeout(() => {
                progressFill.style.transition = `width ${autoplayDelay}ms linear`;
                progressFill.style.width = '100%';
            }, 50);
        }
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }
    
    function startAutoplay() {
        console.log('Starting autoplay');
        if (progressFill) {
            progressFill.style.transition = `width ${autoplayDelay}ms linear`;
            progressFill.style.width = '100%';
        }
        autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }
    
    function stopAutoplay() {
        console.log('Stopping autoplay');
        clearInterval(autoplayInterval);
        if (progressFill) {
            const computedWidth = window.getComputedStyle(progressFill).width;
            progressFill.style.transition = 'none';
            progressFill.style.width = computedWidth;
        }
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next clicked');
            stopAutoplay();
            nextSlide();
            startAutoplay();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Prev clicked');
            stopAutoplay();
            prevSlide();
            startAutoplay();
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Dot clicked:', index);
            stopAutoplay();
            goToSlide(index);
            startAutoplay();
        });
    });
    
    // Pause on hover
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoplay();
            prevSlide();
            startAutoplay();
        } else if (e.key === 'ArrowRight') {
            stopAutoplay();
            nextSlide();
            startAutoplay();
        }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (slider) {
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            stopAutoplay();
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            startAutoplay();
        }
    }
    
    // Initialize first slide properly
    goToSlide(0);
    
    // Start autoplay
    startAutoplay();
    
    console.log('Slider setup complete');
}

// Intersection Observer for scroll animations
function setupIntersectionObserver() {
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
    
    // Observe elements
    const animateElements = document.querySelectorAll('.gallery-item, .about-text, .contact-info, .contact-form');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}
// Setup scroll-based navigation highlighting
function setupNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    if (!sections.length || !navLinks.length) return;
    
    const observerOptions = {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
    
    // Also handle click to scroll smoothly
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 70;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to Top Button Functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    setupIntersectionObserver();
    setRandomHeroBackground();
    // setupScrollingBrush();
    setupAnimatedSlider();
    setupNavHighlighting();
    initBackToTop();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
