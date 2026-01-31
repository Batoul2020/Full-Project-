// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navbar Highlight on Scroll
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('main > section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });

        // Highlight current page link
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNavLink);
    highlightActiveNavLink(); // Call on page load

    // Sudan Map Marker Interaction (for our-work.html)
    const mapMarkers = document.querySelectorAll('.map-marker[data-state]');
    const stateInfo = document.getElementById('state-info');

    if (mapMarkers.length > 0 && stateInfo) {
        const stateDetails = {
            'Port Sudan': {
                status: 'Completed',
                description: 'Established a computer lab at the Red Sea Technical College.',
                statusClass: 'completed'
            },
            'Al Qadarif': {
                status: 'Ongoing',
                description: 'Protection workshop planned soon. Winter clothing and blankets distribution for displaced families is currently ongoing.',
                statusClass: 'ongoing'
            },
            'Sennar': {
                status: 'Ongoing',
                description: 'Completed water distribution projects in displaced camps and distributed winter clothing and blankets.',
                statusClass: 'ongoing'
            },
            'Khartoum': {
                status: 'Planned',
                description: 'School rehabilitation and environmental sanitation projects planned.',
                statusClass: 'planned'
            }
        };

        function updateStateInfo(stateName) {
            if (stateDetails[stateName]) {
                const detail = stateDetails[stateName];
                stateInfo.innerHTML = `
                    <div>
                        <h3 style="color: var(--primary-color); margin-bottom: 0.5rem; font-size: 1.5rem;">${stateName}</h3>
                        <p style="color: var(--${detail.statusClass}-color); font-weight: 600; margin-bottom: 0.5rem;">Status: ${detail.status}</p>
                        <p style="color: var(--text-light);">${detail.description}</p>
                    </div>
                `;
            }
        }

        function resetStateInfo() {
            stateInfo.innerHTML = '<p>Hover over or tap a highlighted state to see project details</p>';
        }

        mapMarkers.forEach(marker => {
            // Mouse events
            marker.addEventListener('mouseenter', function() {
                const stateName = this.getAttribute('data-state');
                updateStateInfo(stateName);
            });

            marker.addEventListener('mouseleave', function() {
                resetStateInfo();
            });

            // Touch events for mobile
            marker.addEventListener('click', function(e) {
                e.preventDefault();
                const stateName = this.getAttribute('data-state');
                updateStateInfo(stateName);
            });
        });
    }

    // Add scroll-based animations (optional enhancement)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll('.impact-card, .project-card, .help-card, .donation-card, .team-member');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
