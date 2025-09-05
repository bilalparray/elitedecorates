// Elite Decorates - Premium JavaScript Application
// Ultra-High Quality Interactive Experience

class EliteDecoratesApp {
    constructor() {
        this.currentPage = 'home';
        this.isLoading = false;
        this.observers = new Map();
        
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        this.setupNavigation();
        this.setupPageSwitching();
        this.setupAnimations();
        this.setupScrollEffects();
        this.setupMobileOptimizations();
        this.setupWhatsAppIntegration();
        this.setupIntersectionObservers();
        this.setupKeyboardNavigation();
        this.setupPerformanceOptimizations();
        
        // Set initial page
        this.handleInitialRoute();
        
        // Track app initialization
        this.trackEvent('app_initialized', {
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
            screen_resolution: `${screen.width}x${screen.height}`,
            viewport_size: `${window.innerWidth}x${window.innerHeight}`
        });
        
        console.log('🎨 Elite Decorates - Premium App Initialized');
    }

    // Page Navigation System
    showPage(pageId) {
        if (this.isLoading) return;
        
        this.isLoading = true;
        
        // Hide all pages with fade out
        const allPages = document.querySelectorAll('.page-content');
        allPages.forEach(page => {
            page.style.opacity = '0';
            page.style.transform = 'translateY(20px)';
        });
        
        setTimeout(() => {
            // Hide all pages
            allPages.forEach(page => page.classList.add('d-none'));
            
            // Show target page
            const targetPage = document.getElementById(`page-${pageId}`);
            if (targetPage) {
                targetPage.classList.remove('d-none');
                
                // Animate in
                setTimeout(() => {
                    targetPage.style.opacity = '1';
                    targetPage.style.transform = 'translateY(0)';
                }, 50);
                
                this.currentPage = pageId;
                
                // Update URL without page reload
                this.updateURL(pageId);
                
                // Update page title
                this.updatePageTitle(pageId);
                
                // Reset scroll position
                this.smoothScrollToTop();
                
                // Track page view
                this.trackEvent('page_view', { page: pageId });
                
                // Update navigation states
                this.updateNavigation(pageId);
                
                // Close mobile menu if open
                this.closeMobileMenu();
                
                // Trigger page-specific initialization
                this.initializePageSpecific(pageId);
            }
            
            this.isLoading = false;
        }, 300);
    }

    handleInitialRoute() {
        const hash = window.location.hash.substring(1);
        const validPages = ['home', 'products', 'about', 'privacy', 'terms', 
                           'photo-frames', 'business-cards', 'wallets', 'mugs-cups', 
                           'tshirts', 'bookmarks', 'wedding-cards'];
        
        if (hash && validPages.includes(hash)) {
            this.showPage(hash);
        } else {
            this.showPage('home');
        }
    }

    updateURL(pageId) {
        if (pageId === 'home') {
            history.pushState({ page: pageId }, '', '/');
        } else {
            history.pushState({ page: pageId }, '', `#${pageId}`);
        }
    }

    updatePageTitle(pageId) {
        const titles = {
            'home': 'Elite Decorates - Premium Custom Printing & Decoration Services',
            'products': 'Our Products - Elite Decorates',
            'about': 'About Us - Elite Decorates',
            'privacy': 'Privacy Policy - Elite Decorates',
            'terms': 'Terms & Conditions - Elite Decorates',
            'photo-frames': 'Custom Photo Frames - Elite Decorates',
            'business-cards': 'Business Card Printing - Elite Decorates',
            'wallets': 'Custom Wallets - Elite Decorates',
            'mugs-cups': 'Printed Cups & Mugs - Elite Decorates',
            'tshirts': 'Custom T-shirt Printing - Elite Decorates',
            'bookmarks': 'Custom Bookmarks - Elite Decorates',
            'wedding-cards': 'Wedding Cards - Elite Decorates'
        };
        
        document.title = titles[pageId] || 'Elite Decorates';
    }

    initializePageSpecific(pageId) {
        // Page-specific initializations
        switch (pageId) {
            case 'home':
                this.initializeHomePage();
                break;
            case 'products':
                this.initializeProductsPage();
                break;
            case 'photo-frames':
            case 'business-cards':
            case 'wallets':
                this.initializeProductDetailPage();
                break;
        }
    }

    initializeHomePage() {
        // Animate hero elements
        this.animateHeroElements();
        
        // Initialize service cards hover effects
        this.setupServiceCards();
    }

    initializeProductsPage() {
        // Initialize product cards
        this.setupProductCards();
    }

    initializeProductDetailPage() {
        // Initialize product gallery
        this.setupProductGallery();
        
        // Initialize sticky sidebar
        this.setupStickySidebar();
    }

    // Navigation Setup
    setupNavigation() {
        // Handle navbar scroll effects
        let lastScroll = 0;
        const navbar = document.querySelector('.premium-nav');
        
        window.addEventListener('scroll', this.throttle(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        }, 16));

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.showPage(e.state.page);
            } else {
                this.showPage('home');
            }
        });
    }

    updateNavigation(activePageId) {
        // Update active nav states
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current page link
        const activeLink = document.querySelector(`.nav-link[onclick*="${activePageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Page Switching Setup
    setupPageSwitching() {
        // Add transition styles to all page content
        const pages = document.querySelectorAll('.page-content');
        pages.forEach(page => {
            page.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            page.style.opacity = '0';
        });
        
        // Show initial page
        setTimeout(() => {
            const homePage = document.getElementById('page-home');
            if (homePage && !homePage.classList.contains('d-none')) {
                homePage.style.opacity = '1';
                homePage.style.transform = 'translateY(0)';
            }
        }, 100);
    }

    // Animation Setup
    setupAnimations() {
        // CSS Animation utility classes
        this.addAnimationClasses();
        
        // Setup scroll-triggered animations
        this.setupScrollAnimations();
    }

    addAnimationClasses() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-fade-in {
                opacity: 0;
                animation: fadeIn 0.8s ease-out forwards;
            }
            
            .animate-slide-up {
                opacity: 0;
                transform: translateY(30px);
                animation: slideUp 0.8s ease-out forwards;
            }
            
            .animate-slide-in-left {
                opacity: 0;
                transform: translateX(-30px);
                animation: slideInLeft 0.8s ease-out forwards;
            }
            
            .animate-slide-in-right {
                opacity: 0;
                transform: translateX(30px);
                animation: slideInRight 0.8s ease-out forwards;
            }
            
            @keyframes fadeIn {
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInLeft {
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideInRight {
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupScrollAnimations() {
        // Animate elements on scroll
        const animateOnScroll = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.animate || 'fade-in';
                    element.classList.add(`animate-${animationType}`);
                    observer.unobserve(element);
                }
            });
        };
        
        const observer = new IntersectionObserver(animateOnScroll, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observe elements with animation data attributes
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach(el => observer.observe(el));
        
        this.observers.set('scroll-animations', observer);
    }

    // Scroll Effects
    setupScrollEffects() {
        // Parallax effects for hero section
        const heroSection = document.querySelector('.premium-hero');
        if (heroSection) {
            window.addEventListener('scroll', this.throttle(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                const heroBackground = heroSection.querySelector('.hero-background');
                if (heroBackground) {
                    heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
                }
            }, 16));
        }

        // Smooth scroll for anchor links
        this.setupSmoothScrolling();
    }

    setupSmoothScrolling() {
        // Polyfill for browsers that don't support smooth scrolling
        if (!('scrollBehavior' in document.documentElement.style)) {
            this.polyfillSmoothScrolling();
        }
    }

    smoothScrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    polyfillSmoothScrolling() {
        const smoothScroll = (target, duration = 800) => {
            const start = window.pageYOffset;
            const distance = target - start;
            let startTime = null;

            const animation = (currentTime) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = this.easeInOutQuad(timeElapsed, start, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            };

            requestAnimationFrame(animation);
        };

        window.smoothScrollTo = smoothScroll;
    }

    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // Mobile Optimizations
    setupMobileOptimizations() {
        // Handle mobile menu
        this.setupMobileMenu();
        
        // Touch optimizations
        this.setupTouchOptimizations();
        
        // Viewport optimizations
        this.setupViewportOptimizations();
    }

    setupMobileMenu() {
        const toggler = document.querySelector('.premium-toggler');
        const navCollapse = document.querySelector('.navbar-collapse');
        
        if (toggler && navCollapse) {
            toggler.addEventListener('click', () => {
                navCollapse.classList.toggle('show');
                toggler.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!toggler.contains(e.target) && !navCollapse.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });

            // Close menu when clicking on nav links
            const navLinks = navCollapse.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    setTimeout(() => this.closeMobileMenu(), 100);
                });
            });
        }
    }

    closeMobileMenu() {
        const navCollapse = document.querySelector('.navbar-collapse');
        const toggler = document.querySelector('.premium-toggler');
        
        if (navCollapse && navCollapse.classList.contains('show')) {
            navCollapse.classList.remove('show');
            toggler.classList.remove('active');
        }
    }

    setupTouchOptimizations() {
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            
            // Add touch feedback for interactive elements
            const interactiveElements = document.querySelectorAll('.btn, .service-card, .product-card');
            
            interactiveElements.forEach(element => {
                element.addEventListener('touchstart', () => {
                    element.style.transform = 'scale(0.98)';
                }, { passive: true });
                
                element.addEventListener('touchend', () => {
                    setTimeout(() => {
                        element.style.transform = '';
                    }, 150);
                }, { passive: true });
            });
        }
    }

    setupViewportOptimizations() {
        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                // Force recalculation of viewport
                window.scrollTo(window.scrollX, window.scrollY);
                this.updateLayout();
            }, 500);
        });

        // Handle window resize
        window.addEventListener('resize', this.debounce(() => {
            this.updateLayout();
        }, 250));
    }

    updateLayout() {
        // Update sticky elements
        this.updateStickyElements();
        
        // Update mobile menu state
        if (window.innerWidth > 992) {
            this.closeMobileMenu();
        }
    }

    updateStickyElements() {
        const stickyElements = document.querySelectorAll('.order-summary');
        stickyElements.forEach(element => {
            if (window.innerWidth <= 768) {
                element.style.position = 'relative';
                element.style.top = 'auto';
            } else {
                element.style.position = 'sticky';
                element.style.top = '100px';
            }
        });
    }

    // WhatsApp Integration
    setupWhatsAppIntegration() {
        // Enhanced WhatsApp button functionality
        const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
        
        whatsappButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Add loading state
                this.addButtonLoadingState(button);
                
                // Track WhatsApp interaction
                const context = this.getWhatsAppContext(button);
                this.trackEvent('whatsapp_click', context);
                
                // Remove loading state after delay
                setTimeout(() => {
                    this.removeButtonLoadingState(button);
                }, 2000);
            });
        });
    }

    addButtonLoadingState(button) {
        button.classList.add('loading');
        const originalText = button.innerHTML;
        button.dataset.originalText = originalText;
        
        const icon = button.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-spinner fa-spin me-2';
        }
        
        const textContent = button.childNodes;
        textContent.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                node.textContent = 'Opening WhatsApp...';
            }
        });
    }

    removeButtonLoadingState(button) {
        button.classList.remove('loading');
        if (button.dataset.originalText) {
            button.innerHTML = button.dataset.originalText;
            delete button.dataset.originalText;
        }
    }

    getWhatsAppContext(button) {
        const productTitle = button.closest('.service-card, .product-card, .product-detail-page')?.querySelector('h1, h3')?.textContent;
        const pageContext = this.currentPage;
        
        return {
            product: productTitle || 'General Inquiry',
            page: pageContext,
            button_location: button.closest('.product-detail-page') ? 'product_detail' : 'general'
        };
    }

    // Intersection Observers
    setupIntersectionObservers() {
        // Lazy loading for images
        this.setupLazyLoading();
        
        // Animate cards on scroll
        this.setupCardAnimations();
        
        // Track section views
        this.setupSectionTracking();
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
            
            this.observers.set('lazy-loading', imageObserver);
        }
    }

    setupCardAnimations() {
        if ('IntersectionObserver' in window) {
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-slide-up');
                        cardObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Observe cards with stagger effect
            const cards = document.querySelectorAll('.service-card, .product-card, .value-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
                cardObserver.observe(card);
            });
            
            this.observers.set('card-animations', cardObserver);
        }
    }

    setupSectionTracking() {
        if ('IntersectionObserver' in window) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionName = entry.target.id || entry.target.className;
                        this.trackEvent('section_view', { section: sectionName });
                    }
                });
            }, {
                threshold: 0.5
            });
            
            const sections = document.querySelectorAll('section[id], .section-header');
            sections.forEach(section => {
                sectionObserver.observe(section);
            });
            
            this.observers.set('section-tracking', sectionObserver);
        }
    }

    // Keyboard Navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Close mobile menu on Escape
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
            
            // Navigate to home on Ctrl+H
            if ((e.key === 'h' || e.key === 'H') && e.ctrlKey) {
                if (!this.isInputFocused()) {
                    e.preventDefault();
                    this.showPage('home');
                }
            }
            
            // Navigate back on Alt+Left
            if (e.key === 'ArrowLeft' && e.altKey) {
                e.preventDefault();
                history.back();
            }
            
            // Navigate forward on Alt+Right
            if (e.key === 'ArrowRight' && e.altKey) {
                e.preventDefault();
                history.forward();
            }
        });
    }

    isInputFocused() {
        const activeElement = document.activeElement;
        return activeElement && (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.tagName === 'SELECT' ||
            activeElement.contentEditable === 'true'
        );
    }

    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Setup performance monitoring
        this.setupPerformanceMonitoring();
        
        // Setup error handling
        this.setupErrorHandling();
    }

    preloadCriticalResources() {
        // Preload critical images
        const criticalImages = [
            'https://pplx-res.cloudinary.com/image/upload/v1757046648/pplx_project_search_images/cb7a15297b88b2ffbe346fde8067b7969669e692.png',
            'https://pplx-res.cloudinary.com/image/upload/v1754845389/pplx_project_search_images/a3d971c3d9f26fce0bd58fd649bc22c98bf1c374.png'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    setupPerformanceMonitoring() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const navigation = performance.getEntriesByType('navigation')[0];
                const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
                
                this.trackEvent('page_load_complete', {
                    load_time: loadTime,
                    dom_content_loaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    first_contentful_paint: this.getFirstContentfulPaint()
                });
            }
        });
        
        // Monitor Core Web Vitals
        this.monitorWebVitals();
    }

    getFirstContentfulPaint() {
        try {
            const paintTimings = performance.getEntriesByType('paint');
            const fcp = paintTimings.find(entry => entry.name === 'first-contentful-paint');
            return fcp ? fcp.startTime : 0;
        } catch (error) {
            return 0;
        }
    }

    monitorWebVitals() {
        // This would typically use web-vitals library in a real implementation
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    list.getEntries().forEach(entry => {
                        if (entry.entryType === 'largest-contentful-paint') {
                            this.trackEvent('web_vital_lcp', { value: entry.startTime });
                        }
                    });
                });
                
                observer.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (error) {
                console.warn('Performance monitoring not supported');
            }
        }
    }

    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (event) => {
            this.trackEvent('javascript_error', {
                message: event.message,
                filename: event.filename,
                line: event.lineno,
                column: event.colno,
                stack: event.error?.stack
            });
        });
        
        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.trackEvent('unhandled_promise_rejection', {
                reason: event.reason?.toString() || 'Unknown'
            });
        });
    }

    // Service Cards Setup
    setupServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            // Add click handler for navigation
            card.addEventListener('click', (e) => {
                if (e.target.closest('.btn')) return; // Don't interfere with button clicks
                
                const onclick = card.getAttribute('onclick');
                if (onclick) {
                    eval(onclick);
                }
            });
            
            // Add hover effects
            card.addEventListener('mouseenter', () => {
                this.animateServiceCard(card, 'enter');
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateServiceCard(card, 'leave');
            });
        });
    }

    animateServiceCard(card, action) {
        const icon = card.querySelector('.service-icon');
        const price = card.querySelector('.service-price');
        
        if (action === 'enter') {
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
            if (price) {
                price.style.transform = 'scale(1.05)';
            }
        } else {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            if (price) {
                price.style.transform = 'scale(1)';
            }
        }
    }

    // Product Cards Setup
    setupProductCards() {
        const productCards = document.querySelectorAll('.product-card.premium');
        
        productCards.forEach(card => {
            // Add click handler
            card.addEventListener('click', (e) => {
                if (e.target.closest('.btn')) return;
                
                const onclick = card.getAttribute('onclick');
                if (onclick) {
                    eval(onclick);
                }
            });
            
            // Enhanced hover effects
            this.setupProductCardHover(card);
        });
    }

    setupProductCardHover(card) {
        const overlay = card.querySelector('.product-overlay');
        const image = card.querySelector('.product-image img');
        
        card.addEventListener('mouseenter', () => {
            if (overlay) {
                overlay.style.opacity = '1';
            }
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (overlay) {
                overlay.style.opacity = '0';
            }
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    }

    // Product Gallery Setup
    setupProductGallery() {
        const galleryImages = document.querySelectorAll('.product-gallery img');
        
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                this.openImageModal(img.src, img.alt);
            });
        });
    }

    openImageModal(src, alt) {
        // Create modal for image viewing
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        `;
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 1rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.cssText = `
            position: absolute;
            top: 2rem;
            right: 2rem;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        `;
        
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        modal.appendChild(img);
        modal.appendChild(closeBtn);
        document.body.appendChild(modal);
        
        // Animate in
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
        });
    }

    // Sticky Sidebar Setup
    setupStickySidebar() {
        const sidebar = document.querySelector('.order-summary');
        if (!sidebar) return;
        
        if (window.innerWidth > 768) {
            let ticking = false;
            
            const updateSidebar = () => {
                const rect = sidebar.getBoundingClientRect();
                const parentRect = sidebar.parentElement.getBoundingClientRect();
                
                if (rect.bottom > window.innerHeight) {
                    sidebar.style.transform = `translateY(${window.innerHeight - rect.bottom - 20}px)`;
                } else {
                    sidebar.style.transform = 'translateY(0)';
                }
                
                ticking = false;
            };
            
            const onScroll = () => {
                if (!ticking) {
                    requestAnimationFrame(updateSidebar);
                    ticking = true;
                }
            };
            
            window.addEventListener('scroll', onScroll);
        }
    }

    // Hero Elements Animation
    animateHeroElements() {
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-stats, .hero-actions');
        
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s ease-out';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Utility Functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Analytics and Tracking
    trackEvent(eventName, properties = {}) {
        const eventData = {
            event: eventName,
            timestamp: new Date().toISOString(),
            page_url: window.location.href,
            current_page: this.currentPage,
            user_agent: navigator.userAgent,
            screen_resolution: `${screen.width}x${screen.height}`,
            viewport_size: `${window.innerWidth}x${window.innerHeight}`,
            connection_type: navigator.connection?.effectiveType || 'unknown',
            ...properties
        };
        
        // Log to console for development
        console.log('📊 Event tracked:', eventData);
        
        // In production, this would send to analytics service
        // Example: sendToAnalytics(eventData);
    }

    // Public API Methods
    getVersion() {
        return '2.0.0';
    }

    getCurrentPage() {
        return this.currentPage;
    }

    isLoading() {
        return this.isLoading;
    }
}

// Global Functions for onclick handlers
function showPage(pageId) {
    if (window.eliteApp) {
        window.eliteApp.showPage(pageId);
    }
}

// Initialize the application
window.eliteApp = new EliteDecoratesApp();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EliteDecoratesApp;
}