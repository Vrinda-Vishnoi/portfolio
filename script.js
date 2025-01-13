// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function downloadResume() {
    try {
        // Create a link to the resume file in the portfolio folder
        const link = document.createElement('a');
        link.href = 'finalmaster.pdf';
        link.target = '_blank';  // Open in new tab
        link.download = 'Vrinda_Resume.pdf';
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading resume:', error);
        alert('There was an error downloading the resume. Please try again.');
    }
}

// Timeline Animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.2, // Start animation when 20% of the item is visible
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before the item comes into view
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    animateTimeline();
});

// Navigation active state and mobile menu
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    function setActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();

    // Mobile menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const navList = document.querySelector('.nav-list');
    const dropdowns = document.querySelectorAll('.dropdown');

    menuBtn.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Handle dropdown on mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navList.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
});

// Add mouse movement effect to the image
document.addEventListener('DOMContentLoaded', function() {
    const rightSection = document.querySelector('.rightSection');
    const image = rightSection.querySelector('img');

    rightSection.addEventListener('mousemove', (e) => {
        const rect = rightSection.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calculate rotation based on mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (mouseY - centerY) / 20;
        const rotateY = (centerX - mouseX) / 20;

        // Apply the transform
        image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    rightSection.addEventListener('mouseleave', () => {
        image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Animate chat text appearance
document.addEventListener('DOMContentLoaded', function() {
    const chatText = document.querySelector('.chat-text');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    chatText.classList.add('visible');
                }, 1500); // Add delay after typing indicator
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(chatText);
});

// Enhanced Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Add section dividers with enhanced animation
    document.querySelectorAll('section').forEach(section => {
        const divider = document.createElement('div');
        divider.className = 'section-divider';
        section.appendChild(divider);
    });

    // Enhanced scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    const scrollBar = document.createElement('div');
    scrollBar.className = 'scroll-progress-bar';
    scrollProgress.appendChild(scrollBar);
    document.body.appendChild(scrollProgress);

    // Smooth scroll to section
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced Intersection Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class with slight delay for smoother appearance
                setTimeout(() => {
                    entry.target.classList.add('active');
                    
                    // Add content-fade class to children with staggered delay
                    entry.target.querySelectorAll('.skill-card, .about-text, .project-card, .timeline-item').forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('content-fade');
                        }, index * 100);
                    });
                }, 100);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '-50px'
    });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Smoother scroll progress update
    let scrollTimeout;
    function updateScrollProgress() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(() => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            scrollBar.style.transform = `scaleY(${progress}%)`;
        });
    }

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call

    // Enhanced profile picture animation
    const profile = document.querySelector('.profile-wrapper');
    if (profile) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = profile.getBoundingClientRect();
            const x = (clientX - left - width / 2) / 25;
            const y = (clientY - top - height / 2) / 25;

            requestAnimationFrame(() => {
                profile.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.02)`;
            });
        });

        profile.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                profile.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
            });
        });
    }
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animate button on submit
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.style.transform = 'scale(0.98)';
            setTimeout(() => {
                submitBtn.style.transform = '';
            }, 150);

            // Get form data
            const formData = {
                name: this.querySelector('#name').value,
                email: this.querySelector('#email').value,
                message: this.querySelector('#message').value
            };

            // Here you would typically send the form data to your backend
            console.log('Form submitted:', formData);

            // Show success message (you can customize this)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });

        // Add smooth focus transitions
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const highlight = group.querySelector('.form-highlight');

            input.addEventListener('focus', () => {
                group.style.transform = 'scale(1.02)';
                highlight.style.width = '100%';
            });

            input.addEventListener('blur', () => {
                group.style.transform = '';
                highlight.style.width = '0';
            });

            // Add subtle hover effect
            group.addEventListener('mouseover', () => {
                if (document.activeElement !== input) {
                    group.style.transform = 'scale(1.01)';
                }
            });

            group.addEventListener('mouseout', () => {
                if (document.activeElement !== input) {
                    group.style.transform = '';
                }
            });
        });
    }
});
