document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // 1. LOADING SCREEN
    // ============================================
    const loader = document.getElementById('loader');

    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 600);
    }, 3000);


    // ============================================
    // 2. HERO IMAGE SLIDER + DOTS + LAZY LOADING
    // ============================================
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('sliderDots');
    let currentSlide = 0;
    const slideInterval = 5000;

    // Lazy-load slide background images
    // Only load the first slide immediately, defer the rest
    slides.forEach((slide, i) => {
        const bg = slide.getAttribute('data-bg');
        if (!bg) return;
        if (i === 0) {
            // Load first slide right away so it's ready
            slide.style.backgroundImage = `url('${bg}')`;
        } else {
            // Load subsequent slides in the background after page is interactive
            const img = new Image();
            img.onload = () => { slide.style.backgroundImage = `url('${bg}')`; };
            img.src = bg;
        }
    });

    // Create dots
    if (slides.length > 0 && dotsContainer) {
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
    }

    function getDots() {
        return document.querySelectorAll('.slider-dot');
    }

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        getDots()[currentSlide]?.classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        getDots()[currentSlide]?.classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    let autoSlide = slides.length > 0 ? setInterval(nextSlide, slideInterval) : null;

    // Pause on hover
    const sliderEl = document.getElementById('heroSlider');
    if (sliderEl) {
        sliderEl.addEventListener('mouseenter', () => clearInterval(autoSlide));
        sliderEl.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, slideInterval);
        });
    }


    // ============================================
    // 3. SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.slide-up-trigger, .zoom-in-trigger').forEach(el => {
        animateOnScroll.observe(el);
    });


    // ============================================
    // 4. NAVBAR: SCROLL EFFECT + ACTIVE LINKS
    // ============================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = navbar.offsetHeight + 10;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });


    // ============================================
    // 5. HAMBURGER / MOBILE MENU
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    function closeMobileMenu() {
        hamburger?.classList.remove('active');
        mobileMenu?.classList.remove('open');
    }

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            closeMobileMenu();
        }
    });


    // ============================================
    // 6. CONTACT MODAL
    // ============================================
    const contactModal  = document.getElementById('contactModal');
    const modalClose    = document.getElementById('modalClose');

    function openModal() {
        contactModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        contactModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    document.getElementById('openContactModal')?.addEventListener('click', openModal);
    document.getElementById('openContactModalMob')?.addEventListener('click', () => {
        closeMobileMenu();
        openModal();
    });
    document.getElementById('openContactModalFooter')?.addEventListener('click', openModal);
    modalClose?.addEventListener('click', closeModal);

    contactModal?.addEventListener('click', (e) => {
        if (e.target === contactModal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });


    // ============================================
    // 7. CONTACT FORM SUBMISSION (Web3Forms)
    // ============================================
    const contactForm    = document.getElementById('contactForm');
    const contactBtn     = document.getElementById('contactSubmitBtn');
    const contactSuccess = document.getElementById('contactSuccess');
    const contactError   = document.getElementById('contactError');

    contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        contactBtn.querySelector('.btn-label').style.display = 'none';
        contactBtn.querySelector('.btn-spinner').style.display = 'inline-flex';
        contactBtn.disabled = true;
        contactSuccess.style.display = 'none';
        contactError.style.display = 'none';

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: new FormData(contactForm)
            });
            const data = await res.json();

            if (data.success) {
                contactSuccess.style.display = 'flex';
                contactForm.reset();
            } else {
                contactError.style.display = 'flex';
            }
        } catch {
            contactError.style.display = 'flex';
        } finally {
            contactBtn.querySelector('.btn-label').style.display = 'inline';
            contactBtn.querySelector('.btn-spinner').style.display = 'none';
            contactBtn.disabled = false;
        }
    });

});
