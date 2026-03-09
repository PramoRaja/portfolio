/*==================== MOBILE MENU ====================*/
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const mobileLinks = document.querySelectorAll('.mobile-link');

let isMenuOpen = false;

if (hamburger) {
    hamburger.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.add('active');
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        } else {
            mobileMenu.classList.remove('active');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    });
}

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.remove('active');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    });
});

/*==================== SCROLL ANIMATIONS / REVEAL ====================*/
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => revealObserver.observe(el));

/*==================== STICKY NAVBAR ====================*/
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.padding = '1rem 4vw';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.4)';
        navbar.style.padding = '1.5rem 4vw';
        navbar.style.borderBottom = '1px solid transparent';
    }
});

/*==================== PARTICLE STARS BACKGROUND ====================*/
const canvas = document.getElementById('starsCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, stars;

    function initCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        stars = [];
        for(let i = 0; i < 150; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5,
                speed: Math.random() * 0.3 + 0.05,
                opacity: Math.random(),
                fading: Math.random() > 0.5
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, width, height);
        
        stars.forEach(star => {
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Move upwards
            star.y -= star.speed;
            
            // Twinkle effect
            if (star.fading) {
                star.opacity -= 0.01;
                if (star.opacity <= 0.1) star.fading = false;
            } else {
                star.opacity += 0.01;
                if (star.opacity >= 0.8) star.fading = true;
            }
            
            // Re-enter from bottom
            if(star.y < 0) {
                star.y = height;
                star.x = Math.random() * width;
            }
        });
        
        requestAnimationFrame(drawStars);
    }

    initCanvas();
    drawStars();
    window.addEventListener('resize', initCanvas);
}