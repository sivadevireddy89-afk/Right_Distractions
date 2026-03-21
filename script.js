// Gallery data with simple test images
const galleryData = [
    {
        id: 1,
        title: "Test Image 1",
        category: "scenery",
        description: "First test image to verify slider works.",
        image: "https://picsum.photos/600/400?random=1"
    },
    {
        id: 2,
        title: "Test Image 2", 
        category: "scenery",
        description: "Second test image to verify slider works.",
        image: "https://picsum.photos/600/400?random=2"
    },
    {
        id: 3,
        title: "Test Image 3",
        category: "location", 
        description: "Third test image to verify slider works.",
        image: "https://picsum.photos/600/400?random=3"
    }
];

// DOM elements
const galleryGrid = document.querySelector('.gallery-grid');
const featuredGallery = document.querySelector('.featured-gallery');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const closeBtn = document.querySelector('.close');
const contactForm = document.querySelector('.contact-form');

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing gallery...');
    initGallery();
    
    // Test navigation after 2 seconds
    setTimeout(() => {
        console.log('Testing navigation automatically...');
        slideGallery(1); // Try to go to next slide
    }, 2000);
});

// Initialize gallery
function initGallery() {
    console.log('Initializing gallery...');
    renderGallery('all');
    renderFeaturedGallery();
    setupEventListeners();
    setupScrollEffects();
    setupAdditionalLinks();
    setupTouchSlider();
    console.log('Gallery initialization complete');
}

// Render featured gallery with all images
function renderFeaturedGallery() {
    console.log('=== VAN GOGH GALLERY RENDER ===');
    
    if (!featuredGallery) {
        console.error('Featured gallery element not found!');
        return;
    }
    
    featuredGallery.innerHTML = '';
    
    console.log('Creating 3 Van Gogh slides...');
    
    // Van Gogh paintings - Fixed URLs
    const vanGoghImages = [
        {
            title: "Starry Night",
            image: "https://picsum.photos/seed/starrynight123/600/400.jpg",
            description: "A swirling night sky masterpiece"
        },
        {
            title: "Sunflowers", 
            image: "https://picsum.photos/seed/sunflowers456/600/400.jpg",
            description: "Vibrant yellow sunflowers"
        },
        {
            title: "Wheat Field",
            image: "https://picsum.photos/seed/wheatfield789/600/400.jpg", 
            description: "Golden wheat landscape"
        }
    ];
    
    vanGoghImages.forEach((artwork, index) => {
        const div = document.createElement('div');
        div.className = 'featured-gallery-item';
        if (index === 0) {
            div.classList.add('active');
        }
        
        div.innerHTML = `
            <div style="width: 100%; height: 300px; background-image: url('${artwork.image}'); background-size: cover; background-position: center; position: relative;">
                <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); padding: 20px; color: white;">
                    <h3 style="margin: 0; font-size: 24px;">${artwork.title}</h3>
                </div>
            </div>
            <div style="padding: 20px; background: white; text-align: center;">
                <p style="margin: 0; color: #333;">${artwork.description}</p>
            </div>
        `;
        
        featuredGallery.appendChild(div);
        console.log('Created', artwork.title, 'with image:', artwork.image);
    });
    
    // Create dots
    renderSliderDots();
    
    console.log('Van Gogh gallery complete! Total slides:', featuredGallery.children.length);
    console.log('=== END VAN GOGH GALLERY ===');
}

// Slider variables
let currentSlideIndex = 0;

// Make slideGallery globally accessible
window.slideGallery = function(direction) {
    console.log('slideGallery called with direction:', direction);
    const items = document.querySelectorAll('.featured-gallery-item');
    const totalSlides = items.length;
    
    console.log('Sliding gallery. Current index:', currentSlideIndex, 'Total slides:', totalSlides);
    
    if (totalSlides === 0) {
        console.error('No slides found!');
        return;
    }
    
    // Hide current slide
    items[currentSlideIndex].classList.remove('active');
    
    // Update index
    if (direction === 1 && currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
    } else if (direction === -1 && currentSlideIndex > 0) {
        currentSlideIndex--;
    }
    
    // Show new slide
    items[currentSlideIndex].classList.add('active');
    
    console.log('New active slide index:', currentSlideIndex);
    
    // Update dots
    updateSliderDots();
};

// Update slider position
function updateSliderPosition(index) {
    const items = document.querySelectorAll('.featured-gallery-item');
    
    console.log('Updating to slide index:', index, 'Total items:', items.length);
    
    // Hide all slides
    items.forEach(item => item.classList.remove('active'));
    
    // Show selected slide
    if (items[index]) {
        items[index].classList.add('active');
        currentSlideIndex = index;
        console.log('Set slide', index, 'as active');
    }
    
    // Update dots
    updateSliderDots();
}

// Setup touch slider support
function setupTouchSlider() {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    featuredGallery.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        featuredGallery.style.transition = 'none';
    });
    
    featuredGallery.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        const slideWidth = 600;
        const currentTransform = featuredGallery.style.transform;
        const currentTranslateX = parseInt(currentTransform.replace(/translateX\(|px\)/g, '')) || 0;
        
        let newTranslateX = currentTranslateX + diffX;
        
        // Constrain to slide boundaries
        const maxTranslateX = 0;
        const minTranslateX = -(galleryData.length - 1) * slideWidth;
        newTranslateX = Math.max(minTranslateX, Math.min(maxTranslateX, newTranslateX));
        
        featuredGallery.style.transform = `translateX(${newTranslateX}px)`;
    });
    
    featuredGallery.addEventListener('touchend', () => {
        isDragging = false;
        featuredGallery.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Snap to nearest slide
        const currentTranslateX = parseInt(featuredGallery.style.transform.replace(/translateX\(|px\)/g, '')) || 0;
        const slideWidth = 600;
        const nearestSlide = Math.round(-currentTranslateX / slideWidth);
        updateSliderPosition(nearestSlide);
    });
}

// Render slider dots
function renderSliderDots() {
    const dotsContainer = document.querySelector('.slider-dots');
    const items = document.querySelectorAll('.featured-gallery-item');
    
    console.log('Rendering dots for', items.length, 'slides');
    
    if (!dotsContainer) {
        console.error('Dots container not found!');
        return;
    }
    
    dotsContainer.innerHTML = '';
    
    items.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (index === currentSlideIndex) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => updateSliderPosition(index));
        dotsContainer.appendChild(dot);
    });
    
    console.log('Dots rendered successfully');
}

// Update slider dots
function updateSliderDots() {
    const dots = document.querySelectorAll('.dot');
    const items = document.querySelectorAll('.featured-gallery-item');
    
    console.log('Updating dots. Current index:', currentSlideIndex, 'Total dots:', dots.length);
    
    dots.forEach((dot, index) => {
        if (index === currentSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}
function setupAdditionalLinks() {
    // Tutorial links
    const tutorialLinks = document.querySelectorAll('.tutorial-link');
    tutorialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Tutorial pages coming soon!', 'info');
        });
    });

    // Blog links
    const blogLinks = document.querySelectorAll('.blog-link');
    blogLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Blog posts coming soon!', 'info');
        });
    });

    // Shop links
    const shopLinks = document.querySelectorAll('.shop-link');
    shopLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Shop coming soon!', 'info');
        });
    });
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
    
    // Slider navigation buttons
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            console.log('Previous button clicked');
            window.slideGallery(-1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            console.log('Next button clicked');
            window.slideGallery(1);
        });
    }
    
    // Modal close
    closeBtn.addEventListener('click', closeModalFunc);
    
    // Modal click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Mobile menu toggle with animation
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Add body lock when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Enhanced smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                // Smooth scroll with easing
                const startPosition = window.pageYOffset;
                const distance = offsetTop - startPosition;
                const duration = 800;
                let start = null;
                
                function easeInOutCubic(t) {
                    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                }
                
                function animateScroll(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    window.scrollTo(0, startPosition + (distance * easeInOutCubic(progress)));
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animateScroll);
                    }
                }
                
                requestAnimationFrame(animateScroll);
            }
            
            // Close mobile menu
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Modal close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunc();
        }
    });
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }
}

// Setup scroll effects
function setupScrollEffects() {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        const header = document.querySelector('.header');
        
        // Header hide/show on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        // Header background opacity
        if (currentScrollY > 50) {
            header.style.background = 'rgba(251, 251, 253, 0.95)';
        } else {
            header.style.background = 'rgba(251, 251, 253, 0.8)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Tutorial links handling
document.addEventListener('DOMContentLoaded', () => {
    const tutorialLinks = document.querySelectorAll('.tutorial-link');
    tutorialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Show coming soon notification
            showNotification('Tutorial pages coming soon!', 'info');
        });
    });

    // Blog links handling
    const blogLinks = document.querySelectorAll('.blog-link');
    blogLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Show coming soon notification
            showNotification('Blog posts coming soon!', 'info');
        });
    });

    // Shop links handling
    const shopLinks = document.querySelectorAll('.shop-link');
    shopLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Show coming soon notification
            showNotification('Shop coming soon!', 'info');
        });
    });
});

// Close modal with smooth animation
function closeModalFunc() {
    modal.style.display = 'none';
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';
    document.body.style.overflow = 'auto';
}

// Open modal with smooth animation
function openModal(item) {
    modal.style.display = 'block';
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';
    
    modalImage.style.backgroundImage = `url('${item.image}')`;
    modalImage.style.backgroundSize = 'cover';
    modalImage.style.backgroundPosition = 'center';
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description;
    
    // Animate modal in
    setTimeout(() => {
        modal.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

// Close modal with smooth animation
function closeModalFunc() {
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 400);
}

// Handle contact form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! I will get back to you soon.', 'success');
    e.target.reset();
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    setupIntersectionObserver();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
