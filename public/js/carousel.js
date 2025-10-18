// Carousel functionality for banner
let currentSlideIndex = 0;
let slides = [];
let dots = [];
let autoSlideInterval;
let carouselConfig = {};

// Initialize carousel
function initCarousel(config) {
    carouselConfig = config;
    slides = document.querySelectorAll('.carousel-slide');
    dots = document.querySelectorAll('.dot');
    
    if (carouselConfig.auto_cycle) {
        startAutoSlide();
    }
    
    // Pause on hover
    const carousel = document.getElementById('banner-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            clearInterval(autoSlideInterval);
        });
        carousel.addEventListener('mouseleave', function() {
            if (carouselConfig.auto_cycle) {
                startAutoSlide();
            }
        });
    }
}

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(function() {
        changeSlide(1);
    }, carouselConfig.cycle_interval || 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    if (carouselConfig.auto_cycle) {
        startAutoSlide();
    }
}

// Make functions globally available
window.changeSlide = changeSlide;
window.currentSlide = currentSlide;
