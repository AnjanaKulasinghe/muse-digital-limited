// ========================================
// MUSE DIGITAL LIMITED - CLEAN JAVASCRIPT
// No Wix bloat, just modern, maintainable JS
// ========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    initMobileMenu();
    
    // Testimonial slideshow
    initTestimonialSlideshow();
    
    // Customer gallery rotation
    initGalleryRotation();
    
    // Video gallery click to play
    initVideoGallery();
});

// === VIDEO GALLERY ===
function initVideoGallery() {
    const videoItems = document.querySelectorAll('.video-item-small');
    
    videoItems.forEach(item => {
        item.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            const thumbnail = this.querySelector('.video-thumbnail');
            
            // Create iframe
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            
            // Replace thumbnail with iframe
            thumbnail.innerHTML = '';
            thumbnail.appendChild(iframe);
        });
    });
    
    // Scroll buttons
    const scrollLeft = document.querySelector('.scroll-left');
    const scrollRight = document.querySelector('.scroll-right');
    const gallery = document.querySelector('.video-gallery-horizontal');
    
    if (scrollLeft && scrollRight && gallery) {
        scrollLeft.addEventListener('click', () => {
            gallery.scrollBy({ left: -600, behavior: 'smooth' });
        });
        
        scrollRight.addEventListener('click', () => {
            gallery.scrollBy({ left: 600, behavior: 'smooth' });
        });
    }
}

// === MOBILE MENU ===
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('#main-nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// === TESTIMONIAL SLIDESHOW ===
function initTestimonialSlideshow() {
    var slideshow = document.getElementById('comp-mcezylty2');
    var slidesWrapper = slideshow ? slideshow.querySelector('[data-testid="slidesWrapper"]') : null;
    var dots = slideshow ? slideshow.querySelectorAll('.ZVUGJp') : null;
    var currentIndex = 0;
    var interval;

    if (!slideshow || !slidesWrapper || !dots || dots.length === 0) return;

    var slides = slidesWrapper.children;
    var totalSlides = dots.length;

    function showSlide(index) {
        currentIndex = (index + totalSlides) % totalSlides;

        // Update dots
        dots.forEach(function(dot, i) {
            if (i === currentIndex) {
                dot.classList.add('Ale4Rm', 'active');
                dot.parentElement.setAttribute('aria-current', 'true');
            } else {
                dot.classList.remove('Ale4Rm', 'active');
                dot.parentElement.removeAttribute('aria-current');
            }
        });

        // Show current slide
        for (var i = 0; i < slides.length; i++) {
            if (i === currentIndex) {
                slides[i].style.display = 'block';
                slides[i].classList.add('active');
            } else {
                slides[i].style.display = 'none';
                slides[i].classList.remove('active');
            }
        }
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoRotate() {
        interval = setInterval(nextSlide, 3000);
    }

    function resetAutoRotate() {
        clearInterval(interval);
        startAutoRotate();
    }

    // Add click listeners to dots
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            showSlide(index);
            resetAutoRotate();
        });
    });

    // Navigation buttons
    var leftBtn = document.getElementById('testimonial-left');
    var rightBtn = document.getElementById('testimonial-right');

    if (leftBtn) {
        leftBtn.addEventListener('click', function() {
            prevSlide();
            resetAutoRotate();
        });
    }

    if (rightBtn) {
        rightBtn.addEventListener('click', function() {
            nextSlide();
            resetAutoRotate();
        });
    }

    // Initialize
    showSlide(0);
    startAutoRotate();
}

// === CUSTOMER GALLERY ROTATION ===
function initGalleryRotation() {
    var gallery = document.getElementById('items_comp-mgy74cpx');
    var leftBtn = document.getElementById('slider-left');
    var rightBtn = document.getElementById('slider-right');
    var interval;

    if (!gallery) return;

    function rotateLeft() {
        if (gallery.children.length > 1) {
            gallery.insertBefore(gallery.lastElementChild, gallery.firstElementChild);
        }
    }

    function rotateRight() {
        if (gallery.children.length > 1) {
            gallery.appendChild(gallery.firstElementChild);
        }
    }

    function startAutoRotate() {
        interval = setInterval(rotateRight, 4000);
    }

    function resetAutoRotate() {
        clearInterval(interval);
        startAutoRotate();
    }

    if (leftBtn) {
        leftBtn.addEventListener('click', function() {
            rotateLeft();
            resetAutoRotate();
        });
    }

    if (rightBtn) {
        rightBtn.addEventListener('click', function() {
            rotateRight();
            resetAutoRotate();
        });
    }

    startAutoRotate();
}

// === SMOOTH SCROLLING (for older browsers) ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// === CHECK FOR SUCCESS MESSAGE ===
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const messageDiv = document.getElementById('formMessage');
    
    if (urlParams.get('success') === 'true' && messageDiv) {
        messageDiv.innerHTML = '<p style="color: #4CAF50; text-align: center; padding: 15px; background: rgba(76, 175, 80, 0.1); border-radius: 5px; margin-bottom: 20px;">Thank you for your message! We\'ll contact you back soon.</p>';
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Remove success parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

// === CONTACT FORM HANDLER ===
const contactForm = document.getElementById('contactForm');
const messageDiv = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                messageDiv.innerHTML = '<p style="color: #4CAF50; text-align: center; padding: 15px; background: rgba(76, 175, 80, 0.1); border-radius: 5px; margin-bottom: 20px;">Thank you for your message! We\'ll contact you back soon.</p>';
                contactForm.reset();
            } else {
                messageDiv.innerHTML = '<p style="color: #ef4d50; text-align: center; padding: 15px; background: rgba(239, 77, 80, 0.1); border-radius: 5px; margin-bottom: 20px;">Oops! There was a problem. Please try again.</p>';
            }
        } catch (error) {
            messageDiv.innerHTML = '<p style="color: #ef4d50; text-align: center; padding: 15px; background: rgba(239, 77, 80, 0.1); border-radius: 5px; margin-bottom: 20px;">Oops! There was a problem. Please try again.</p>';
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            
            // Scroll to message
            messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}
