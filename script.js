document.addEventListener('DOMContentLoaded', function() {
    // Typing animation for hero text
    const textElement = document.querySelector('.hero-text');
    if (textElement) {
        const text = "Scale your digital potential";
        const characters = text.split('');
        
        // Prepare the container with invisible spans for each character
        textElement.innerHTML = characters.map(char => 
            `<span class="char" style="visibility: hidden;">${char}</span>`
        ).join('');
        
        // Get all character spans
        const charSpans = textElement.querySelectorAll('.char');
        
        // Start typing after a delay
        setTimeout(function() {
            let index = 0;
            
            function typeEffect() {
                if (index < charSpans.length) {
                    // Make current character visible (instead of adding new elements)
                    charSpans[index].style.visibility = 'visible';
                    index++;
                    setTimeout(typeEffect, 100);
                }
            }
            
            typeEffect();
        }, 500);
    }
    
    // Theme toggle functionality removed - site is dark mode only
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // You would typically send the form data to a server here
            // For now, we'll just show an alert
            const nameInput = document.getElementById('name');
            alert(`Thank you, ${nameInput.value}! Your message has been received. We'll get back to you soon.`);
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link based on scroll position with special case for bottom of page
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        // Special case for bottom of page - if we're close to bottom, activate Contact
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 100) {
            current = 'contact';
        } else {
            // Normal section detection
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });
            
            // Special case for top of page
            if (pageYOffset === 0) {
                current = 'home';
            }
        }
        
        // Update active links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});