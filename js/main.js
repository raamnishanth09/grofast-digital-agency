/* ========================================
   GROFAST DIGITAL - MAIN JAVASCRIPT
   AI-Driven Digital Marketing Agency
   ======================================== */

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const fadeElements = document.querySelectorAll('.fade-in');

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== VIDEO PLAYER =====
function playVideo() {
    const videoContainer = document.getElementById('companyVideo');
    if (!videoContainer) return;

    // Replace placeholder with actual video or modal
    // You can customize this to embed YouTube, Vimeo, or local video
    const videoEmbed = `
    <div style="position:relative;width:100%;aspect-ratio:16/9;background:#000;display:flex;align-items:center;justify-content:center;">
      <p style="color:#fff;text-align:center;padding:20px;">
        <strong>Video Player</strong><br>
        <small>Add your video URL here</small><br><br>
        <button onclick="closeVideo()" style="background:#ba1c16;color:#fff;border:none;padding:10px 20px;border-radius:5px;cursor:pointer;">Close</button>
      </p>
    </div>
  `;

    // For actual implementation, use:
    // const videoEmbed = `<iframe src="YOUR_VIDEO_URL" frameborder="0" allowfullscreen style="width:100%;aspect-ratio:16/9;"></iframe>`;

    videoContainer.innerHTML = videoEmbed;
}

function closeVideo() {
    const videoContainer = document.getElementById('companyVideo');
    if (!videoContainer) return;

    videoContainer.innerHTML = `
    <div class="play-button" onclick="playVideo()">
      <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
    </div>
  `;
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.innerText.replace(/[^0-9]/g, ''));
        const suffix = counter.innerText.replace(/[0-9]/g, '');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.innerText = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + suffix;
            }
        };

        // Start animation when element is visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(counter);
    });
}

// Initialize counter animation
animateCounters();

// ===== TYPING EFFECT FOR HERO (Optional) =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ===== TESTIMONIAL SLIDER (for testimonials page) =====
let currentSlide = 0;

function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');

    if (slides.length === 0) return;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-advance slides
    setInterval(nextSlide, 5000);

    // Dot click handlers
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentSlide = i;
            showSlide(currentSlide);
        });
    });

    showSlide(0);
}

// ===== FORM VALIDATION =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        showNotification('Thank you! We will contact you soon.', 'success');
        form.reset();
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to page
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(notificationStyles);

// ===== PARALLAX EFFECT =====
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
}

// ===== PAGE LOAD ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class for animations
    document.body.classList.add('loaded');

    // Initialize components
    initTestimonialSlider();
    initContactForm();
    initParallax();

    // Animate hero elements on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
});

// ===== SOCIAL MEDIA LINKS (Editable) =====
// Update these URLs with your actual social media links
const socialLinks = {
    facebook: 'https://facebook.com/grofastdigital',
    instagram: 'https://instagram.com/grofastdigital',
    linkedin: 'https://linkedin.com/company/grofastdigital',
    youtube: 'https://youtube.com/@grofastdigital',
    whatsapp: 'https://wa.me/919159124541'
};

// Apply social links to all social icons
document.querySelectorAll('[data-social]').forEach(link => {
    const platform = link.getAttribute('data-social');
    if (socialLinks[platform]) {
        link.href = socialLinks[platform];
    }
});

// ===== TEAM MEMBER MODAL (for team page) =====
function openTeamModal(memberId) {
    const modal = document.getElementById('teamModal');
    const memberData = getTeamMemberData(memberId);

    if (!modal || !memberData) return;

    document.getElementById('modalName').textContent = memberData.name;
    document.getElementById('modalRole').textContent = memberData.role;
    document.getElementById('modalBio').textContent = memberData.bio;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeTeamModal() {
    const modal = document.getElementById('teamModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Team member data (editable)
function getTeamMemberData(id) {
    const teamMembers = {
        karthikeyan: {
            name: 'Karthikeyan',
            role: 'Founder',
            bio: 'Visionary leader with expertise in digital transformation and business automation.'
        },
        sanjay: {
            name: 'Sanjay',
            role: 'CEO',
            bio: 'Strategic thinker driving company growth and innovation.'
        },
        mohan: {
            name: 'Mohan',
            role: 'Ad Head',
            bio: 'Expert in paid advertising across Meta and Google platforms.'
        },
        sajetha: {
            name: 'Sajetha',
            role: 'Expert of AI',
            bio: 'AI specialist creating cutting-edge automation solutions.'
        },
        sasirekha: {
            name: 'Sasi Rekha',
            role: 'AI Solution Head',
            bio: 'Leading AI implementation and integration strategies.'
        },
        naveena: {
            name: 'Naveena',
            role: 'Customer Expert',
            bio: 'Dedicated to delivering exceptional customer experiences.'
        },
        kargil: {
            name: 'Kargil',
            role: 'Cameraman',
            bio: 'Professional videographer capturing stunning visual content.'
        },
        videoeditor1: {
            name: 'Video Editor 1',
            role: 'Video Editor',
            bio: 'Creative video editor producing engaging content.'
        },
        videoeditor2: {
            name: 'Video Editor 2',
            role: 'Video Editor',
            bio: 'Skilled in post-production and visual effects.'
        }
    };

    return teamMembers[id];
}

// Close modal on outside click
window.addEventListener('click', (e) => {
    const modal = document.getElementById('teamModal');
    if (e.target === modal) {
        closeTeamModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeTeamModal();
    }
});

console.log('Grofast Digital - Website Loaded Successfully');
