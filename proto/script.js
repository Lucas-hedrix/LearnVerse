document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loading Screen Animation
    const loader = document.getElementById('loader');
    
    // Wait 3 seconds, then hide loader
    setTimeout(() => {
        loader.classList.add('hidden');
        // Let it fade out completely before removing from DOM
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500); // 500ms matches the CSS transition time
    }, 3000);


    // 2. Hero Background Image Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Change image every 5 seconds

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }


    // 3. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: animate only once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const slideUpElements = document.querySelectorAll('.slide-up-trigger');
    const zoomInElements = document.querySelectorAll('.zoom-in-trigger');

    slideUpElements.forEach(el => animateOnScroll.observe(el));
    zoomInElements.forEach(el => animateOnScroll.observe(el));


    // 4. Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    });
});
